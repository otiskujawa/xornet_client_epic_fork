const fs = require('fs');

module.exports = {
    devServer: {
        //public: 'https://xornet.cloud',
        disableHostCheck: true,
        https: false,
        //cert: fs.readFileSync('./cert.pem'),
        //key: fs.readFileSync('./key.pem'),
    },
}