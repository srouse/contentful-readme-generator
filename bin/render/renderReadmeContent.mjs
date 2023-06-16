import {
  createContentfulAppLink,
  isReference,
  isReferenceArray,
} from './utils.mjs';
import renderImage from './renderImage.mjs';

export default function renderReadmeContent(
  readmeContent,
  readmeContentType,
  buildState,
  config,
) {
  const output = [];

  let header;
  if (readmeContent.fields.header) {
    header = readmeContent.fields.header;
  }else if (readmeContent.fields.name) {
    header = readmeContent.fields.name;
  }else{
    header = readmeContent.fields.title;
  }
  output.push(
    `## ${header}`
  );

  if (readmeContent.fields.content) {
    // Issue with images from contentfull
    const content = readmeContent.fields.content.replace(
      '](//',
      '](https://'
    )
    output.push(content);
  }

  if (readmeContent.fields.files) {
    readmeContent.fields.files.map(file => {
      output.push(`\n\[${file.fields.title}](https:${file.fields.file.url})\n`);
    });
  }

  readmeContentType.fields.map(typeField => {
    const content = readmeContent.fields[typeField.id];

    if (isReference(typeField, 'image')) {
      output.push(renderImage(content, config));
    }
    if (isReferenceArray(typeField, ['image'])) {
      content?.map(image => {
        output.push(renderImage(image, config));
      });
    }
  });

  buildState.totals.readmeContent++;
  return `${output.join('\n')}\n\n[&#9998; edit](${createContentfulAppLink(readmeContent, config)})\n\n`;
}


