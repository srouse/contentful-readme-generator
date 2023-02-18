import {
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
  output.push(
    `## ${readmeContent.fields.header}`
  );

  if (readmeContent.fields.content) {
    // Issue with images from contentfull
    const content = readmeContent.fields.content.replace(
      '](//',
      '](https://'
    )
    output.push(content);
  }

  readmeContentType.fields.map(typeField => {
    const content = readmeContent.fields[typeField.id];

    if (isReference(typeField, 'image')) {
      output.push(renderImage(content));
    }
    if (isReferenceArray(typeField, ['image'])) {
      content?.map(image => {
        output.push(renderImage(image));
      });
    }
  });

  buildState.totals.readmeContent++;
  return `${output.join('\n')}\n\n`;
}


