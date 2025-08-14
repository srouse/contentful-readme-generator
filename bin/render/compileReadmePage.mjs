import { renderBadges } from 'badges';
import toc from 'markdown-toc';
import renderReadmeContent from './renderReadmeContent.mjs';
import {
  createContentfulAppLink,
  isReference,
  isReferenceArray,
  toKebobCase,
  uniqueDefaultName,
} from './utils.mjs';
import renderImage from './renderImage.mjs';
import
  renderReadmePage,
  {
    // HomeLinkReplacment,
    // LinkExtensionReplacment
} from './renderReadmePage.mjs';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import dompurify from 'dompurify';
import path from 'path';

export const DIST_FOLDER = '__##_DIST_FOLDER_9c8b2b87f3##__';
export const HOME_LINK = '__##_HOME_LINK_9c8b2b87f3##__';
export const PARENT_LINK = '__##_PARENT_LINK_9c8b2b87f3##__';
export const LINK_EXTENSION = '__##_LINK_EXTENSION_9c8b2b87f3##__';

export default function compileReadmePage(
  contentObj,
  hostType,
  readmeContentType,
  readmePageType,
  buildState,
  config,
  parentPage,
) {

  if (buildState.pagesLookup[contentObj.sys.id]) {
    console.log(`page already compiled...${contentObj.sys.id}`)
    return false;
  }

  buildState.pagesLookup[contentObj.sys.id] = true;

  const name = contentObj.fields.name || uniqueDefaultName();
  const readmeObj = {
    'name': '(Not Found, Fill Out Header)',
    'tableOfContents': '',
    'body': [],
    'content': '',
    'html': '',
  };
  if (parentPage) {
    readmeObj.url = `${config.folderName}/${toKebobCase(name)}.md`;
    readmeObj.htmlUrl = `${config.htmlDist}/${toKebobCase(name)}.html`;
  }else{
    readmeObj.url = `${config.rootFileName}.md`;
    readmeObj.htmlUrl = `${config.htmlRootFileName}.html`;
  }

  let doTableOfContents = true;
  // fields are mostly dynamic with name markdown syntax
  hostType.fields.map(typeField => {
    const content = contentObj.fields[typeField.id];
    const shouldRender = typeField.id.indexOf('hidden') === -1;

    if (content) {
      // TEXT
      if (
        typeField.type === 'Text' ||
        typeField.type === 'Symbol' // a complex text...
      ) {

        // HEADER
        if (typeField.id === 'name') {
          readmeObj.name = content;
          return;
        }

        if (typeField.id === 'title') {
          return;// title is mostly for Contentful...
        }

        // gonna do this verbosely for clarity
        if (
          typeField.name.indexOf('# ') === 0 ||
          typeField.name.indexOf('## ') === 0 ||
          typeField.name.indexOf('### ') === 0
        ) {
          readmeObj.body.push(`${typeField.name}\n\n`);
          readmeObj.body.push(`${content}\n\n`);
        }else{
          // just drop it otherwise...
          readmeObj.body.push(`__${typeField.name}__: ${content}\n\n`);
        }
      }

      if (typeField.type === 'Object') {
        // BADGES
        if (
          typeField.id === 'badges' &&
          content.config && 
          content.list
        ) {
          readmeObj.body.push(renderBadges(
            content.list,
            content.config,
            content.options
          ), '\n\n');
          return;
        }
      }

      // BOOLEAN - TABLE OF CONTENTS
      if (typeField.type === 'boolean') {
        if (typeField.id === 'tableOfContents') {
          doTableOfContents = content;
        }
        return;
      }

      // REFERENCES
      if (isReference(typeField, 'readmeContent') ) {
        readmeObj.body.push(
          renderReadmeContent(
            content,
            readmeContentType,
            buildState,
            config,
          )
        );
      }
      if (isReference(typeField, 'readmePage') ) {
        readmeObj.body.push(
          renderReadmePage(
            content,
            readmePageType,
            readmeContentType,
            buildState,
            config,
            readmeObj,
            shouldRender
          )
        );
      }
      if (isReference(typeField, 'image') ) {
        readmeObj.body.push(
          renderImage(content, config)
        );
      }

      // ARRAY OF REFERENCES
      if (isReferenceArray(
        typeField,
        ['readmeProject', 'readmeContent', 'readmePage', 'image']
      )) {
        content.map(contentEntry => {
          const contentType = contentEntry.sys.contentType.sys.id;
          if (contentType === 'image') {
            readmeObj.body.push(
              renderImage(contentEntry, config)
            );
          }
          if (contentType === 'readmeContent') {
            readmeObj.body.push(
              renderReadmeContent(
                contentEntry,
                readmeContentType,
                buildState,
                config,
              )
            );
          }
          if (
            contentType === 'readmePage' ||
            contentType === 'readmeProject'
          ) {
            readmeObj.body.push(
              renderReadmePage(
                contentEntry,
                readmePageType,
                readmeContentType,
                buildState,
                config,
                readmeObj,
                shouldRender
              )
            );
          }
        })
      }
    }
  })

  // footer
  // every entry has a sys...
  const updatedDate = new Date(contentObj.sys.updatedAt);
  readmeObj.body.push(`<div class="build-information">
Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: ${updatedDate.toLocaleString()}*

*__space__: ${config.space}*

*__environment__: ${config.environment}*

*__entity id__: ${contentObj.sys.id}*

</div>

[&#9998; edit](${createContentfulAppLink(contentObj, config)})
`);

  if (doTableOfContents) {
    readmeObj.tableOfContents = `
${toc(readmeObj.body.join(''), {
  maxdepth: 2,
}).content}

---
`
  }

  // FINAL CONTENT BUILD
  const homeBtn = `[home](${HOME_LINK})\n\n`;
  const readmeContent = `${parentPage ? homeBtn : ''}# ${readmeObj.name}
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->
${readmeObj.tableOfContents}

${readmeObj.body.join('')}`;

  const html = marked(readmeContent);
  const window = new JSDOM('').window;
  const purify = dompurify(window);
  const cleanHtml = purify.sanitize(html);

  readmeObj.html = cleanHtml;
  readmeObj.content = readmeContent;

  // REPLACEMENTS
  var linkRegEx = new RegExp(LINK_EXTENSION,"g");
  readmeObj.html = cleanHtml.replace(linkRegEx, 'html');
  readmeObj.html = readmeObj.html.replace(/href="https/g, 'target="_blank" href="https');
  readmeObj.html = readmeObj.html.replace(
    /(<a\b[^>]*)(?=>✎ edit)/g,
    '$1 class="edit-link"'
  );
  readmeObj.html = readmeObj.html.replace(
    /(<a\b[^>]*)(?=>✎ video edit)/g,
    '$1 class="edit-link"'
  );
  readmeObj.html = readmeObj.html.replace(
    /(<a\b[^>]*)(?=>✎ contentful)/g,
    '$1 class="edit-link"'
  );
  readmeObj.html = readmeObj.html.replace(
    /(<a\b[^>]*)(?=>✎ figma)/g,
    '$1 class="edit-link"'
  );
  readmeObj.content = readmeObj.content.replace(linkRegEx, 'md');

  var distFolderRegEx = new RegExp(DIST_FOLDER,"g");
  const relativeHtmlLink = path.dirname(path.relative(path.dirname(readmeObj.htmlUrl), `${config.htmlDist}/index.html` ));
  readmeObj.html = readmeObj.html.replace(distFolderRegEx, `${relativeHtmlLink}`);
  const relativeMdLink = path.dirname(path.relative(path.dirname(readmeObj.url), `${config.folderName}/index.md` ));
  readmeObj.content = readmeObj.content.replace(distFolderRegEx, `${relativeMdLink}`);

  var homeRegex = new RegExp(HOME_LINK,"g");
  const relativeHomeHtmlLink = path.relative(path.dirname(readmeObj.htmlUrl), `${config.htmlRootFileName}.html` );
  readmeObj.html = readmeObj.html.replace(homeRegex, relativeHomeHtmlLink);
  const relativeHomeMdLink = path.relative(path.dirname(readmeObj.url), `${config.rootFileName}.md` );
  readmeObj.content = readmeObj.content.replace(homeRegex, relativeHomeMdLink);

  return readmeObj;
}
