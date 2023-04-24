const prisma = require("../lib/prisma");
const response = require("../lib/response");

const addMappedRecord = async (req, res) => {
  try {
    const [recordMapping, updateCount] = await prisma.$transaction([
      prisma.mappedRecords.create({
        data: {
          userId: req.body.userId,
          integrationId: req.body.integrationId,
          source: req.body.recordType,
          recordTypeTitle: req.body.recordTypeTitle,
          destination: req.body.url,
          url: req.body.urlTitle,
          creationDate: new Date(),
          modificationDate: undefined,
        },
      }),
      prisma.integrations.updateMany({
        where: {
          id: Number(req.body.integrationId),
        },
        data: {
          fieldMapping: true,
        },
      }),
    ]);

    if (recordMapping) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [recordMapping],
        message: "Mapped record added successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped record not added",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating Mapped record",
    });
    console.log("error", error);
  }
};

const updateFieldMappingState = async (req, res) => {
  try {
    const recordMapping = await prisma.mappedRecords.updateMany({
      where: {
        id: Number(req.params.id),
      },
      data: {
        integration: {
          fieldMapping: true,
        },
      },
    });
    if (recordMapping) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [recordMapping],
        message: "Mapped record fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped record not fetched",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching Mapped record",
    });
    console.log("error", error);
    return;
  }
};

const getMappedRecordById = async (req, res) => {
  try {
    const recordMapping = await prisma.mappedRecords.findMany({
      where: {
        id: Number(req.params.id),
      },
      select: {
        id: true,
        userId: true,
        integrationId: true,
        source: true,
        recordTypeTitle: true,
        destination: true,
        url: true,
        creationDate: true,
        modificationDate: true,
        integration: {
          select: {
            integrationName: true,
          },
        },
      },
    });

    if (recordMapping) {
      response({
        res,
        success: true,
        status_code: 200,
        data: recordMapping,
        message: "Mapped record fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped record not fetched",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching Mapped record",
    });
    console.log("error", error);
    return;
  }
};

const deleteMappedRecordByID = async (req, res) => {
  // console.log("req.params", req.params)

  try {
    const [deleteRecordMapping, updateIntegrations] = await prisma.$transaction(
      [
        prisma.mappedRecords.delete({
          where: {
            id: Number(req.params.id),
          },
        }),
        prisma.integrations.updateMany({
          where: {
            id: Number(req.params.integrationId),
          },
          data: {
            fieldMapping: false,
          },
        }),
      ]
    );
    // console.log("deleteRecordMapping", deleteRecordMapping)
    if (deleteRecordMapping) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [deleteRecordMapping],
        message: "Mapped record deleted successfully",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in deleting Mapped record",
    });
    console.log("error", error);
    return;
  }
};

const getMappedFieldsDetails = async (req, res) => {
  try {
    const recordMapping = await prisma.mappedRecords.findMany({
      where: {
        userId: Number(req.params.id),
      },
      select: {
        id: true,
        userId: true,
        integrationId: true,
        source: true,
        recordTypeTitle: true,
        destination: true,
        creationDate: true,
        modificationDate: true,
        integration: {
          select: {
            integrationName: true,
            sourceName: true,
            destinationName: true,
          },
        },
      },
    });

    if (recordMapping) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [recordMapping],
        message: "Mapped record fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped record not fetched",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching Mapped record",
    });
    console.log("error", error);
  }
};

const addFields = async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const [deleteFields, addFields] = await prisma.$transaction([
      prisma.fields.deleteMany({
        where: {
          mappedRecordId: {
            in: req.body.map((field) => field.mappedRecordId),
          },
        },
      }),
      prisma.fields.createMany({
        data: req.body.map((field) => ({
          userId: field.userId,
          mappedRecordId: field.mappedRecordId,
          sourceField: field.sourceField,
          destinationField: field.destinationField,
          sourceFieldValue: field.sourceFieldValue,
          destinationFieldValue: field.destinationFieldValue,
        })),
      }),
    ]);
    // console.log("deleteFields", deleteFields);

    // try {
    //   const fields = await prisma.fields.deleteMany({
    //     where: {
    //       mappedRecordId: {
    //         in: req.body.map((field) => field.mappedRecordId),
    //       },
    //     },
    //   });

    // if (fields) {
    //   const fields = await prisma.fields.createMany({
    //     data: req.body.map((field) => ({
    //       userId: field.userId,
    //       mappedRecordId: field.mappedRecordId,
    //       sourceField: field.sourceField,
    //       destinationField: field.destinationField,
    //       sourceFieldValue: field.sourceFieldValue,
    //       destinationFieldValue: field.destinationFieldValue,
    //     })),
    //   });

    if (addFields) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [addFields],
        message: "Fields added successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Fields not added",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in adding fields",
    });
    console.log("error", error);
  }
};

const getFields = async (req, res) => {
  try {
    const fields = await prisma.fields.findMany({
      where: {
        mappedRecordId: Number(req.params.id),
      },
    });

    if (fields) {
      response({
        res,
        success: true,
        status_code: 200,
        data: fields,
        message: "Fields fetched successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Fields not fetched",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching fields",
    });
    console.log("error", error);
    return;
  }
};

const deleteField = async (req, res) => {
  try {
    const field = await prisma.fields.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (field) {
      response({
        res,
        success: true,
        status_code: 200,
        data: [field],
        message: "Field deleted successfully",
      });
      return;
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Field not deleted",
      });
      return;
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in deleting field",
    });
    console.log("error", error);
    return;
  }
};

module.exports = {
  addMappedRecord,
  updateFieldMappingState,
  getMappedRecordById,
  deleteMappedRecordByID,
  getMappedFieldsDetails,
  addFields,
  getFields,
  deleteField,
};
