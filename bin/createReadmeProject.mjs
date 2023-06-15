import chalk from 'chalk';
import fs, { promises as fsPromise } from 'fs';
import renderReadmeProject from './render/renderReadmeProject.mjs';
import githubMarkdownCss from 'generate-github-markdown-css';

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

  const readmePageType = await client
    .getContentType('readmePage');
  
  log(chalk.grey('Loaded Entry'));

  const buildState = {
    pages: [],
    pagesLookup: {},
    totals: {
      readmeContent: 0,
      readmePage: 0
    },
  }

  // Create content
  renderReadmeProject(
    result,
    readmeProjectType,
    readmeContentType,
    readmePageType,
    buildState,
    config
  );
  log(chalk.grey('Built Content'));
  
  if (buildState.pages.length > 1) {
    const dir = config.folderName;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  if (config.htmlTemplate) {
    const dir = `${config.htmlDist}/${config.folderName}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const css = await githubMarkdownCss({ light: 'light', dark: 'dark' });

  let templateFileFunk;
  if (config.htmlTemplate) {
    const templateFile = config.htmlTemplate;
    const templateFilePath = `${process.cwd()}/${templateFile}`;
    if (fs.existsSync(templateFilePath)) {
      const templateFileModule = await import(templateFilePath);
      templateFileFunk = templateFileModule.default;
    } else {
      console.error(`no ${templateFile} file`);
      return;
    }
  }

  await Promise.all(
    buildState.pages.map(async (page) => {
      log(chalk.grey(`Created file: ${page.url}`));
      if (templateFileFunk) {
        const finalHtml = templateFileFunk(page.html, css);
        await fsPromise.writeFile(`${config.htmlDist}/${page.htmlUrl}`, finalHtml);
      }
      return fsPromise.writeFile(page.url, page.content);
    })
  )
}
