//routes for user management
const router = express.Router();
import express from "express";
import waitlistController from "../controllers/waitlistController.js";

router.route("/").post(waitlistController.addEmail);
router.route("/").get(waitlistController.getEmails);
router.route("/verify-email").post(waitlistController.verifyEmail);
router.route("/unsubscribe").get(waitlistController.unsubscribe);

export default router;
