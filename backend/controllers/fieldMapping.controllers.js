const prisma = require("../lib/prisma");
const response = require("../lib/response");

const AddMappedRecord = async (req, res) => {
  //   console.log("AddMappedRecord", req.body);

  try {
    const recordMapping = await prisma.mappedRecords.create({
      data: {
        userId: req.body.userId,
        integrationId: req.body.integrationId,
        recordType: req.body.recordType,
        url: req.body.url,
        creationDate: new Date(),
        modificationDate: undefined,
      },
    });

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
    return;
  }
};

const getAllMappedRecords = async (req, res) => {
  //   console.log("getAllMappedRecords", req.body);

  try {
    const recordMapping = await prisma.mappedRecords.findMany({
      where: {
        userId: req.body.userId,
        // integrationId: req.body.integrationId,
        // recordType: req.body.recordType,
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
  // console.log("getMappedRecordById", req.body);

  try {
    const recordMapping = await prisma.mappedRecords.findMany({
      where: {
        id: req.body.mappedRecordId,
      },
      include: {
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

const getMappedFieldsDetails = async (req, res) => {
  // console.log("getAllMappedRecords", req.body);

  try {
    const recordMapping = await prisma.mappedRecords.findMany({
      // where: {
      //   userId: req.body.userId,
      //   // where: 2
      // },
      // get all mapped records details from mappedRecords table using userId and get integration details (integrationName,sourceName,destinationName) using integrationId from mappedRecords table
      where: {
        userId: req.body.userId,
      },
      include: {
        integration: {
          select: {
            integrationName: true,
            sourceName: true,
            destinationName: true,
          },
        },
      },
    });

    // console.log("recordMapping", recordMapping);

    if (recordMapping) {
      // console.log(recordMapping)
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
    // return;
  }
};

// *** add mapped fields
// const addFields = async (req, res) => {
//   console.log("req.body", req.body);
//   try {
//     const fields = await prisma.fields.upsertMany({
//       create: req.body.map((field) => ({
//         data: {
//           userId: field.userId,
//           mappedRecordId: field.mappedRecordId,
//           sourceField: field.sourceField,
//           destinationField: field.destinationField,
//           sourceFieldValue: field.sourceFieldValue,
//           destinationFieldValue: field.destinationFieldValue,
//         },
//       })),
//       update: req.body.map((field) => ({
//         where: {
//           id: field.id,
//         },
//         data: {
//           userId: field.userId,
//           mappedRecordId: field.mappedRecordId,
//           sourceField: field.sourceField,
//           destinationField: field.destinationField,
//           sourceFieldValue: field.sourceFieldValue,
//           destinationFieldValue: field.destinationFieldValue,
//         },
//       })),
//     });

//     if (fields) {
//       response({
//         res,
//         success: true,
//         status_code: 200,
//         data: fields,
//         message: "Fields updated successfully",
//       });
//       return;
//     } else {
//       response({
//         res,
//         success: false,
//         status_code: 400,
//         message: "Fields not updated",
//       });
//       return;
//     }
//   } catch (error) {
//     response({
//       res,
//       success: false,
//       status_code: 400,
//       message: "Error in updating fields",
//     });
//     console.log("error", error);
//     // return;
//   }
// };

const addFields = async (req, res) => {
  // console.log("addFields", req.body);
  try {
   const fields = await prisma.fields.deleteMany({
      // where : {
      //   mappedRecordId: {
      //     in: req.body.map((field) => field.mappedRecordId),
      //   }
      // }
      // delete fields if mappedRecordId and FieldType is same
      where: {
        mappedRecordId: {
          in: req.body.map((field) => field.mappedRecordId),
        },
        // FieldType: {
        //   in: req.body.map((field) => field.FieldType),
        // },
      },
    });

    if (fields) {
      const fields = await prisma.fields.createMany({
        data: req.body.map((field) => ({
          userId: field.userId,
          mappedRecordId: field.mappedRecordId,
          // FieldType: field.FieldType,
          sourceField: field.sourceField,
          destinationField: field.destinationField,
          sourceFieldValue: field.sourceFieldValue,
          destinationFieldValue: field.destinationFieldValue,
        })),
      });

      if (fields) {
        response({
          res,
          success: true,
          status_code: 200,
          data: fields,
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
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Fields not updated",
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
    // return;
  }
};

  

    // ***
    // const fields = await prisma.fields.upsert({
    //   create: req.body.map((field) => ({
    //     data: {
    //       userId: field.userId,
    //       mappedRecordId: field.mappedRecordId,
    //       sourceField: field.sourceField,
    //       destinationField: field.destinationField,
    //       sourceFieldValue: field.sourceFieldValue,
    //       destinationFieldValue: field.destinationFieldValue,
    //     },
    //   })),
    //   update: req.body.map((field) => ({
    //     where: {
    //       id: field.id,
    //       // destinationFieldValue: req.body.destinationFieldValue,
    //     },
    //     data: {
    //       userId: field.userId,
    //       mappedRecordId: field.mappedRecordId, 
    //       sourceField: field.sourceField,
    //       destinationField: field.destinationField,
    //       sourceFieldValue: field.sourceFieldValue,
    //       destinationFieldValue: field.destinationFieldValue,
    //     },
    //   })),

      // ***
      // where: {
      //   id: req.body.id,
      //   // destinationFieldValue: req.body.destinationFieldValue,
      // },
      // update: {
      //   userId: req.body.userId,
      //   mappedRecordId: req.body.mappedRecordId,
      //   sourceField: req.body.sourceField,
      //   destinationField: req.body.destinationField,
      //   sourceFieldValue: req.body.sourceFieldValue,
      //   destinationFieldValue: req.body.destinationFieldValue,
      // },
      // create: {
      //   userId: req.body.userId,
      //   mappedRecordId: req.body.mappedRecordId,
      //   sourceField: req.body.sourceField,
      //   destinationField: req.body.destinationField,
      //   sourceFieldValue: req.body.sourceFieldValue,
      //   destinationFieldValue: req.body.destinationFieldValue,
      // },

    // });

    // ***
//     if (fields) {
//       response({
//         res,
//         success: true,
//         status_code: 200,
//         data: fields,
//         message: "Fields updated successfully",
//       });
//       return;
//     } else {
//       response({
//         res,
//         success: false,
//         status_code: 400,
//         message: "Fields not updated",
//       });
//       return;
//     }
//   } catch (error) {
//     response({
//       res,
//       success: false,
//       status_code: 400,
//       message: "Error in updating fields",
//     });
//     console.log("error", error);
//     // return;
//   }
// };

// const addPrimaryFields = async (req, res) => {
//   console.log("addPrimaryFields", req.body);
//   try {
//     // if recordType is primary and req.body.userId is not present in Fields table then insert add, update, delete text for destinationFieldValue and blank for sourceFieldValue in Fields table
//     const primaryFields = await prisma.fields.upsert({
//       where: {
//         // values: {
//           // not: {
//             userId: req.body.userId,
//           // }
//         // }
//       },
//       create: {
//       data: 
//       [
//         {
//           userId: req.body.userId,
//           mappedRecordId: req.body.mappedRecordId,
//           FieldType: "Primary",
//           sourceField: req.body.sourceField,
//           destinationField: req.body.destinationField,
//           sourceFieldValue: undefined,
//           destinationFieldValue: "Add",
//         },
//         {
//           userId: req.body.userId,
//           mappedRecordId: req.body.mappedRecordId,
//           FieldType: "Primary",
//           sourceField: req.body.sourceField,
//           destinationField: req.body.destinationField,
//           sourceFieldValue: undefined,
//           destinationFieldValue: "Update",
//         },
//         {
//           userId: req.body.userId,
//           mappedRecordId: req.body.mappedRecordId,
//           FieldType: "Primary",
//           sourceField: req.body.sourceField,
//           destinationField: req.body.destinationField,
//           sourceFieldValue: undefined,
//           destinationFieldValue: "Delete",
//         },
//       ],
//     },
//     update: {}
//       // where: {
//       //   values: {
//       //     not: {
//       //       userId: req.body.userId,
//       //     }
//       //   }
//       // },
//       // where: {
//       //   userId:! req.body.userId,
//       // },
      
//     });

//     if (primaryFields) {
//       response({
//         res,
//         success: true,
//         status_code: 200,
//         data: primaryFields,
//         message: "Primary Fields added successfully",
//       });
//       return;
//     } else {
//       response({
//         res,
//         success: false,
//         status_code: 400,
//         message: "Primary Fields not added",
//       });
//       return;
//     }
//   } catch (error) {
//     response({
//       res,
//       success: false,
//       status_code: 400,
//       message: "Error in adding Primary Fields",
//     });
//     console.log("error", error);
//     return;
//   }
// }

const getFields = async (req, res) => {
  // console.log("getFields", req.params.mappedRecordId);
  try {
    const fields = await prisma.fields.findMany({
      where: {
        mappedRecordId: req.body.mappedRecordId,
      },
    });

    // console.log("fields", fields);
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
}

module.exports = {
  AddMappedRecord,
  getAllMappedRecords,
  getMappedRecordById,
  getMappedFieldsDetails,
  addFields,
  // addPrimaryFields,
  getFields
};
