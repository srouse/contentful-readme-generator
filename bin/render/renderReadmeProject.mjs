import compileReadmePage from './compileReadmePage.mjs';

export default function renderReadmeProject(
  contentObj,
  readmeProjectType,
  readmeContentType,
  readmePageType,
  buildState,
  config
) {

  const compiledPage = compileReadmePage(
    contentObj,
    readmeProjectType,
    readmeContentType, readmePageType,
    buildState,
    config,
  );
  buildState.totals.readmePage++;
  buildState.pages.push(compiledPage);
  return compiledPage;
}
