const CryptoJS = require("crypto-js");
const PASSWORD_HASH = require("../env.json").PASSWORD_HASH

/**
 * @param {string} data
 * @description returns ecnypted data
 * @returns {string}
*/

const hashData = (data) => {
	const hashPassword = CryptoJS.AES.encrypt(JSON.stringify(data), PASSWORD_HASH).toString()
	return hashPassword;
}

module.exports = { hashData }
