const prisma = require("../lib/prisma");
const response = require("../lib/response");
const schedule = require("node-schedule");

const addRealTimeEvent = async (req, res) => {
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;

  try {
    const [schedule, updateCount] = await prisma.$transaction([
      prisma.schedule.create({
        data: {
          userId: userId,
          integrationId: integrationId,
          mappedRecordId: mappedRecordId,
          eventType: eventType,
          startDate: startDate,
          endDate: endDate,
          noEndDate: noEndDate,
          performType: performType,
          // savedSearchType: savedSearchType,
          savedSearchLabel: savedSearchLabel,
          savedSearchValue: savedSearchValue,
          creationDate: new Date(),
          modificationDate: new Date(),
        },
      }),
      prisma.integrations.updateMany({
        where: {
          id: Number(integrationId),
          userId: Number(userId),
        },
        data: {
          schedule: true,
        },
      }),
    ]);

    if (schedule) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule created successfully",
        data: [schedule],
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Error in creating schedule",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating schedule",
    });
    console.log("error", error);
  }
};

const addSingleEvent = async (req, res) => {
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    startTime,
    repeatEveryDay,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;
  try {
    const [schedule, updateCount] = await prisma.$transaction([
      prisma.schedule.create({
        data: {
          userId: userId,
          integrationId: integrationId,
          mappedRecordId: mappedRecordId,
          eventType: eventType,
          startDate: startDate,
          startTime: startTime,
          repeatEveryDay: repeatEveryDay,
          endDate: endDate,
          noEndDate: noEndDate,
          performType: performType,
          // savedSearchType: savedSearchType,
          savedSearchLabel: savedSearchLabel,
          savedSearchValue: savedSearchValue,
          // creationDate: new Date(),
          // modificationDate: new Date(),
        },
      }),
      prisma.integrations.updateMany({
        where: {
          id: Number(integrationId),
          userId: Number(userId),
        },
        data: {
          schedule: true,
        },
      }),
    ]);

    if (schedule) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule created successfully",
        data: [schedule],
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Error in creating schedule",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating schedule",
    });
    console.log("error", error);
  }
};

const addWeeklyEvent = async (req, res) => {
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    startTime,
    day,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;

  try {
    const [schedule, updateCount] = await prisma.$transaction([
      prisma.schedule.create({
        data: {
          userId: userId,
          integrationId: integrationId,
          mappedRecordId: mappedRecordId,
          eventType: eventType,
          startDate: startDate,
          startTime: startTime,
          day: day,
          endDate: endDate,
          noEndDate: noEndDate,
          performType: performType,
          // savedSearchType: savedSearchType,
          savedSearchLabel: savedSearchLabel,
          savedSearchValue: savedSearchValue,
        },
      }),
      prisma.integrations.updateMany({
        where: {
          id: Number(integrationId),
          userId: Number(userId),
        },
        data: {
          schedule: true,
        },
      }),
    ]);

    if (schedule) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule created successfully",
        data: [schedule],
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Error in creating schedule",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in creating schedule",
    });
    console.log("error", error);
  }
};

const getSchedules = async (req, res) => {
  const { id } = req.params;
  try {
    const scheduleData = await prisma.schedule.findMany({
      where: {
        userId: Number(id),
      },
      select: {
        id: true,
        userId: true,
        integrationId: true,
        eventType: true,
        creationDate: true,
        modificationDate: true,
        integration: {
          select: {
            integrationName: true,
          },
        },
      },
    });

    if (scheduleData) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule fetched successfully",
        data: scheduleData,
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Error in fetching schedule",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching schedule",
    });
    console.log("error", error);
  }
};

