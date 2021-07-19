import * as path from 'path'
import * as fs from 'fs'
import { Command, flags } from '@oclif/command'
import j2s from 'joi-to-swagger'
import { generateApi } from 'swagger-typescript-api'
// import Converter from 'openapi-to-postmanv2'
const Converter = require('openapi-to-postmanv2')

function forEachFileIn(dirPath: string, callback: (arg0: string, arg1: string) => void) {
  fs.readdirSync(dirPath).forEach(file => {
    const absolutePath = path.join(dirPath, file)
    if (fs.statSync(absolutePath).isDirectory()) {
      forEachFileIn(absolutePath, callback)
    } else {
      callback(dirPath, file)
    }
  })
}

class ContractConverter extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'Name to print'}),
    path: flags.string({char: 'p', description: 'Path to directory with Joi schemas'}),
    output: flags.string({char: 'o', description: 'Directory to store output'}),
    copy: flags.boolean({char: 'c', description: 'Copies Joi schemas to directory specified by output'}),
    postman: flags.boolean({description: 'Compiles Postman scripts from OAS spec'}),
    ts: flags.boolean({description: 'Compiles Typescript Interfaces from OAS spec'}),
  }

  // static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ContractConverter)

    const INTPUT_PATH = path.resolve(process.cwd(), flags.path || '')
    const TMP_PATH = `${INTPUT_PATH}/tmp` // TODO

    console.log('---------------')
    console.log(' Compiling Joi ')
    console.log('---------------')
    forEachFileIn(`${INTPUT_PATH}/joi`, (dirPath: string, file: string) => {
      const model = require(`${dirPath}/${file}`)
      const joiSchema = model[file.replace('.js', '')]

      if (!joiSchema) return
      const { swagger } = j2s(joiSchema, {})

      const outputDir = `${dirPath.replace('/joi', '/autogen')}/`
      fs.mkdirSync(outputDir, {recursive: true})
      fs.writeFileSync(`${outputDir}/${file.replace('.js', '.json')}`, JSON.stringify(swagger))
      fs.copyFileSync(`${dirPath}/${file}`, `${dirPath}/${file}`.replace('/joi', '/autogen').replace('.js', '.joi.js'))
    })

    console.log('---------------')
    console.log(' Compiling OAS ')
    console.log('---------------')
    fs.readdirSync(INTPUT_PATH).forEach((fileName: string) => {
      if (fileName.indexOf('.js') > -1) {
        const swagger = require(`${INTPUT_PATH}/${fileName}`)
        fs.writeFileSync(`${INTPUT_PATH}/autogen/${fileName.replace('.js', '.oas.json')}`, JSON.stringify(swagger))
      }
    })

    console.log('--------------')
    console.log(' Compiling TS ')
    console.log('--------------')
    fs.readdirSync(`${INTPUT_PATH}/autogen/`).forEach((fileName: string) => {
      if (fileName.indexOf('.oas.json') <= -1) return

      generateApi({
        input: path.resolve(process.cwd(), `${INTPUT_PATH}/autogen/${fileName}`),
        hooks: {
          // onCreateComponent: (component) => console.log(component),
          // onCreateRequestParams: (rawType) => console.log(rawType),
          // onCreateRoute: (routeData) => console.log(routeData),
          // onCreateRouteName: (routeNameInfo, rawRouteInfo) => console.log(routeNameInfo),
          // onFormatRouteName: (routeInfo, templateRouteName) => console.log(routeInfo),
          onFormatTypeName: (typeName, rawTypeName) => `I${typeName}`,
          // onInit: (configuration) => console.log(component),
          // onParseSchema: (originalSchema, parsedSchema) => console.log(component),
          // onPrepareConfig: (currentConfiguration) => console.log(component),
        },
      })
      .then(({ files, configuration }) => {
        files.forEach(({ content, name }) => {
          fs.writeFileSync(`${INTPUT_PATH}/autogen/${fileName.replace('.oas.json', '.ts')}`, content)
        })
      })
      .catch(error => console.error(error))
    })

    console.log('-------------------')
    console.log(' Compiling Postman ')
    console.log('-------------------')
    fs.readdirSync(`${INTPUT_PATH}/autogen/`).forEach((fileName: string) => {
      if (fileName.indexOf('.oas.json') <= -1) return

      const openapiData = fs.readFileSync(`${INTPUT_PATH}/autogen/${fileName}`, {encoding: 'UTF8'})

      Converter.convert({ type: 'string', data: openapiData }, {}, (error: any, conversionResult: any) => {
        if (error) {
          console.error(error)
          return
        }

        if (conversionResult.result) {
          fs.writeFileSync(`${INTPUT_PATH}/autogen/${fileName.replace('.oas.json', '.postman.json')}`, JSON.stringify(conversionResult.output[0].data))
        } else {
          console.error('Could not convert', conversionResult.reason)
        }
      })
    })

    console.log('----------------')
    console.log(' Extend Postman ')
    console.log('----------------')
    forEachFileIn(`${INTPUT_PATH}/autogen/`, (dirPathAutogen, fileAutogen) => {
      if (fileAutogen.indexOf('.postman.json') <= -1) return

      forEachFileIn(`${INTPUT_PATH}/postman/`, (dirPathPostman, filePostman) => {

        if (fileAutogen.replace('.postman.json', '.js') === filePostman) {
          const postmanObject = require(`${dirPathPostman}${filePostman}`)
          fs.writeFileSync(`${dirPathAutogen}${fileAutogen}`, JSON.stringify(postmanObject))
        }
      })
    })
  }
}

export = ContractConverter
