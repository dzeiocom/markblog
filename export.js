const replace = require('replace-in-file')
const options = {
	files: [
		'out/**/*.html',
		'out/**/*.js',
		'out/*.html',
	],
	from: /_next/g,
	to: 'assets',
	countMatches: true
}

const options2 = {
	files: [
		'out/**/*.html',
		'out/**/*.js',
		'out/*.html',
	],
	from: /__next/g,
	to: 'root',
	countMatches: true
}

const options3 = {
	files: [
		'out/**/*.html',
		'out/**/*.js',
		'out/*.html',
	],
	from: /__NEXT_DATA__/g,
	to: '__DZEIO_DATA__',
	countMatches: true
}


async function run() {
	try {
		const res3 = await replace(options3)
		// console.log(res3)
		const res2 = await replace(options2)
		// console.log(res2)
		const results = await replace(options)
		// console.log(results)
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

run()
