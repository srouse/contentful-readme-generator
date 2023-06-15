

export function isReference(typeField, type) {
  if (
    typeField.type === 'Link' &&
    typeField.linkType === 'Entry'
  ) {
    // Entry reference...
    if (
      typeField.validations &&
      typeField.validations.length === 1
    ) {
      const validations = typeField.validations[0];
      if (
        validations.linkContentType &&
        validations.linkContentType.length === 1
      ) {
        const linkContentType = validations.linkContentType[0];
        return linkContentType === type;
      }
    }
  }
  return false;
}

export function isReferenceArray(typeField, typeArr) {
  // Array of References
  if (
    typeField.type === 'Array'
  ) {
    if (
      typeField.items &&
      typeField.items.type === 'Link' &&
      typeField.items.linkType === 'Entry'
    ) {
      const items = typeField.items;
      if (
        items.validations &&
        items.validations.length === 1
      ) {
        const validations = items.validations[0];
        let passes = false;
        if (
          validations.linkContentType
        ) {
          validations.linkContentType.map(linkContentType => {
            // just need one valid type...will ignore invalid types
            if (typeArr.indexOf(linkContentType) !== -1) {
              passes = true;
            }
          })
          // const linkContentType = validations.linkContentType[0];
          // return typeArr.indexOf(linkContentType) !== -1;
          return passes;
        }
      }
    }
  }
  return false;
}

export function toKebobCase(str) {
  return str
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};

let untitledNumber = 0;

export function uniqueDefaultName() {
  return `untitled-${untitledNumber++}`;
}

export function createContentfulAppLink(
  entry, config
) {
  return `https://app.contentful.com/spaces/${config.space}/environments/${config.environment}/entries/${entry.sys.id}`;
}

function escapeRegExp(strToEscape) {
  // Escape special characters for use in a regular expression
  return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function trim(origString, charToTrim) {
  charToTrim = escapeRegExp(charToTrim);
  var regEx = new RegExp("^[" + charToTrim + "]+|[" + charToTrim + "]+$", "g");
  return origString.replace(regEx, "");
}