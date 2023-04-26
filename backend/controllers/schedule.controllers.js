const prisma = require("../lib/prisma");
const response = require("../lib/response");
const schedule = require("node-schedule");

const scheduleTask = async (req, res) => {
    console.log("req.date", req.body.date)
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
        name: true,
        source: true,
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
  scheduleTask,
  getMappedRecordByIntegrationId
};
