import {
  isReference,
  isReferenceArray,
} from './utils.mjs';

export default function renderReadmeContent(
  readmeContent,
  readmeContentType,
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

    if (isReference(typeField, 'link')) {
      console.log('-------LINK');
    }
    if (isReferenceArray(typeField, 'link')) {
      console.log('-------LINK ARR');
    }

    if (isReference(typeField, 'image')) {
      const imgUrl = `https:${content.fields.asset.fields.file.url}`;
      output.push(
        `\n## ${content.fields.title}\n[![${content.fields.title}](${imgUrl})](${imgUrl} "View Full Size")`
      );
    }
    if (isReferenceArray(typeField, 'image')) {
      content?.map(image => {
        const imgUrl = `https:${image.fields.asset.fields.file.url}`;
        output.push(
          `\n## ${image.fields.title}\n[![${image.fields.title}](${imgUrl})](${imgUrl} "View Full Size")`
        );
      });
    }
  });

  /*
  if (readmeContent.fields.pageLinks) {
    readmeContent.fields.pageLinks.map(pageLink => {
      output.push(
        `[${pageLink.fields.header}](${config.folderName}/${pageLink.fields.urlSlug})`
      );
    });
  }
  */

  return `${output.join('\n')}\n\n`;
}


