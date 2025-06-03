// /// <reference path="./.sst/platform/config.d.ts" />

// export default $config({
//   app(input) {
//     return {
//       name: "componentcheck",
//       removal: input?.stage === "production" ? "retain" : "remove",
//       protect: ["production"].includes(input?.stage),
//       home: "aws",
//     };
//   },
//   async run() {
//     const vpc = new sst.aws.Vpc("MyVpc");
//     const cluster = new sst.aws.Cluster("MyCluster", { vpc });


//     new sst.aws.Service("API", {
//       cluster,
//       loadBalancer: {
//         ports: [{ listen: "80/http", forward: "3000/http" }],
//       },
//       dev: {
//         command: "npm run start:dev",
//       },
//     });
//   }
// });
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "componentcheck",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");
    const cluster = new sst.aws.Cluster("MyCluster", { vpc });
    const database = new sst.aws.Postgres("compcheck", {vpc})

    // const postgres = new sst.aws.Postgres("CompCheckDB", {
    //   vpc,
    //   version: "15",   // Versão separada
    //   database: "compcheck",
    // });

    new sst.aws.Service("API", {
      cluster,
      loadBalancer: {
        ports: [{ listen: "80/http", forward: "3000/http" }],
      },
      dev: {
        command: "npm run start:dev",
      },
      link: [database],
      environment: {
        DB_HOST: String(database.nodes.instance?.endpoint),
        DB_PORT: String(database.nodes.instance?.port),
        DB_NAME: String(database.nodes.instance?.dbName),
        DB_USERNAME: database.username,
        DB_PASSWORD: database.password,
        TYPEORM_SYNCHRONIZE: "true",
      },
    });
  }
});