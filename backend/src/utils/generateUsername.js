function generateUsername(fullName, nim) {
  const cleanName = fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "");

  const nimSuffix = nim.slice(-4);

  return `${cleanName}${nimSuffix}`;
}

module.exports = generateUsername;