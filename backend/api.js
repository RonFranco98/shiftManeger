const MongoClient = require('mongodb').MongoClient;
let MongoURL = "mongodb://localhost:27017/";
let DBName = "shiftManeger"

exports.addEntity = (json , coll) =>{
    MongoClient.connect(MongoURL, function(err, db) {
    if (err) throw err;
    let dbo = db.db(DBName);
    dbo.collection(coll).insertOne(json , (err , res) => {})
    });
}
exports.search = (query , coll ,callback) =>{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        let dbo = db.db(DBName);
        dbo.collection(coll).find(query).toArray(function(err, result) {
          if (err) throw err;
          db.close();
          callback(err , result)
        });
    });
}

exports.update = (query, filed, values, coll) =>{
    MongoClient.connect(MongoURL, function(err, db) {
        if (err) throw err;
        let dbo = db.db(DBName);
        let newValues = {$set : {[filed] : values}}
        dbo.collection(coll).updateOne(query, newValues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
}