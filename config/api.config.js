var env = process.env.NODE_ENV === 'production'
module.exports = {
	baseURL:env ? 'http://maohemao.com' : '/api'
}