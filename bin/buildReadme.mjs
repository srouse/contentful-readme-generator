import { renderBadges } from 'badges';
import toc from 'markdown-toc';

export default function buildReadme( contentObj, contentType, config ) {
  const readmeObj = {
    "title": '',
    "tableOfContents": '',
    "body": []
  };
  let doTableOfContents = true;

  // fields are mostly dynamic with header markdown syntax
  contentType.fields.map(typeField => {
    const content = contentObj.fields[typeField.id];
    if (content) {

      // TITLE
      if (typeField.id === "title") {
        readmeObj.title = `# ${content}`;
        return;
      }

      // BADGES
      if (
        typeField.id === "badges" &&
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

      // TABLE OF CONTENTS
      if (
        typeField.id === "tableOfContents" &
        ( content === true || content === false ) ) {
          doTableOfContents = content;
          return;
      }

      // gonna do this verbosely for clarity
      if (typeField.name.indexOf('# ') === 0) {
        readmeObj.body.push(`${typeField.name}\n\n`);
      }else if (typeField.name.indexOf('## ') === 0) {
        readmeObj.body.push(`${typeField.name}\n\n`);
        readmeObj.body.push(`${content}\n\n`);
      }else if (typeField.name.indexOf('### ') === 0) {
        readmeObj.body.push(`${typeField.name}\n\n`);
        readmeObj.body.push(`${content}\n\n`);
      }else{
        if (Array.isArray(content)) {
          const subContent = content.map(child => {
            // it's a Contentful object...
            if (child.fields) {
              return Object.entries(child.fields).map(entry => {
                return `${entry[1]}`;
              }).join(', ');
            }
          });
          readmeObj.body.push(`__${typeField.name}__: \n\n- ${subContent.join('\n\n- ')}\n\n`);
        }else{
          readmeObj.body.push(`__${typeField.name}__: ${content}\n\n`);
        }
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

*__entity id__: ${config.entityId}*

[Edit Contentful Entry](https://app.contentful.com/spaces/${config.space}/environments/${config.environment}/entries/${config.entityId})`);

  if (doTableOfContents) {
    readmeObj.tableOfContents = `
${toc(readmeObj.body.join('')).content}

---
`
  }

  const content = `<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->
${readmeObj.title}
${readmeObj.tableOfContents}

${readmeObj.body.join('')}`;

  return content;
}


