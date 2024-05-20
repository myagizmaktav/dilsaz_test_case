import { app } from "./utils/app";
import { getDataFolderPath } from "./utils/getDataFolderPath";
const server = app.listen(3001, () => {
  console.log(`Worker process ${process.pid} is listening on port 3001`);
});
