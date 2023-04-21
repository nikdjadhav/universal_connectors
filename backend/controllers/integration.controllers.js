const prisma = require("../lib/prisma");
const response = require("../lib/response");

const createIntegration = async (req, res) => {
  try {
    const integration = await prisma.integrations.create({
      data: {
        userId: req.body.userId,
        integrationName: req.body.integrationName,
        sourceName: req.body.sourceName,
        destinationName: req.body.destinationName,
        creationDate: new Date(),
        modificationDate: undefined,
        schedule: false,
        fieldMapping: false,
        status: "Completed",
        syncWay: req.body.syncWay,
      },
    });

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

const getIntegrationById = async (req, res) => {
  try {
    const integration = await prisma.integrations.findUnique({
      where: {
        id: Number(req.params.id),
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
  }
};

const getIntegrations = async (req, res) => {
  try {
    const integrations = await prisma.integrations.findMany({
      where: {
        userId: Number(req.params.id),
      },
    });
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
  }
};

const deleteIntegration = async (req, res) => {
  // console.log("requestd body", req.body);
  // try {
  //   const integration = await prisma.integrations.delete({
  //     where: {
  //       id: req.body.id,
  //     },
  //   });
  //   if (integration) {
  //     response({
  //       res,
  //       success: true,
  //       status_code: 200,
  //       data: [integration],
  //       message: "Integration deleted successfully",
  //     });
  //     return;
  //   } else {
  //     response({
  //       res,
  //       success: false,
  //       status_code: 400,
  //       message: "Integration not deleted",
  //     });
  //     return;
  //   }
  // } catch (error) {
  //   response({
  //     res,
  //     success: false,
  //     status_code: 400,
  //     message: "Error in deleting integration",
  //   });
  //   console.log("error", error);
  //   return;
  // }
};

const updateIntegration = async (req, res) => {
  try {
    const integration = await prisma.integrations.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        integrationName: req.body.integrationName,
        sourceName: req.body.sourceName,
        destinationName: req.body.destinationName,
        modificationDate: new Date(),
      },
    });

    if (integration) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [integration],
        message: "Integration updated successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Integration not updated",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating integration",
    });
    console.log("error", error);
    return;
  }
};

const updateIntegrationState = async (req, res) => {
  try {
    const mappedRecord = await prisma.mappedRecords.findMany({
      where: {
        integrationId: Number(req.params.id),
      },
      select: {
        id: true,
        integrationId: true,
      },
    });

    if (mappedRecord.length === 0) {
      await prisma.integrations.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          fieldMapping: false,
        },
      });

      response({
        res,
        success: true,
        status_code: 200,
        message: "Integration updated successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating integration",
    });
    console.log("error", error);
    return;
  }
};

const addConfigurations = async (req, res) => {
  try {
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
};

const getConfigurationById = async (req, res) => {
  try {
    const configuration = await prisma.configurations.findMany({
      where: {
        integrationId: Number(req.params.id),
      },
      include: {
        integration: {
          select: {
            integrationName: true,
          },
        },
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
  }
};

const updateConfiguration = async (req, res) => {
  try {
    const configuration = await prisma.configurations.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        url: req.body.url,
        accountId: req.body.accountId,
        consumerKey: req.body.consumerKey,
        consumerSecretKey: req.body.consumerSecretKey,
        accessToken: req.body.accessToken,
        accessSecretToken: req.body.accessSecretToken,
        authenticationType: req.body.authenticationType,
        modificationDate: new Date(),
      },
    });

    if (configuration) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [configuration],
        message: "Configuration updated successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Configuration not updated",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating configuration",
    });
    console.log("error", error);
    return;
  }
};

const getConfigurationByIntegrationId = async (req, res) => {
  try {
    const configuration = await prisma.configurations.findMany({
      where: {
        integrationId: Number(req.params.id),
      },
      select: {
        id: true,
        systemName: true,
        url: true,
        accountId: true,
        consumerKey: true,
        consumerSecretKey: true,
        accessToken: true,
        accessSecretToken: true,
        authenticationType: true,
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
  }
};

module.exports = {
  createIntegration,
  getIntegrations,
  getIntegrationById,
  deleteIntegration,
  updateIntegration,
  updateIntegrationState,
  addConfigurations,
  getConfigurationById,
  updateConfiguration,
  getConfigurationByIntegrationId,
};
