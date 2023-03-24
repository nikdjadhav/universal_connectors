const prisma = require("../lib/prisma");
const response = require("../lib/response");

const createIntegration = async (req, res) => {
  // console.log('requestd body',req.body);
  // console.log(req.method);
  try {
    const integration = await prisma.integrations.create({
      data: {
        userId: req.body.userId,
        integrationName: req.body.integrationName,
        sourceName: req.body.sourceName,
        destinationName: req.body.destinationName,
        // createdAt: new Date(),
        // updatedAt: undefined,
        creationDate: new Date(),
        modificationDate: undefined, 
        schedule: false,
        fieldMapping: false,
        status: "Completed",
        syncWay: req.body.syncWay,
      },
    });
    // console.log('integration',integration);

    if (integration) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [integration],
        message: "Integration created successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Integration not created",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating integration",
    });
    console.log("error", error);
    return;
  }
};

// get integration using id
const getIntegrationById = async (req, res) => {
  console.log("requestd body", req.body);
  try {
    const integration = await prisma.integrations.findUnique({
      where: {
        id: req.body.id,
      },
    });

    if (integration) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [integration],
        message: "Integration fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Integration not found",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching integration",
    });
    console.log("error", error);
    // return;
  }
};

const getIntegrations = async (req, res) => {
  console.log("requestd body");
  console.log('requestd body',req.body);
  try {
    const integrations = await prisma.integrations.findMany({
      where: {
        userId: req.body.userId,
      },
    });
    // console.log('integrations',integrations);
    if (integrations) {
      response({
        res,
        success: true,
        status_code: 200,
        data: integrations,
        message: "Integrations fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Integrations not found",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching integrations",
    });
    console.log("error", error);
    // return;
  }
};

const addConfigurations = async (req, res) => {
  console.log("addConfigurations", req.body);
  try{
    const configurations = await prisma.configurations.create({
      data: {
        userId: req.body.userId,
        integrationId: req.body.integrationId,
        systemName: req.body.systemName,
        url: req.body.url,
        accountId: req.body.accountId,
        consumerKey: req.body.consumerKey,
        consumerSecretKey: req.body.consumerSecretKey,
        accessToken: req.body.accessToken,
        accessSecretToken: req.body.accessSecretToken,
        authenticationType: req.body.authenticationType,
      },
    });

    if (configurations) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [configurations],
        message: "Configurations created successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Configurations not created",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating configurations",
    });
    console.log("error", error);
    return;
  }
}

const getConfigurationById = async (req, res) => {
  console.log("requestd body", req.body);
  try {
    const configuration = await prisma.configurations.findMany({
      where: {
        // id: req.body.id,
          integrationId: req.body.integrationId,
      },
    });

    if (configuration) {
      response({
        res,
        success: true,
        status_code: 200,
        data: configuration,
        message: "Configuration fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Configuration not found",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching configuration",
    });
    console.log("error", error);
    // return;
  }
}

module.exports = {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  addConfigurations,
  getConfigurationById
};
