#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import contentful from "contentful";
import 'dotenv/config';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import createReadmeProject from './createReadmeProject.mjs';

const log = console.log;

yargs(hideBin(process.argv))
  .scriptName("ctfl-readme")
  .usage('$0 <cmd> [args]')
  .command(
    'build [fileName]',
    'Load Contentful content and build a readme file',
    (yargs) => {
      yargs.positional('fileName', {
        type: 'string',
        default: 'README',
        describe: 'The name of the file to generate. (can NOT be in a folder)'
      });
    }, 
    async (argv) => {
      log(chalk.blue('Building README from Contentful'));
      const ctflReadmeJsonRaw = await fs.readFile('ctfl-readme.json')
        .catch(err => console.log('error with readme...building with .env only'));

      let space = process.env.CTFL_README_CONTENTFUL_SPACE;
      let environment = process.env.CTFL_README_CONTENTFUL_ENVIRONMENT;
      let entryId = process.env.CTFL_README_CONTENTFUL_ENTRY_ID;
      
      if (ctflReadmeJsonRaw) {
        const ctflReadmeJson = JSON.parse(ctflReadmeJsonRaw);
        if ( ctflReadmeJson.contentfulSpace ) 
          space = ctflReadmeJson.contentfulSpace;
        if ( ctflReadmeJson.contentfulEnvironment ) 
          environment = ctflReadmeJson.contentfulEnvironment;
        if ( ctflReadmeJson.contentfulEntryId ) 
          entryId = ctflReadmeJson.contentfulEntryId;
      }

      const config = {
        space,
        environment,
        accessToken: process.env.CTFL_README_CONTENTFUL_ACCESS_TOKEN,
        entryId,
        fileName: argv.fileName,
        folderName: argv.fileName, // where other pages need to be created...
      };
      const client = contentful.createClient(config);

      try {
        await createReadmeProject(
          client, entryId, config,
        );

        log(chalk.green('Contentful Readme Generator done.'));
      }catch(err) {
        console.log('Contentful error:', err);
      };
    })
  .help()
  .argv