const getScheduleEventById = async (req, res) => {
  const { id, userId, integrationId, mappedRecordId, eventType } = req.query;

  try {
    const scheduleData = await prisma.schedule.findMany({
      where: {
        id: Number(id),
        userId: Number(userId),
      },
      select: {
        id: true,
        userId: true,
        integrationId: true,
        mappedRecordId: true,
        eventType: true,
        startDate: true,
        endDate: true,
        startTime: true,
        day: true,
        noEndDate: true,
        repeatEveryDay: true,
        performType: true,
        // savedSearchType: true,
        savedSearchLabel: true,
        savedSearchValue: true,
        integration: {
          select: {
            integrationName: true,
          },
        },
        mappedRecord: {
          select: {
            MappedRecordName: true,
          },
        },
      },
    });

    if (scheduleData) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule fetched successfully",
        data: scheduleData,
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Error in fetching schedule",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching schedule",
    });
    console.log("error", error);
  }
};

const updateRealTimeEvent = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;

  try {
    const scheduleData = await prisma.schedule.updateMany({
      where: {
        id: Number(id),
        userId: Number(userId),
        integrationId: Number(integrationId),
        eventType: eventType,
      },
      data: {
        mappedRecordId: mappedRecordId,
        startDate: startDate,
        endDate: endDate,
        noEndDate: noEndDate,
        performType: performType,
        // savedSearchType: savedSearchType,
        savedSearchLabel: savedSearchLabel,
        savedSearchValue: savedSearchValue,
        // modificationDate: new Date(),
      },
    });

    if (scheduleData) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule updated successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Schedule not updated successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating schedule",
    });
    console.log("error", error);
  }
};

const updateSingleEvent = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    startTime,
    repeatEveryDay,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;

  try {
    const scheduleData = await prisma.schedule.updateMany({
      where: {
        id: Number(id),
        userId: Number(userId),
        integrationId: Number(integrationId),
        eventType: eventType,
      },
      data: {
        mappedRecordId: mappedRecordId,
        startDate: startDate,
        startTime: startTime,
        repeatEveryDay: repeatEveryDay,
        endDate: endDate,
        noEndDate: noEndDate,
        performType: performType,
        // savedSearchType: savedSearchType,
        savedSearchLabel: savedSearchLabel,
        savedSearchValue: savedSearchValue,
      },
    });

    if (scheduleData) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule updated successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Schedule not updated successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating schedule",
    });
    console.log("error", error);
  }
};

const updateWeeklyEvent = async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    integrationId,
    mappedRecordId,
    eventType,
    startDate,
    startTime,
    day,
    endDate,
    noEndDate,
    performType,
    // savedSearchType,
    savedSearchLabel,
    savedSearchValue,
  } = req.body;

  try {
    const scheduleData = await prisma.schedule.updateMany({
      where: {
        id: Number(id),
        userId: Number(userId),
        integrationId: Number(integrationId),
        eventType: eventType,
      },
      data: {
        mappedRecordId: mappedRecordId,
        startDate: startDate,
        startTime: startTime,
        day: day,
        endDate: endDate,
        noEndDate: noEndDate,
        modificationDate: new Date(),performType: performType,
        // savedSearchType: savedSearchType,
        savedSearchLabel: savedSearchLabel,
        savedSearchValue: savedSearchValue,
      },
    });

    if (scheduleData) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule updated successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Schedule not updated successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in updating schedule",
    });
    console.log("error", error);
  }
};

const deleteScheduleEvent = async (req, res) => {
  const { id, integrationId } = req.params;

  try {
    const [deleteScheduleEvent, updateIntegrations] = await prisma.$transaction(
      [
        prisma.schedule.deleteMany({
          where: {
            id: Number(id),
          },
        }),
        prisma.integrations.updateMany({
          where: {
            id: Number(integrationId),
          },
          data: {
            schedule: false,
          },
        }),
      ]
    );

    if (deleteScheduleEvent) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Schedule deleted successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Schedule not deleted successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in deleting schedule",
    });
    console.log("error", error);
  }
};

