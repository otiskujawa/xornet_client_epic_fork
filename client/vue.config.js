const fs = require('fs');

module.exports = {
    devServer: {
        public: 'https://xornet.cloud',
        disableHostCheck: true,
        port: 8082,
        https: true,
        cert: fs.readFileSync('./cert.pem'),
        key: fs.readFileSync('./key.pem'),
    },
}