/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
	locales: ["de", "en", "es", "fr", "it", "ja", "ko", "pt", "tr", "zh"],
	sourceLocale: "en",
	catalogs: [{
		path: "src/locales/{locale}/messages",
		include: ["src"],
		exclude: ["**/node_modules/**", "src/styles/**", "src/locales**"]
	}],
	format: "po"
 }
