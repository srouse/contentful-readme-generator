import { renderBadges } from 'badges';
import toc from 'markdown-toc';
import renderReadmeContent from './renderReadmeContent.mjs';
import {
  isReference,
  isReferenceArray,
} from './utils.mjs';

export default function renderReadmeProject(
  contentObj,
  readmeProjectType,
  readmeContentType,
  // readmePageType,
  config
) {
  const readmeObj = {
    'url' : 'README.md',
    'name': '(Not Found, Fill Out Header)',
    'tableOfContents': '',
    'body': [],
    'content': '',
  };
  let doTableOfContents = true;

  // fields are mostly dynamic with name markdown syntax
  readmeProjectType.fields.map(typeField => {
    const content = contentObj.fields[typeField.id];

    console.log('typeField', typeField.id, typeField.type);

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

      // BOOLEAN - TABLE OF CONTENTS
      if (typeField.type === 'boolean') {
        if (typeField.id === 'tableOfContents') {
          doTableOfContents = content;
        }
        return;
      }

      // REFERENCES
      // url
      /*
      if (isReference(typeField, 'url') ) {
        // nothing really...file name is determined by CLI for project
        // console.log('---is url', typeField.id);
      }
      */

      // link
      /*if (isReference(typeField, 'link') ) {
        console.log('---is link', typeField.id);
      }
      if (isReferenceArray(typeField, 'link')) {
        console.log('---is array of links', typeField.id);
      }
      */

      // readmeContent
      if (isReference(typeField, 'readmeContent') ) {
        readmeObj.body.push(
          renderReadmeContent(
            content,
            readmeContentType,
            config,
          )
        );
      }
      if (isReferenceArray(typeField, 'readmeContent')) {
        content.map(readmeContent => {
          readmeObj.body.push(
            renderReadmeContent(
              readmeContent,
              readmeContentType,
              config,
            )
          );
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

  readmeObj.content = `# ${readmeObj.name}
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->
${readmeObj.tableOfContents}

${readmeObj.body.join('')}`;

  return readmeObj;
}
