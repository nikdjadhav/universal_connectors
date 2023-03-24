const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
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

// const secret = process.env.SESSION_SECRET;
// const store = new session.MemoryStore();
// const protect = (req, res, next) => {
//   const { authenticated } = req.session;

//   if (!authenticated) {
//     res.sendStatus(401);
//   } else {
//     next();
//   }
// };
// app.use(
//   session({
//     secret,
//     resave: false,
//     saveUninitialized: false,
//     store,
//   })
// );

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const v1Router = express.Router();
app.use("/v1", v1Router);

// *** user routes ***
v1Router.post("/", userController.createUser);
v1Router.post("/login", userController.userLogin);
v1Router.post("/verifyToken", userController.verifyToken);
v1Router.post("/getUser", userController.getUser);
v1Router.post("/updateUser", userController.updateUser);

// *** integration routes ***
v1Router.post("/addIntegration", integrationController.createIntegration);
v1Router.post("/getIntegrations", integrationController.getIntegrations);
v1Router.post("/getIntegrationById", integrationController.getIntegrationById);
v1Router.post("/addConfigurations", integrationController.addConfigurations);
v1Router.post("/getConfigurationById", integrationController.getConfigurationById);

// *** reslet routes ***
v1Router.post("/getRecordTypes", resletController.getRecordTypes);

// *** field mapping routes ***
v1Router.post("/AddMappedRecord", fieldMappingController.AddMappedRecord);
v1Router.post("/getAllMappedRecords", fieldMappingController.getAllMappedRecords);
v1Router.post("/getMappedRecordById", fieldMappingController.getMappedRecordById);
v1Router.post("/getMappedFieldsDetails", fieldMappingController.getMappedFieldsDetails);
// *** add fields routes
v1Router.post("/addFields", fieldMappingController.addFields);
v1Router.post("/addPrimaryFields", fieldMappingController.addPrimaryFields);
v1Router.post("/getFields", fieldMappingController.getFields);

// app.get("/v1/login", (req, res) => {
//   const { authenticated } = req.session;

//   console.log('rr',req.session.user);
//   if (authenticated) {
//     // req.session.authenticated = true;
//     res.send("Already authenticated");

//   } else {
//     res.send("Successfully authenticated");

//   }
// });
app.get("/v1/test", (req, res) => {
//     console.log('rr',req.session.user);
//   req.session.destroy(() => {
    res.send("Successfully logged out");
//   });
});

// const crypto = require("crypto");
// const axios = require("axios");

// function getNonce(length) {
//   const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   return Array.from(crypto.randomFillSync(new Uint8Array(length)))
//     .map((x) => alphabet[x % alphabet.length])
//     .join("");
// }

// const account = "TSTDRV1423092";
// const consumerKey = "7c5f5179740c2fd6bb6c73a6c1235d369ccc61f608abed76acf7cc1bc0245caf";
// const consumerSecret = "f02dc5c3720c99b35efd1713941477e7bd34c9467d43727199a222d3596b11a3";
// const tokenId = "df85b218f1627ea731b61d503330947261b512ca88a5e12beaa4a4316ee0cbe6";
// const tokenSecret = "508004293fd1a44799817805c39208d781f909e69456f3b9d0184a54d51739ea";
// const timestamp = Math.floor(Date.now() / 1000).toString();
// const nonce = getNonce(10);
// const http_method = "POST";
// const version = "1.0";
// const scriptDeploymentId = "1"; // replace your restlet URL deploy id
// const scriptId = "1529"; // replace your restlet URL script id
// const signatureMethod = "HMAC-SHA256";
// // replace your restlet script EXTERNAL URL (only base url not any parameters)
// const base_url = "https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl";
// const concatenatedString = `deploy=${scriptDeploymentId}&oauth_consumer_key=${consumerKey}&oauth_nonce=${nonce}&oauth_signature_method=${signatureMethod}&oauth_timestamp=${timestamp}&oauth_token=${tokenId}&oauth_version=${version}&script=${scriptId}`;
// const baseString = `${http_method}&${encodeURIComponent(base_url)}&${encodeURIComponent(concatenatedString)}`;
// const keys = `${consumerSecret}&${tokenSecret}`;
// const signature = crypto.createHmac("sha256", keys).update(baseString).digest("base64");
// const oAuth_String = `OAuth realm="${account}", oauth_consumer_key="${consumerKey}", oauth_token="${tokenId}", oauth_nonce="${nonce}", oauth_timestamp="${timestamp}", oauth_signature_method="HMAC-SHA256", oauth_version="1.0", oauth_signature="${encodeURIComponent(
//   signature
// )}"`;
// // replace your restlet script EXTERNAL URL
// const url = `https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=${scriptId}&deploy=${scriptDeploymentId}`;
// const data = {
//   // name: "VendBill_242391.pdf",
//   // fileType: "PDF",
//   // contents: "RXh0ZXJuYWwgSUQsTmFtZQ0KMTAzLHNjYXJsZXQNCjEwMixkYXduDQoxMDQsc3VuDQo=",
//   // folder: 4450,
//   // internalId: "",
//   // externalId: "VENBIL01ID",
//   resttype: "ListOfRecordType",
// };
// const payload = JSON.stringify(data);
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: oAuth_String,
// };
// v1Router.post("/getRecordTypes", (req, res) => {
//   fetch(url, {
//     method: "POST",
//     headers: headers,
//     body: payload,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//       res.send(data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
//   // axios({
//   //   method: "POST",
//   //   url: url,
//   //   headers: headers,
//   //   data: payload,
//   // }).then((response) => {
//   //   console.log("res", response.data);
//   //   res.send(response.data);
//   // }).catch ((error) => {
//   //   console.log("error", error);
//   // });
// });



app.listen(port, () => {
  console.log("Server is running on port " + port);
});
