const CryptoJS = require("crypto-js");

/**
 * @param {string} data
 * @description returns ecnypted data
 * @returns {string}
*/

const hashData = (data) => {
	const hashPassword = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.PASSWORD_HASH).toString()
	return hashPassword;
}

module.exports = { hashData }
