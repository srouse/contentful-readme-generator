import { createContentfulAppLink } from "./utils.mjs";

export default function renderImage(
  image,
  config
) {
  if (image.sys.type === 'Asset') {
    const imgUrl = `https:${image.fields.file.url}`;
    return `\n## ${
      image.fields.title
    }\n[![${image.fields.title}](${imgUrl})](${imgUrl} "View Full Size")\n\n`;
  }

  // It's an Entry of type 'image'
  if (
    image.sys.type === 'Entry' &&
    image.sys.contentType.sys.id === 'image'
  ) {
    if (
      !image.fields.asset ||
      !image.fields.asset.fields.file
    ) {
      console.log(`no image found in array for ${readmeContent.sys.id}`)
      return '';
    }

    let sourceLinks = [];
    sourceLinks.push(`[&#9998; contentful](${createContentfulAppLink(image, config)})`);
    if (
      image.fields.figmaFileId &&
      image.fields.figmaNodeId
    ) {
      sourceLinks.push(`[&#9998; figma](https://www.figma.com/file/${
        image.fields.figmaFileId
      }/?node-id=${
        image.fields.figmaNodeId
      })`);
    }
    const imgUrl = `https:${image.fields.asset.fields.file.url}`;

    return `\n[![${image.fields.title}](${imgUrl})](${imgUrl} "${image.fields.title ? `${image.fields.title} - ` : ''}View Full Size")
    \n${sourceLinks.join(' ')}\n`;
  }
  return '';
}