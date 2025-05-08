let ENV = 'LOCAL';
if (ENV == 'LOCAL') {
    module.exports.dbPort = "27017";
    module.exports.dbURL = "mongodb://127.0.0.1:27017/demos";
    module.exports.dbName = "demos";
}