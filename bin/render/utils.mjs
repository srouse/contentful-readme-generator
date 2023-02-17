

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

export function isReferenceArray(typeField, type) {
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
        if (
          validations.linkContentType &&
          validations.linkContentType.length === 1
        ) {
          const linkContentType = validations.linkContentType[0];
          return linkContentType === type;
        }
      }
    }
  }
  return false;
}
