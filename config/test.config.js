var config = {
  env: 'test',
  db: {
    mongo: {
      MONGO_HOST:  'cluster0-shard-00-00.fqnkp.mongodb.net,cluster0-shard-00-01.fqnkp.mongodb.net,cluster0-shard-00-02.fqnkp.mongodb.net'
      ,MONGO_PORT: '27017'
      ,MONGO_SSL: 1
      ,MONGO_DATABASE: 'alcaldia'
      ,MONGO_USER: 'user1'
      ,MONGO_PASSWORD: 'Fs1_ccc'
      ,MONGO_AUTH_SOURCE: 'admin'
      ,MONGO_REPLICASET: 'atlas-s7fatd-shard-0'
    }

  }, server: {
    host: '0.0.0.0',
    port: 8080,
    enableDebugMode: true,
  },
};

module.exports = Object.freeze(config);
