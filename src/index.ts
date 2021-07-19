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
    const OUTPUT_PATH = path.resolve(process.cwd(), flags.output || '')
    const TMP_DIRNAME = 'tmp'

    console.log('---------------')
    console.log(' Compiling Joi ')
    console.log('---------------')
    forEachFileIn(`${INTPUT_PATH}/joi`, (dirPath: string, file: string) => {
      const model = require(`${dirPath}/${file}`)
      const joiSchema = model[file.replace('.js', '')]

      if (!joiSchema) return
      const { swagger } = j2s(joiSchema, {})

      const outputDir = `${dirPath.replace('/joi', `/${TMP_DIRNAME}`)}/`
      fs.mkdirSync(outputDir, {recursive: true})
      fs.writeFileSync(`${outputDir}/${file.replace('.js', '.json')}`, JSON.stringify(swagger))
      if (flags.copy) {
        fs.copyFileSync(`${dirPath}/${file}`, `${dirPath}/${file}`.replace('/joi', `/${TMP_DIRNAME}`).replace('.js', '.joi.js'))
      }
    })

    // Rename tmp to the output dir. This allows the consumer to use their --output option as their import into OAS
    // specs. More predictable from consumer standpoint. The compilation step after this will all utilize --output
    // as well.
    fs.renameSync(`${INTPUT_PATH}/${TMP_DIRNAME}`, OUTPUT_PATH)

    console.log('---------------')
    console.log(' Compiling OAS ')
    console.log('---------------')
    fs.readdirSync(INTPUT_PATH).forEach((fileName: string) => {
      if (fileName.indexOf('.js') > -1) {
        const swagger = require(`${INTPUT_PATH}/${fileName}`)
        fs.writeFileSync(`${OUTPUT_PATH}/${fileName.replace('.js', '.oas.json')}`, JSON.stringify(swagger))
      }
    })

    if (flags.ts) {
      console.log('--------------')
      console.log(' Compiling TS ')
      console.log('--------------')
      fs.readdirSync(OUTPUT_PATH).forEach((fileName: string) => {
        if (fileName.indexOf('.oas.json') <= -1) return

        generateApi({
          input: path.resolve(process.cwd(), `${OUTPUT_PATH}/${fileName}`),
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
            fs.writeFileSync(`${OUTPUT_PATH}/${fileName.replace('.oas.json', '.ts')}`, content)
          })
        })
        .catch(error => console.error(error))
      })
    }

    if (flags.postman) {
      console.log('-------------------')
      console.log(' Compiling Postman ')
      console.log('-------------------')
      fs.readdirSync(OUTPUT_PATH).forEach((fileName: string) => {
        if (fileName.indexOf('.oas.json') <= -1) return

        const openapiData = fs.readFileSync(`${OUTPUT_PATH}/${fileName}`, {encoding: 'UTF8'})

        Converter.convert({ type: 'string', data: openapiData }, {}, (error: any, conversionResult: any) => {
          if (error) {
            console.error(error)
            return
          }

          if (conversionResult.result) {
            fs.writeFileSync(`${OUTPUT_PATH}/${fileName.replace('.oas.json', '.postman.json')}`, JSON.stringify(conversionResult.output[0].data))
          } else {
            console.error('Could not convert', conversionResult.reason)
          }
        })
      })

      console.log('----------------')
      console.log(' Extend Postman ')
      console.log('----------------')
      forEachFileIn(OUTPUT_PATH, (dirPathAutogen, fileAutogen) => {
        if (fileAutogen.indexOf('.postman.json') <= -1) return

        forEachFileIn(`${INTPUT_PATH}/postman/`, (dirPathPostman, filePostman) => {

          if (fileAutogen.replace('.postman.json', '.js') === filePostman) {
            const postmanObject = require(`${dirPathPostman}${filePostman}`)
            fs.writeFileSync(`${dirPathAutogen}/${fileAutogen}`, JSON.stringify(postmanObject))
          }
        })
      })
    }
  }
}

export = ContractConverter
