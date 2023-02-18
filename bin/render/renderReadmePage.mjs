import {
  toKebobCase,
} from './utils.mjs';
import compileReadmePage from './compileReadmePage.mjs';

// Just trying to stay away from potential real content
export const LinkExtensionReplacment = '23409283423234_LINK_EXTENSION_23423425';

export default function renderReadmePage(
  page,
  readmePageType,
  readmeContentType,
  buildState,
  config,
) {
  const compiledPage = compileReadmePage(
    page,
    readmePageType,
    readmeContentType, readmePageType,
    buildState,
    config,
  );
  if (compiledPage !== false) {
    buildState.pages.push(compiledPage);
    buildState.totals.readmePage++;
  }

  const name = page.fields.name;
  return `## [${name}](./${config.folderName}/${toKebobCase(name)}.${
    LinkExtensionReplacment
  })\n\n`;
}