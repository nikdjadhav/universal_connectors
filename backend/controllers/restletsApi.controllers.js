const response = require("../lib/response");
const crypto = require("crypto");
const axios = require("axios");

function getNonce(length) {
  const alphabet =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(crypto.randomFillSync(new Uint8Array(length)))
    .map((x) => alphabet[x % alphabet.length])
    .join("");
}

const getRecordTypes = async (req, res) => {
  try {
    const authentication = {
      account: req.query.accountId,
      consumerKey: req.query.consumerKey,
      consumerSecret: req.query.consumerSecretKey,
      tokenId: req.query.accessToken,
      tokenSecret: req.query.accessSecretToken,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      nonce: getNonce(10),
      http_method: "POST",
      version: "1.0",
      scriptDeploymentId: "1",
      scriptId: "1529",
      signatureMethod: "HMAC-SHA256",
    };

    const base_url =
      "https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl";
    const concatenatedString = `deploy=${authentication.scriptDeploymentId}&oauth_consumer_key=${authentication.consumerKey}&oauth_nonce=${authentication.nonce}&oauth_signature_method=${authentication.signatureMethod}&oauth_timestamp=${authentication.timestamp}&oauth_token=${authentication.tokenId}&oauth_version=${authentication.version}&script=${authentication.scriptId}`;
    const baseString = `${authentication.http_method}&${encodeURIComponent(
      base_url
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
      resttype: req.query.resttype,
      recordtype: req.query.recordtype,
    };

    const payload = JSON.stringify(data);
    const headers = {
      "Content-Type": "application/json",
      Authorization: oAuth_String,
    };

    await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: payload,
    })
      .then((values) => {
        response({
          res,
          success: true,
          status_code: 200,
          data: [values.data],
          message: "Record types fetched successfully",
        });
        return;
      })
      .catch((error) => {
        if (error.response.status === 403) {
          response({
            res,
            success: false,
            status_code: 401,
            message: "Invalid credentials",
          });
          return;
        } else {
          response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Record types not fetched",
          });
          return;
        }
      });
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: " Error while fetching record types",
    });
    return;
  }
};

const getOptions = async (req, res) => {
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
    };

    if (req.body.recordtype) {
      const base_url =
        "https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl";
      const concatenatedString = `deploy=${authentication.scriptDeploymentId}&oauth_consumer_key=${authentication.consumerKey}&oauth_nonce=${authentication.nonce}&oauth_signature_method=${authentication.signatureMethod}&oauth_timestamp=${authentication.timestamp}&oauth_token=${authentication.tokenId}&oauth_version=${authentication.version}&script=${authentication.scriptId}`;
      const baseString = `${authentication.http_method}&${encodeURIComponent(
        base_url
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
        recordtype: req.body.recordtype,
      };

      const payload = JSON.stringify(data);
      const headers = {
        "Content-Type": "application/json",
        Authorization: oAuth_String,
      };

      await axios({
        method: "POST",
        url: url,
        headers: headers,
        data: payload,
      })
        .then((values) => {
          response({
            res,
            success: true,
            status_code: 200,
            data: [values.data],
            message: "Record types fetched successfully",
          });
        })
        .catch((error) => {
          response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Record types not fetched",
          });
          console.log("error", error);
        });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        data: [],
        message: "Send all the required parameters",
      });
    }
  } catch (error) {
    console.log("error==>", error);
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: " Error while fetching record types",
    });
  }
};

const authentication = async (req, res) => {
  try {
    const authentication = {
      account: req.body.accountId,
      consumerKey: req.body.consumerKey,
      consumerSecret: req.body.consumerSecretKey,
      tokenId: req.body.accessToken,
      tokenSecret: req.body.accessSecretToken,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      nonce: getNonce(10),
      http_method: "POST",
      version: "1.0",
      scriptDeploymentId: "1",
      scriptId: "1529",
      signatureMethod: "HMAC-SHA256",
    };

    const base_url =
      "https://tstdrv1423092.restlets.api.netsuite.com/app/site/hosting/restlet.nl";
    const concatenatedString = `deploy=${authentication.scriptDeploymentId}&oauth_consumer_key=${authentication.consumerKey}&oauth_nonce=${authentication.nonce}&oauth_signature_method=${authentication.signatureMethod}&oauth_timestamp=${authentication.timestamp}&oauth_token=${authentication.tokenId}&oauth_version=${authentication.version}&script=${authentication.scriptId}`;
    const baseString = `${authentication.http_method}&${encodeURIComponent(
      base_url
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
      recordtype: req.body.recordtype,
    };

    const payload = JSON.stringify(data);
    const headers = {
      "Content-Type": "application/json",
      Authorization: oAuth_String,
    };

    await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: payload,
    })
      .then((values) => {
        response({
          res,
          success: true,
          status_code: 200,
          data: [values.data],
          message: "Record types fetched successfully",
        });
        return;
      })
      .catch((error) => {
        if (error.response.status === 403) {
          response({
            res,
            success: false,
            status_code: 401,
            message: "Invalid credentials",
          });
          return;
        } else {
          response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Record types not fetched",
          });
          return;
        }
      });
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: " Error while fetching record types",
    });
    return;
  }
};

const getRedirectPage = async (req, res) => {
  try {
    const urlParams = {
      client_id:
        "350110252536-v0id00m9oaathq39hv7o8i1nmj584et1.apps.googleusercontent.com",
      scope:
        "https%3A//www.googleapis.com/auth/drive.readonly%20https%3A//www.googleapis.com/auth/spreadsheets",
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
    };
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${urlParams.client_id}&scope=${urlParams.scope}&access_type=${urlParams.access_type}&prompt=${urlParams.prompt}&include_granted_scopes=${urlParams.include_granted_scopes}&response_type=${urlParams.response_type}&redirect_uri=${urlParams.redirect_uri}`;

    response({
      res,
      success: true,
      status_code: 200,
      data: [url],
      message: "Redirect url",
    });
    return;
  } catch {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: "Error while fetching redirect url",
    });
    return;
  }
};

