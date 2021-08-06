import * as path from 'path'
import * as fs from 'fs'
import { Command, flags } from '@oclif/command'
import j2s from 'joi-to-swagger'
import { generateApi } from 'swagger-typescript-api'
const Converter = require('openapi-to-postmanv2')
const enforcer = require('openapi-enforcer')
const { generate, option } = require('json-schema-faker')
import { pom } from './pom'

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
  static description = 'Write your API models in Joi. Automatically generate OAS 3.0, TypeScript, Java, and Postman.'

  static flags = {
    examples: flags.boolean({char: 'e', description: 'Compiles example JSON payloads from OAS spec to directory specified by output'}),
    help: flags.help({char: 'h', description: 'Show CLI help'}),
    input: flags.string({char: 'i', description: 'Path to directory with Joi schemas'}),
    java: flags.boolean({char: 'j', description: 'Compiles Java Interfaces from OAS spec to directory specified by output'}),
    output: flags.string({char: 'o', description: 'Directory to store output'}),
    postman: flags.boolean({char: 'p', description: 'Compiles Postman scripts from OAS spec to directory specified by output'}),
    ts: flags.boolean({char: 't', description: 'Compiles Typescript Interfaces from OAS spec to directory specified by output'}),
    version: flags.version({char: 'v', description: 'Show CLI version'}),
    warn: flags.boolean({char: 'w', description: 'Enable warnings'}),
  }

  // static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ContractConverter)

    const INTPUT_PATH = path.resolve(process.cwd(), flags.input || '')
    const OUTPUT_PATH = path.resolve(process.cwd(), flags.output || '')
    const TMP_DIRNAME = 'tmp'

    console.log('---------------')
    console.log(' Compiling Joi ')
    console.log('---------------')
    forEachFileIn(`${INTPUT_PATH}/schema`, (dirPath: string, file: string) => {
      fs.mkdirSync(dirPath.replace('/schema', `/${TMP_DIRNAME}/schema`), {recursive: true})
      fs.copyFileSync(`${dirPath}/${file}`, `${dirPath}/${file}`.replace('/schema', `/${TMP_DIRNAME}/schema`))

      const model = require(`${dirPath}/${file}`)
      const joiSchema = model[file.replace('.js', '')]

      if (joiSchema) {
        const { swagger } = j2s(joiSchema, {})

        const outputDir = dirPath.replace('/schema', `/${TMP_DIRNAME}/schema`)
        fs.mkdirSync(outputDir, {recursive: true})
        fs.writeFileSync(`${outputDir}/${file.replace('.js', '.oas.json')}`, JSON.stringify(swagger))
      }
    })

    // Rename tmp to the output dir. This allows the consumer to use their --output option as their import into OAS
    // specs. More predictable from consumer standpoint. The compilation step after this will all utilize --output
    // as well.
    fs.renameSync(`${INTPUT_PATH}/${TMP_DIRNAME}`, OUTPUT_PATH)

    if (flags.examples) {
      console.log('----------------------------')
      console.log(' Generating Sample Payloads ')
      console.log('----------------------------')
      option({
        alwaysFakeOptionals: true,
        useDefaultValue: true,
        useExamplesValue: true,
      });
      forEachFileIn(`${OUTPUT_PATH}/schema/`, (dir, file) => {
        if (file.indexOf('.oas.json') <= -1) return
        const schema = require(`${dir}/${file}`)
        fs.writeFileSync(`${dir}/${file.replace('.oas.json', '.example.json')}`, JSON.stringify(generate(schema)))
      })
    }

    console.log('---------------')
    console.log(' Compiling OAS ')
    console.log('---------------')
    fs.readdirSync(INTPUT_PATH).forEach((fileName: string) => {
      if (fileName.indexOf('.js') > -1) {
        let fileContent = fs.readFileSync(`${INTPUT_PATH}/${fileName}`).toString()
        fileContent = fileContent.split(require('../package.json').name).join(OUTPUT_PATH)

        fs.writeFileSync(`${INTPUT_PATH}/${fileName}.tmp`, fileContent) // this tmp is so that we can replace @kevinki.ng/contractualize

        const swagger = require(`${INTPUT_PATH}/${fileName}.tmp`)
        enforcer(swagger, { fullResult: true })
        .then(({ error, warning }: any) => {
          if (error) {
            console.error(error)
          } else if (flags.warn && warning) {
            console.warn(warning)
          }
        }).catch((error: Error) => console.error(error))

        fs.writeFileSync(`${OUTPUT_PATH}/${fileName.replace('.js', '.oas.json')}`, JSON.stringify(swagger))

        fs.unlinkSync(`${INTPUT_PATH}/${fileName}.tmp`)
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
            fs.mkdirSync(`${OUTPUT_PATH}/typescript`, {recursive: true})
            fs.writeFileSync(`${OUTPUT_PATH}/typescript/${fileName.replace('.oas.json', '.ts')}`, content)
          })
        })
        .catch(error => console.error(error))
      })
    }

    if (flags.java) {
      const mvn = require('maven').create({})

      const oasSpecFileNames: Array<string> = []
      fs.readdirSync(OUTPUT_PATH).forEach((fileName: string) => {
        if (fileName.indexOf('.oas.json') <= -1) return
        oasSpecFileNames.push(fileName)
      })

      fs.writeFileSync('pom.xml', pom(OUTPUT_PATH, oasSpecFileNames))

      mvn.execute(['clean', 'generate-sources'], { skipTests: true }).then(() => {
        // As mvn.execute(..) returns a promise, you can use this block to continue
        // your stuff, once the execution of the command has been finished successfully.
      })
    }

    if (flags.postman) {
      console.log('-------------------')
      console.log(' Compiling Postman ')
      console.log('-------------------')
      fs.mkdirSync(`${OUTPUT_PATH}/postman`, { recursive: true });
      fs.readdirSync(OUTPUT_PATH).forEach((fileName: string) => {
        if (fileName.indexOf('.oas.json') <= -1) return

        const openapiData = fs.readFileSync(`${OUTPUT_PATH}/${fileName}`, {encoding: 'UTF8'})

        Converter.convert({ type: 'string', data: openapiData }, {}, (error: any, conversionResult: any) => {
          if (error) {
            console.error(error)
            return
          }

          if (conversionResult.result) {
            fs.writeFileSync(`${OUTPUT_PATH}/postman/${fileName.replace('.oas.json', '.json')}`, JSON.stringify(conversionResult.output[0].data))
          } else {
            console.error('Could not convert', conversionResult.reason)
          }
        })
      })

      console.log('----------------')
      console.log(' Extend Postman ')
      console.log('----------------')
      forEachFileIn(`${OUTPUT_PATH}/postman`, (dirPathAutogen, fileAutogen) => {
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
