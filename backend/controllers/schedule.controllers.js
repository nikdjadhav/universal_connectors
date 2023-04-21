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

module.exports = {
  scheduleTask,
};
