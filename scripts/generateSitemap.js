const glob = require('glob')
const fs = require('fs')

// DOMAIN NAME WITHOUT THE LAST /
const domain = "https://www.avior.me"

const files = glob.sync('./out/**/*.html')
let res = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

for (let file of files) {
	file = file.replace("./out", "").replace("index.html", "")
	res += `<url><loc>${domain}${file}</loc></url>`
}

res += `</urlset>`
fs.writeFileSync('./out/sitemap.xml', res)



console.log(res)
