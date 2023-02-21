import { renderBadges } from 'badges';
import toc from 'markdown-toc';
import renderReadmeContent from './renderReadmeContent.mjs';
import {
  isReference,
  isReferenceArray,
  toKebobCase,
  uniqueDefaultName,
} from './utils.mjs';
import renderImage from './renderImage.mjs';
import
  renderReadmePage,
  {
    LinkExtensionReplacment
} from './renderReadmePage.mjs';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import dompurify from 'dompurify';

export default function compileReadmePage(
  contentObj,
  hostType,
  readmeContentType,
  readmePageType,
  buildState,
  config
) {

  if (buildState.pagesLookup[contentObj.sys.id]) {
    console.log(`page already compiled...${contentObj.sys.id}`)
    return false;
  }

  buildState.pagesLookup[contentObj.sys.id] = true;

  const name = contentObj.fields.name || uniqueDefaultName();
  const readmeObj = {
    'url': `${config.folderName}/${toKebobCase(name)}.md`,
    'htmlUrl': `${config.folderName}/${toKebobCase(name)}.html`,
    'name': '(Not Found, Fill Out Header)',
    'tableOfContents': '',
    'body': [],
    'content': '',
    'html': '',
  };
  let doTableOfContents = true;
  console.log('start');
  // fields are mostly dynamic with name markdown syntax
  hostType.fields.map(typeField => {
    const content = contentObj.fields[typeField.id];
    // console.log('typeField.id', typeField.id, typeField.type, content);
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
          )
        );
      }
      if (isReference(typeField, 'image') ) {
        readmeObj.body.push(
          renderImage(content)
        );
      }

      // ARRAY OF REFERENCES
      if (isReferenceArray(typeField, ['readmeContent', 'readmePage', 'image'])) {
        content.map(contentEntry => {
          const contentType = contentEntry.sys.contentType.sys.id;
          if (contentType === 'image') {
            readmeObj.body.push(
              renderImage(contentEntry)
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
          if (contentType === 'readmePage') {
            readmeObj.body.push(
              renderReadmePage(
                contentEntry,
                readmePageType,
                readmeContentType,
                buildState,
                config,
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
  const buildDate = new Date();
  readmeObj.body.push(`## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: ${updatedDate.toLocaleString()}*

*__built__: ${buildDate.toLocaleString()}*

*__space__: ${config.space}*

*__environment__: ${config.environment}*

*__entity id__: ${contentObj.sys.id}*

[Edit Contentful Entry](https://app.contentful.com/spaces/${config.space}/environments/${config.environment}/entries/${contentObj.sys.id})`);

  if (doTableOfContents) {
    readmeObj.tableOfContents = `
${toc(readmeObj.body.join('')).content}

---
`
  }

  const readmeContent = `# ${readmeObj.name}
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

  var re = new RegExp(LinkExtensionReplacment,"g");
  readmeObj.html = cleanHtml.replace(re, 'html');
  readmeObj.content = readmeContent.replace(re, 'md');
  return readmeObj;
}
