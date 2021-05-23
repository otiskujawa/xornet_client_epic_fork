const fs = require('fs');

module.exports = {
    devServer: {
        public: 'xornet.cloud',
        https: true,
        cert: fs.readFileSync('./cert.pem'),
        key: fs.readFileSync('./key.pem'),
    },
}