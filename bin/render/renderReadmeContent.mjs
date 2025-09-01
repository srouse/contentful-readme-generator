import {
  createContentfulAppLink,
  createContentfulAssetLink,
  isReference,
  isReferenceArray,
} from './utils.mjs';
import renderImage from './renderImage.mjs';

export default function renderReadmeContent(
  readmeContent,
  readmeContentType,
  buildState,
  config,
  depth = 2
) {
  const output = [];


  readmeContentType.fields.map(typeField => {
    const content = readmeContent.fields[typeField.id];

    if (typeField.id === 'header') {
      output.push(
        `${'#'.repeat(depth)} ${content}`
      );
    }
  
    if (typeField.id === 'content' && content) {
      // Issue with images from contentfull
      const finalContent = content.replace(
        '](//',
        '](https://'
      )
      output.push(finalContent);
    }

    if (typeField.id === 'files' && content) {
      content.map(file => {
        output.push(`\n\[${file.fields.title}](https:${file.fields.file.url})\n`);
      });
    }
  
    if (typeField.id === 'videos' && content) {
      content.map(video => {
        output.push(`\n<video style="width: 100%; height: auto;" src="${video.fields.file.url}" controls></video>\n`);
        output.push(`\n[&#9998; video edit](${createContentfulAssetLink(video, config)})`);
      });
    }

    if (typeField.type === 'Date' && content) {
      output.push(`\n${typeField.name}: ${new Date(content).toLocaleDateString()}\n`);
    }

    if (isReference(typeField, 'image')) {
      output.push(renderImage(content, config));
    }
    if (isReferenceArray(typeField, ['image'])) {
      content?.map(image => {
        output.push(renderImage(image, config));
      });
    }

    if (isReference(typeField, 'readmeContent')) {
      output.push(renderReadmeContent(content, readmeContentType, buildState, config, depth + 1));
    }
    if (isReferenceArray(typeField, ['readmeContent'])) {
      content?.map(readmeContent => {
        output.push(renderReadmeContent(readmeContent, readmeContentType, buildState, config, depth + 1));
      });
    }


  });

  buildState.totals.readmeContent++;
  return `${output.join('\n')}\n\n[&#9998; edit](${createContentfulAppLink(readmeContent, config)})\n\n`;
}


