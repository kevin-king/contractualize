import * as path from 'path';
import * as fs from 'fs';
import {Command, flags} from '@oclif/command'
import j2s from 'joi-to-swagger'
import {generateApi} from 'swagger-typescript-api';

function forEachFileIn(dirPath: string, callback: (arg0: string, arg1: string) => void) {
  fs.readdirSync(dirPath).forEach((file) => {
    const absolutePath = path.join(dirPath, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      forEachFileIn(absolutePath, callback);
    } else {
      callback(dirPath, file);
    }
  });
}

// con --path ./api-contracts
// con --output ./api-contracts/autogen
class ContractConverter extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'Name to print'}),
    path: flags.string({char: 'p', description: 'Path to directory with Joi schemas'}),
    output: flags.string({char: 'o', description: 'Directory to store output'}),
    copy: flags.boolean({char: 'c', description: 'Copies Joi schemas to directory specified by output'}),
  }

  // static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(ContractConverter)

    const INTPUT_PATH = path.resolve(process.cwd(), flags.path || '')

    console.log('---------------')
    console.log(' Compiling Joi ')
    console.log('---------------')
    forEachFileIn(`${INTPUT_PATH}/joi`, (dirPath: string, file: string) => {
      const model = require(`${dirPath}/${file}`);
      const joiSchema = model[file.replace('.js', '')]

      if (!joiSchema) return;
      const { swagger } = j2s(joiSchema, {});

      const outputDir = `${dirPath.replace('/joi', '/autogen')}/`;
      fs.mkdirSync(outputDir, {recursive: true})
      fs.writeFile(`${outputDir}/${file.replace('.js', '.json')}`, JSON.stringify(swagger), function (err) {
        if (err) console.log(err)
      })
    })

    console.log('---------------')
    console.log(' Compiling OAS ')
    console.log('---------------')
    fs.readdir(INTPUT_PATH || '', (err, fileNames) => {
      fileNames.forEach((fileName) => {
        if (fileName.indexOf('.js') > -1) {
          const swagger = require(`${INTPUT_PATH}/${fileName}`);
          fs.writeFile(`${INTPUT_PATH}/autogen/${fileName.replace('.js', '.json')}`, JSON.stringify(swagger), function (err) {
            if (err) console.log(err);
          });
        }
      });
    });

    // console.log('--------------')
    // console.log(' Compiling TS ')
    // console.log('--------------')
    // forEachFileIn(`${INTPUT_PATH}/autogen`, (dirPath: string, file: string) => {
    //   if (file.indexOf('.json') <= -1) return
    //
    //   /* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
    //   generateApi({
    //     name: "MySuperbApi.ts",
    //     output: path.resolve(process.cwd(), "./src/__generated__"),
    //     url: 'http://api.com/swagger.json',
    //     input: path.resolve(process.cwd(), './foo/swagger.json'),
    //   })
    //     .then(({ files, configuration }) => {
    //       files.forEach(({ content, name }) => {
    //         fs.writeFile(path, content);
    //       });
    //     })
    //     .catch(e => console.error(e))
    // })
  }
}

export = ContractConverter
