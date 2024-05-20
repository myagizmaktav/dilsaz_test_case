import express from "express";
import fs from "fs";
import uuid4 from "uuid4";
import { getDataFolderPath } from "../../../../utils/getDataFolderPath";
import { Todo } from "../../../../types/todoTypes";
const router = express.Router();
const path = "/api/database/post/createJobListWithFilter";
router.post(path, async (req, res) => {
  const data = JSON.parse(
    fs.readFileSync(getDataFolderPath() + "/todo.json", "utf8")
  ) as Todo[];

  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method Not Allowed",
    });
    return;
  }

  try {
    const body = req.body;

    const editedData = JSON.parse(body.values) as Todo;
    console.log(editedData);

    let isEdited = false;
    let id = uuid4();
    const newData = [
      ...data,
      {
        ...editedData,
        id: id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    fs.writeFileSync(
      getDataFolderPath() + "/todo.json",
      JSON.stringify(newData, null, 2)
    );

    res.status(200).json({
      message: "Data updated successfully",
    });
    return;
  } catch (e: any) {
    res.status(500).json({
      message: "Error: " + e.message,
    });
    return;
  }
});
export default router;
