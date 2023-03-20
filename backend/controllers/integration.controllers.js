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
        createdAt: new Date(),
        updatedAt: undefined,
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
  // console.log("requestd body", req.body);
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
    return;
  }
};

const getIntegrations = async (req, res) => {
  // console.log('requestd body',req.body);
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
    return;
  }
};

module.exports = {
  createIntegration,
  getIntegrations,
  getIntegrationById
};
