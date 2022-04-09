/**
 * @param {string} url
 * @description returns if inputed URL is really image or not
 * @returns {Boolean}
*/

const validateURL = (url) => {
  if (url === undefined || url === null) return false
  if (!url.trim()) return false

  var pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');

  return !!pattern.test(url);

}

module.exports = { validateURL }