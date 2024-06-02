import express from "express";
import stripePaymentControllers from "../../controllers/payments/stripePaymentControllers.js";
import isAuthenticated from "../../middlewares/isAuthenticated/isAuthenticated.js";

const router = express.Router();
 

//! Make payment
router.post("/stripe-checkout", isAuthenticated, stripePaymentControllers.payment)


  //! Verify payment
router.get("/verify/:paymentId", stripePaymentControllers.verify);



export default router;