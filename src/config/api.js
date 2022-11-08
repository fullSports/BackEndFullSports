const axios = require("axios");
const url = process.env.APP_URL

const api = axios.create({
    baseURL: url
})
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
module.exports = api