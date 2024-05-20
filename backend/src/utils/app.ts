import express, { Router } from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const whitelist = {
  hostname: ["localhost", "127.0.0.1", "0.0.0.0"],
  default: "http://localhost:3000",
};
const importRoutes = (directoryPath: string, router: Router) => {
  // Read all files and directories in the directory
  fs.readdirSync(directoryPath).forEach((item) => {
    // Construct the full path to the item
    const itemPath = path.join(directoryPath, item);
    // Check if the item is a directory
    if (fs.statSync(itemPath).isDirectory()) {
      // Recursively import routes from subdirectory
      importRoutes(itemPath, router);
    } else if (item.endsWith(".ts")) {
      // Check if the item is a JavaScript file
      // Dynamically import the route module
      const routeModule = require(itemPath);
      // Invoke the route module function with the router
      console.log("item path", itemPath);
      router.use(routeModule.default);
    }
  });
};

const app = express();
app.get("/", (req, res) => {
  res.send(`Worker process ${process.pid}`);
});

app.all("*", function (req, res, next) {
  res.set({ "content-type": "application/json; charset=utf-8" });
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const hostname = req.hostname;

  const originTest = whitelist.hostname.some((pattern) => {
    return hostname.includes(pattern);
  })
    ? hostname
    : undefined;
  if (originTest) {
    next();
  } else {
    console.log("hostname not allowed", hostname);
    res.status(403).send("Not Allowed CORS");
  }
});
app.use(cors());

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const routesDirectory = path.join(__dirname + "/../", "pages", "api");
importRoutes(routesDirectory, router);
app.use("/", router);

// Middleware to log routes
// console.log("Routes:", router.stack);

export { app };
