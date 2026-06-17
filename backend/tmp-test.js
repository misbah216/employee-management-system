const mongoose = require("mongoose");
const uri = "mongodb://saifimisbah7_db_user:MvBM4xXbvim9LsXu@ac-fnq1cdm-shard-00-00.apbntql.mongodb.net:27017,ac-fnq1cdm-shard-00-01.apbntql.mongodb.net:27017,ac-fnq1cdm-shard-00-02.apbntql.mongodb.net:27017/ems?replicaSet=atlas-123lc5-shard-0&authSource=admin&tls=true";
mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 })
  .then(() => { console.log("CONNECTED"); return mongoose.connection.db.admin().ping(); })
  .then(() => { console.log("PING OK"); return mongoose.disconnect(); })
  .catch(err => { console.error("ERR", err); process.exitCode = 1; mongoose.disconnect().catch(() => {}); });
