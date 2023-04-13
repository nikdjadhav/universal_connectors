const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userController = require("./controllers/user.controllers");
const integrationController = require("./controllers/integration.controllers");
const resletController = require("./controllers/restletsApi.controllers");
const fieldMappingController = require("./controllers/fieldMapping.controllers");
// require("dotenv").config();
// const session = require("express-session");
// const prisma = require("./lib/prisma");
// const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();
// const port = 4000;
const port = process.env.PORT || 4000;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const v1Router = express.Router();
app.use("/v1", v1Router);

// *** user routes ***
v1Router.post("/", userController.createUser);
v1Router.get("/login", userController.userLogin);
v1Router.post("/verifyToken", userController.verifyToken);
v1Router.get("/getUser/:token", userController.getUser);
v1Router.put("/updateUser/:id", userController.updateUser);

// *** integration routes ***
v1Router.post("/addIntegration", integrationController.createIntegration);
v1Router.get("/getIntegrations/:id", integrationController.getIntegrations);
v1Router.get(
  "/getIntegrationById/:id",
  integrationController.getIntegrationById
);
v1Router.post("/deleteIntegration", integrationController.deleteIntegration);
v1Router.put("/updateIntegration/:id", integrationController.updateIntegration);
v1Router.post("/addConfigurations", integrationController.addConfigurations);
v1Router.get(
  "/getConfigurationById/:id",
  integrationController.getConfigurationById
);
v1Router.put("/updateConfiguration/:id", integrationController.updateConfiguration);
v1Router.get(
  "/getConfigurationByIntegrationId/:id",
  integrationController.getConfigurationByIntegrationId
);

// *** reslet routes ***
v1Router.get("/getRecordTypes", resletController.getRecordTypes);
v1Router.post("/restletAuthentication", resletController.authentication);
v1Router.post("/getOptions", resletController.getOptions);
v1Router.get("/getRedirectPage", resletController.getRedirectPage);

// *** field mapping routes ***
v1Router.post("/addMappedRecord", fieldMappingController.addMappedRecord);
// v1Router.post(
//   "/getAllMappedRecords",
//   fieldMappingController.getAllMappedRecords
// );
v1Router.get(
  "/getMappedRecordById/:id",
  fieldMappingController.getMappedRecordById
);
v1Router.delete(
  "/deleteMappedRecordByID/:id",
  fieldMappingController.deleteMappedRecordByID
);
v1Router.get(
  "/getMappedFieldsDetails/:id",
  fieldMappingController.getMappedFieldsDetails
);
// *** add fields routes
v1Router.post("/addFields", fieldMappingController.addFields);
// v1Router.post("/addPrimaryFields", fieldMappingController.addPrimaryFields);
v1Router.get("/getFields/:id", fieldMappingController.getFields);
v1Router.delete("/deleteField/:id", fieldMappingController.deleteField);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
