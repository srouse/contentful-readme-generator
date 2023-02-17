import chalk from 'chalk';
import { promises as fs } from 'fs';
import renderReadmeProject from './render/renderReadmeProject.mjs';

const log = console.log;

export default async function createReadmeProject(
  client,
  entryId,
  config,
) {
  
  // Load in the project (it throws if it can't find it...)
  const entryResults = await client.getEntries({
    [`sys.id`]: entryId,
    'include': 10
  });

  if (entryResults.total !== 1) {
    throw 'no result found';
  }

  const result = entryResults.items[0];

  // we also need some metadata about the content type
  const readmeProjectType = await client
    .getContentType('readmeProject');

  const readmeContentType = await client
    .getContentType('readmeContent');

  // const readmePageType = await client
  //   .getContentType('readmePage');
  
  log(chalk.grey('Loaded Entry'));

  // Create content
  const renderedProject = renderReadmeProject(
    result,
    readmeProjectType,
    readmeContentType,
    // readmePageType,
    config
  );
  log(chalk.grey('Built Content'));

  await fs.writeFile(`${config.fileName}.md`, renderedProject.content);
  log(chalk.grey(`Created file: ${config.fileName}`));
}
