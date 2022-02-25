const CryptoJS = require("crypto-js");

/**
 * @param {string} data
 * @description returns decrypted data
 * @returns {string}
*/

const decryptData = (data) => {
	const bytes  = CryptoJS.AES.decrypt(data, process.env.PASSWORD_HASH);
	const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

	return decryptedData
}

module.exports = { decryptData }