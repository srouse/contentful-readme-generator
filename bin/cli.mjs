#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import contentful from "contentful";
import 'dotenv/config';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import createReadmeProject from './createReadmeProject.mjs';
import renderHTML from './render/htmlTemplate.mjs';

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
      let htmlTemplate = renderHTML;
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

        const distConfig = processDistConfig(
          {rootFileName, folderName, htmlRootFileName, htmlDist},
          ctflReadmeJson
        );
        rootFileName = distConfig.rootFileName;
        folderName = distConfig.folderName;
        htmlRootFileName = distConfig.htmlRootFileName;
        htmlDist = distConfig.htmlDist;

        if ( ctflReadmeJson.children ) {
          for ( const child of ctflReadmeJson.children ) {
            const childConfig = {
              space: space,
              environment: environment,
              entryId: child.contentfulEntryId,
              htmlTemplate: htmlTemplate,
              ...processDistConfig(
                child,
                child
              ),
            };
            children.push(childConfig);
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


function processDistConfig({rootFileName, folderName, htmlRootFileName, htmlDist}, ctflReadmeJson) {
  let newRootFileName = rootFileName;
  let newFolderName = folderName;
  let newHtmlRootFileName = htmlRootFileName;
  let newHtmlDist = htmlDist;

  if ( ctflReadmeJson.dist ) {
    if (ctflReadmeJson.dist.markdown) {
      if (ctflReadmeJson.dist.markdown.folder) {
        newFolderName = ctflReadmeJson.dist.markdown.folder;
      }
      if (ctflReadmeJson.dist.markdown.index) {
        newRootFileName = ctflReadmeJson.dist.markdown.index;
      }
    }
    if (ctflReadmeJson.dist.html) {
      if (ctflReadmeJson.dist.html.folder) {
        newHtmlDist = ctflReadmeJson.dist.html.folder;
      }
      if (ctflReadmeJson.dist.html.index) {
        newHtmlRootFileName = ctflReadmeJson.dist.html.index;
      }
    }
  }

  return {
    rootFileName: newRootFileName,
    folderName: newFolderName,
    htmlRootFileName: newHtmlRootFileName,
    htmlDist: newHtmlDist,
  };
}