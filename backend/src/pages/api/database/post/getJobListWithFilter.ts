import express from "express";
import fs from "fs";
import { getDataFolderPath } from "../../../../utils/getDataFolderPath";
import { Todo } from "../../../../types/todoTypes";
const router = express.Router();
const path = "/api/database/post/getJobListWithFilter";
router.post(path, async (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(getDataFolderPath() + "/todo.json", "utf8")
  ) as Todo[];

  res.status(200).json({
    value: data,
  });
  return;
});
export default router;
