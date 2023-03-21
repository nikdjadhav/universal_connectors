const response = require("../lib/response");
const crypto = require("crypto");

function getNonce(length) {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => alphabet[x % alphabet.length])
    .join("");
}

const getRecordTypes = async (req, res) => {
  console.log("req", req.body);

  try {
    const authentication = {
      account: req.body.account,
      consumerKey: req.body.consumerKey,
      consumerSecret: req.body.consumerSecret,
      tokenId: req.body.tokenId,
      tokenSecret: req.body.tokenSecret,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      nonce: getNonce(10),
      http_method: "POST",
      version: "1.0",
      scriptDeploymentId: req.body.scriptDeploymentId,
      scriptId: req.body.scriptId,
      signatureMethod: "HMAC-SHA256",
      base_url: req.body.base_url,
    };
    console.log("authentication.length", req.body);

    if (req.body.base_url) {
      const concatenatedString = `deploy=${authentication.scriptDeploymentId}&oauth_consumer_key=${authentication.consumerKey}&oauth_nonce=${authentication.nonce}&oauth_signature_method=${authentication.signatureMethod}&oauth_timestamp=${authentication.timestamp}&oauth_token=${authentication.tokenId}&oauth_version=${authentication.version}&script=${authentication.scriptId}`;
      const baseString = `${authentication.http_method}&${encodeURIComponent(
        authentication.base_url
      )}&${encodeURIComponent(concatenatedString)}`;
      const keys = `${authentication.consumerSecret}&${authentication.tokenSecret}`;
      const signature = crypto
        .createHmac("sha256", keys)
        .update(baseString)
        .digest("base64");
      const oAuth_String = `OAuth realm="${
        authentication.account
      }", oauth_consumer_key="${authentication.consumerKey}", oauth_token="${
        authentication.tokenId
      }", oauth_nonce="${authentication.nonce}", oauth_timestamp="${
        authentication.timestamp
      }", oauth_signature_method="HMAC-SHA256", oauth_version="1.0", oauth_signature="${encodeURIComponent(
        signature
      )}"`;

      const url = `https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=${authentication.scriptId}&deploy=${authentication.scriptDeploymentId}`;

      const data = {
        resttype: req.body.resttype,
      };

      const payload = JSON.stringify(data);
      const headers = {
        "Content-Type": "application/json",
        Authorization: oAuth_String,
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: payload,
      })
        .then((res) => res.json())
        .then((json) => {
        //   console.log("json", json);
          response({
            res,
            success: true,
            status_code: 200,
            data: json,
            message: "Record types fetched successfully",
          });
        })
        .catch((error) => {
          console.log("error", error);
          response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Record types not fetched",
          });
        });
    } else{
        response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Send all the required parameters",
        });
    }
  } catch (error) {
    console.log("error", error);
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: " Error while fetching record types",
    });
  }
};

module.exports = {
  getRecordTypes,
};
