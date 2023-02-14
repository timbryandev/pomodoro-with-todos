export const toCamelCase = (str: string) =>
  str
    .toLowerCase()
    .split(/[-_\s]/g)
    .reduce(
      (accString, char) =>
        accString + (char.charAt(0).toUpperCase() + char.slice(1)),
    )

export const toTitleCase = (str: string) =>
  str
    .replace(/[-_]/g, ' ')
    .replace(
      /(\w)\S*/g,
      char => char.charAt(0).toUpperCase() + char.substring(1).toLowerCase(),
    )
