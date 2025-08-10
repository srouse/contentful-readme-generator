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
    'build',
    'Load Contentful content and build a readme file',
    (yargs) => {}, 
    async (argv) => {
      log(chalk.blue('Building README from Contentful'));
      const ctflReadmeJsonRaw = await fs.readFile('ctfl-readme.json')
        .catch(err => console.log('error with readme...building with .env only'));

      let space = process.env.CTFL_README_CONTENTFUL_SPACE;
      let environment = process.env.CTFL_README_CONTENTFUL_ENVIRONMENT;
      let entryId = process.env.CTFL_README_CONTENTFUL_ENTRY_ID;
      let rootFileName = 'README';
      let folderName = 'README';
      let htmlTemplate = '';
      let htmlRootFileName = 'README';
      let htmlDist = 'dist';
      
      const children = [];
      if (ctflReadmeJsonRaw) {
        const ctflReadmeJson = JSON.parse(ctflReadmeJsonRaw);
        if ( ctflReadmeJson.contentfulSpace ) 
          space = ctflReadmeJson.contentfulSpace;
        if ( ctflReadmeJson.contentfulEnvironment ) 
          environment = ctflReadmeJson.contentfulEnvironment;
        if ( ctflReadmeJson.contentfulEntryId ) 
          entryId = ctflReadmeJson.contentfulEntryId;
        if ( ctflReadmeJson.rootFileName ) 
          rootFileName = ctflReadmeJson.rootFileName;
        if ( ctflReadmeJson.folderName ) 
          folderName = ctflReadmeJson.folderName;
        if ( ctflReadmeJson.htmlTemplate ) 
          htmlTemplate = ctflReadmeJson.htmlTemplate;
        if ( ctflReadmeJson.htmlRootFileName ) 
          htmlRootFileName = ctflReadmeJson.htmlRootFileName;
        if ( ctflReadmeJson.htmlDist ) 
          htmlDist = ctflReadmeJson.htmlDist;
        if ( ctflReadmeJson.children ) {
          
          for ( const child of ctflReadmeJson.children ) {
            const childFolder = child.childFolder?.replace(/\/+$/, '');
            children.push({
              space: space,
              environment: environment,
              entryId: child.contentfulEntryId, // child entry id
              rootFileName:  `${childFolder}/${rootFileName}`,
              folderName: `${childFolder}/${folderName}`,
              htmlTemplate: htmlTemplate,
              htmlRootFileName: `${childFolder}/${htmlRootFileName}`,
              htmlDist: `${childFolder}/${htmlDist}`,
            });
          }
        }
      }

      if (!space || !environment || !entryId) {
        log(chalk.red('no space, environment, or entry id found'));
        return;
      }

      const config = {
        space,
        environment,
        accessToken: process.env.CTFL_README_CONTENTFUL_ACCESS_TOKEN,
        entryId,
        rootFileName,
        folderName,
        htmlTemplate,
        htmlRootFileName,
        htmlDist,
      };
      const client = contentful.createClient(config);

      try {
        
        await createReadmeProject(
          client, entryId, config,
        );
        log(chalk.bgGreen(`Main Project Done: ${entryId}`));

        for ( const child of children ) {
          await createReadmeProject(
            client, child.entryId, child,
          );
          log(chalk.bgGreen(`Child Project Done: ${child.entryId}`));
        }

        log(chalk.green('Contentful Readme Generator done.'));
      }catch(err) {
        console.log('Contentful error:', err);
      };
    })
  .help()
  .argv