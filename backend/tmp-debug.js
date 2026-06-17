const mongoose = require("mongoose");
const uri = "mongodb://saifimisbah7_db_user:MvBM4xXbvim9LsXu@ac-fnq1cdm-shard-00-00.apbntql.mongodb.net:27017,ac-fnq1cdm-shard-00-01.apbntql.mongodb.net:27017,ac-fnq1cdm-shard-00-02.apbntql.mongodb.net:27017/ems?replicaSet=atlas-123lc5-shard-0&authSource=admin&tls=true";
(async () => {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  console.log('READYSTATE_AFTER_CONNECT', mongoose.connection.readyState);
  console.log('HAS_DB', !!mongoose.connection.db);
  await mongoose.disconnect();
})();
