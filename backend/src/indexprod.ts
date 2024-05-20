import cluster from "cluster";
import os from "os";
import { app } from "./utils/app";
import dotenv from "dotenv";
dotenv.config();
const numCPUs = Math.floor(os.cpus().length / 2);
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const server = app.listen(3001, () => {
    console.log(`Worker process ${process.pid} is listening on port 3001`);
  });
}
