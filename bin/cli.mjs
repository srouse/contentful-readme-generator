#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import contentful from "contentful";
import 'dotenv/config';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import buildReadme from './buildReadme.mjs';

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
        default: 'README.md',
        describe: 'The name of the file to generate. (can NOT be in a folder)'
      });
    }, 
    async (argv) => {
      log(chalk.blue('Building README from Contentful'));
      const config = {
        space: process.env.CTFL_README_CONTENTFUL_SPACE,
        environment: process.env.CTFL_README_CONTENTFUL_ENVIRONMENT,
        accessToken: process.env.CTFL_README_CONTENTFUL_ACCESS_TOKEN,
        entityId: process.env.CTFL_README_CONTENTFUL_ENTRY_ID
      };
      const client = contentful.createClient(config);

      try {
        const results = await client
          .getEntry(config.entityId);

        // we also need some metadata about the content type
        const contentType = await client 
          .getContentType(results.sys.contentType.sys.id);

        log(chalk.grey('Loaded Entry'));
        const fileContent = buildReadme(
          results,
          contentType,
          config
        );
        log(chalk.grey('Built Content'));

        await fs.writeFile(argv.fileName, fileContent);
        log(chalk.grey(`Created file: ${argv.fileName}`));

        log(chalk.green('Contentful Readme Generator done.'));
      }catch(err) {
        console.log('Contentful error:', err);
      };
    })
  .help()
  .argv