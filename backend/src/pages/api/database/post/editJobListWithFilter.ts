import express from "express";
import fs from "fs";
import { getDataFolderPath } from "../../../../utils/getDataFolderPath";
import { Todo } from "../../../../types/todoTypes";
const router = express.Router();
const path = "/api/database/post/editJobListWithFilter";
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
    console.log(body);
    const editedData = body.values;

    let isEdited = false;

    const newData = data.map((item) => {
      if (item.id === editedData.id) {
        isEdited = true;
        return {
          ...editedData,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    if (!isEdited) {
      res.status(400).json({
        message: "Data not found",
      });
      return;
    }

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