const addMappedFields = async (req, res) => {
  const {
    userId,
    integrationId,
    mappedRecordId,
    sourceFieldLabel,
    sourceFieldValue,
    destinationFieldValue,
    operator,
    fieldType,
  } = req.body;

  try {
    const mappedFields = await prisma.mappedFields.create({
      data: {
        userId: userId,
        integrationId: integrationId,
        mappedRecordId: mappedRecordId,
        sourceFieldLabel: sourceFieldLabel,
        sourceFieldValue: sourceFieldValue,
        destinationFieldValue: destinationFieldValue,
        operator: operator,
        fieldType: fieldType,
        // creationDate: new Date(),
        // modificationDate: new Date(),
      },
    });

    if (mappedFields) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Mapped fields added successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped fields not added successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in adding mapped fields",
    });
    console.log("error", error);
  }
};

const getMappedField = async (req, res) => {
  // const { userId } = req.params.id;
  const { id, integrationId, mappedRecordId } = req.query;

  try {
    const mappedFields = await prisma.mappedFields.findMany({
      where: {
        userId: Number(id),
        integrationId: Number(integrationId),
        mappedRecordId: Number(mappedRecordId),
      },
    });

    if (mappedFields) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Mapped fields fetched successfully",
        data: mappedFields,
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Mapped fields not fetched successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in fetching mapped fields",
    });
    console.log("error", error);
  }
};

const addCustomFilterFields = async (req, res) => {
  const {
    userId,
    integrationId,
    mappedRecordId,
    sourceFieldValue,
    sourceFieldLabel,
    destinationFieldValue,
    destinationFieldLabel,
    operator
  } = req.body;

  try {
    const customFilterFields = await prisma.customFields.create({
      data: {
        userId: userId,
        integrationId: integrationId,
        mappedRecordId: mappedRecordId,
        sourceFieldValue: sourceFieldValue,
        sourceFieldLabel: sourceFieldLabel,
        destinationFieldValue: destinationFieldValue,
        destinationFieldLabel: destinationFieldLabel,
        operator: operator,
      },
    });

    if (customFilterFields) {
      response({
        res,
        success: true,
        status_code: 200,
        message: "Custom filter fields added successfully",
      });
    } else {
      response({
        res,
        success: false,
        status_code: 400,
        message: "Custom filter fields not added successfully",
      });
    }
  } catch (error) {
    response({
      res,
      success: false,
      status_code: 400,
      message: "Error in adding custom filter fields",
    });
    console.log("error", error);
  }
};

// Pending
const scheduleTask = async (req, res) => {
  console.log("req.date", req.body.date);
  try {
    // schedule the job to a requested date and end date
    // const date = new Date(req.body.date);
    // const endDate = new Date(req.body.endDate);
    // const date = new Date(2023, 4, 21, 5, 9, 1);
    const rule = new schedule.RecurrenceRule();
    rule.second = 1;
    rule.minute = 0;
    rule.hour = 0;

    schedule.scheduleJob(rule, function () {
      console.log("starting...", new Date());

      // if(new Date() == endDate){
      //     job.cancel();
      //     console.log("ended", new Date());
      // }
    });

    response({
      res,
      success: true,
      status_code: 200,
      message: "Scheduled Task",
    });
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

const getMappedRecordByIntegrationId = async (req, res) => {
  const { id, integrationId } = req.query;
  // console.log(id, integrationId)

  try {
    const mappedRecordData = await prisma.mappedRecords.findMany({
      where: {
        userId: Number(id),
        integrationId: Number(integrationId),
      },
      select: {
        id: true,
        MappedRecordName: true,
        recordTypeLabel: true,
        integrationId: true,
      },
    });
    // console.log(mappedRecordData)
    if (mappedRecordData) {
      response({
        res,
        success: true,
        status_code: 200,
        data: mappedRecordData,
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

module.exports = {
  addRealTimeEvent,
  addSingleEvent,
  addWeeklyEvent,
  getSchedules,
  getScheduleEventById,
  updateRealTimeEvent,
  updateSingleEvent,
  updateWeeklyEvent,
  deleteScheduleEvent,
  addMappedFields,
  getMappedField,
  addCustomFilterFields,
  
  scheduleTask,
  getMappedRecordByIntegrationId,
};
