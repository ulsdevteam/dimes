/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
	locales: ["de", "en", "es", "fr", "it", "ja", "pt"],
	sourceLocale: "en",
	catalogs: [{
		path: "src/locales/{locale}/messages",
		include: ["src"],
		exclude: ["**/node_modules/**", "src/styles/**", "src/locales**"]
	}],
	format: "po"
 }
