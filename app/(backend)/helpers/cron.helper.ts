import cron from "node-cron";
import Admin from "../models/admin.model";

export const startMembershipCronJob = () => {
  // Schedule a cron job to run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();
      const expiredAdmins = await Admin.find({
        membershipLastDate: { $lt: now },
        membership: { $ne: "basic" },
      });

      for (const admin of expiredAdmins) {
        admin.membership = "basic";
        admin.uploadCredit = 5;
        await admin.save();
      }
    } catch (error) {
      console.error("Error running membership cron job:", error);
    }
  });
};