const addRefreshToken = async (req, res) => {
  try {
    const code = req.body.code;

    const url = "https://oauth2.googleapis.com/token";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const payload = {
      code: code,
      client_id:
        "350110252536-v0id00m9oaathq39hv7o8i1nmj584et1.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    };

    await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: payload,
    })
      .then((values) => {
        response({
          res,
          success: true,
          status_code: 200,
          data: [values.data],
          message: "Refresh token fetched successfully",
        });
        takeAction(req.body.userId, values.data.refresh_token);
      })
      .catch((error) => {
        response({
          res,
          success: false,
          status_code: 400,
          data: [],
          message: "Refresh token not fetched",
        });
        return;
      });
  } catch {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: "Error while fetching refresh token",
    });
    return;
  }
};

const takeAction = async (userId, token) => {
  const id = Number(userId);

  try {
    const getID = await prisma.credentials.findMany({
      where: {
        userId: id,
      },
      select: {
        userId: true,
      },
    });
    if (getID.length > 0) {
      updateCredentials(id, token);
    } else {
      addCredentials(id, token);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const addCredentials = async (user_id, refresh_token) => {
  const id = Number(user_id);

  try {
    const credentials = await prisma.credentials.create({
      data: {
        userId: id,
        refreshToken: refresh_token,
      },
    });
    if (credentials) {
    } else {
      console.log("credentials not added");
    }
  } catch (error) {
    console.log("error", error);
  }
};

const updateCredentials = async (user_id, refresh_token) => {
  const id = Number(user_id);

  try {
    const credentials = await prisma.credentials.updateMany({
      where: {
        userId: id,
      },
      data: {
        refreshToken: refresh_token,
        modificationDate: new Date(),
      },
    });

    if (credentials) {
      console.log("credentials updated", credentials);
    } else {
      console.log("credentials not updated");
    }
  } catch (error) {
    console.log("error", error);
  }
};

const getAccessToken = async (req, res) => {
  try {
    const token = await prisma.credentials.findMany({
      where: {
        userId: Number(req.params.id),
      },
    });

    if (token) {
      const data = {
        refreshToken: token[0].refreshToken,
        grantType: "refresh_token",
        clientId:
          "350110252536-v0id00m9oaathq39hv7o8i1nmj584et1.apps.googleusercontent.com",
        clientSecret: "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",
      };

      const url = `https://oauth2.googleapis.com/token?refresh_token=${data.refreshToken}&grant_type=${data.grantType}&client_id=${data.clientId}&client_secret=${data.clientSecret}`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      await axios({
        method: "POST",
        url: url,
        headers: headers,
      })
        .then((values) => {
          response({
            res,
            success: true,
            status_code: 200,
            data: [values.data],
            message: "Access token fetched successfully",
          });
        })
        .catch((error) => {
          response({
            res,
            success: false,
            status_code: 400,
            data: [],
            message: "Access token not fetched",
          });
          return;
        });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        data: [],
        message: "No token found",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: "Error while fetching access token",
    });
    return;
  }
};

const getFiles = async (req, res) => {
  const accessToken = req.body.accessToken;
  const url = "https://www.googleapis.com/drive/v3/files";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    await axios({
      method: "GET",
      url: url,
      headers: headers,
    })
      .then((values) => {
        response({
          res,
          success: true,
          status_code: 200,
          data: [values.data],
          message: "Files fetched successfully",
        });
      })
      .catch((error) => {
        response({
          res,
          success: false,
          status_code: 400,
          data: [],
          message: "Files not fetched",
        });
        return;
      });
  } catch {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: "Error while fetching files",
    });
    return;
  }
};

const getSheetsData = async (req, res) => {
  const sheetsId = req.query.sheetsId;
  const accessToken = req.query.accessToken;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/A1:ZZ100000`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    await axios({
      method: "GET",
      url: url,
      headers: headers,
    })
      .then((values) => {
        response({
          res,
          success: true,
          status_code: 200,
          data: [values.data],
          message: "Sheets data fetched successfully",
        });
      })
      .catch((error) => {
        response({
          res,
          success: false,
          status_code: 400,
          data: [],
          message: "Sheets data not fetched",
        });
        return;
      });
  } catch {
    response({
      res,
      success: false,
      status_code: 400,
      data: [],
      message: "Error while fetching sheets data",
    });
    return;
  }
};

const getcredentialDetailsById = async (req, res) => {
  try {
    const credentials = await prisma.credentials.findMany({
      where: {
        userId: Number(req.params.id),
      },
      select: {
        id: true,
        userId: true,
      },
    });
    if (credentials) {
      response({
        res,
        success: true,
        status_code: 200,
        data: credentials,
        message: "Credentials fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        data: [],
        message: "Credentials not fetched",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error while fetching credentials",
    });
  }
};

module.exports = {
  getRecordTypes,
  getOptions,
  authentication,
  getRedirectPage,
  addRefreshToken,
  getAccessToken,
  getFiles,
  getSheetsData,
  getcredentialDetailsById,
};
