const MongoClient = require('mongodb').MongoClient;
const dbConnectionUrl = 'mongodb+srv://test:testian123@webprojectcluster.oipym.mongodb.net/products?retryWrites=true&w=majority';

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log('[MongoDB connection] SUCCESS');
            successCallback(dbCollection);
        }
    });
}
module.exports = {
    initialize
};