const UserService = require("../services/userService.js");
const verifyToken = require("../middleware/authJwt.js");
const express = require("express");
const UserSubscriptionService = require("../services/userSubscriptionService.js");

const app = express();
module.exports = (app) => {
  var router = require("express").Router();
  const UserController = require("../controllers/userController.js");
  const PreflopController = require("../controllers/preflopController.js");
  const UserSubscriptionController = require("../controllers/subscriptionController.js");
  const AlgorithmController = require("../controllers/AlgorithmController.js");
  const FlopController = require("../controllers/flopController.js");

  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "api/public/");
    },
    filename: function (req, file, cb) {
      const d = new Date();
      let hour = d.getUTCHours().toString();
      let minutes = d.getUTCMinutes().toString();
      let date = d.getUTCDate().toString();
      let year = d.getUTCFullYear().toString();
      const uniqueSuffix =
        hour + minutes + date + year + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  const upload = multer({ storage: storage });
  router.post("/updateprofiles", UserController.profileUpdateS);
  router.post("/register", UserController.userRegistration);
  router.put("/changePassword/:id", UserController.changePassword);
  router.post("/login", UserController.userLogin);
  router.post("/resetpassword", UserController.resetPassword);
  router.get("/resetpassword/:id", UserController.getUserById);
  router.get("/protected", verifyToken, (req, res) => {
    res.status(200).send({ status: "success", message: "Access granted" });
  });
  router.post(
    "/createImageBlock",
    upload.single("picture"),
    AlgorithmController.createExcelFormulas
  );
  router.put("/updatepassword/:id", UserController.updatePassword);
  router.post(
    "/uploadPreflop",
    upload.single("picture"),
    PreflopController.uploadPreflop
  );
  router.post("/preflop", PreflopController.preflopCalculate);
  router.post("/plans", UserSubscriptionController.SubScriptionPlan);
  router.get("/getplans", UserSubscriptionController.getStripeSubScriptionPlan);

  router.get("/plans", UserSubscriptionController.getSubScriptionPlan);

  router.post("/subscription", UserSubscriptionController.createSubscription);
  router.delete(
    "/cancelSubscription",
    UserSubscriptionController.cancelSubscription
  );

  router.post("/createcards", AlgorithmController.createCards);
  router.get("/getcards", AlgorithmController.getCards);
  router.post("/creatematrix", AlgorithmController.createMatrix);
  router.get("/getmatrix", AlgorithmController.getMatrix);
  router.post("/cardpairs", AlgorithmController.cardpairs);

  router.get("/flopcart", AlgorithmController.getFlop);
  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    UserSubscriptionController.checkOutSession
  );
  router.post("/getAlgo", AlgorithmController.getAlgo);
  router.get("/getcardspairs", AlgorithmController.getCardsPairs);
  router.post("/getOneCardsPairs", AlgorithmController.getOneFlop);
  router.get("/getcardspairs/:name", AlgorithmController.getCardsPairs);
  router.get("/flopcart", AlgorithmController.getFlop);
  router.post(
    "/uploadFlopStrings",
    upload.single("picture"),
    FlopController.uploadFlop
  );

  router.post("/getalgogroup", AlgorithmController.getAlgoGroup);
  router.post("/paymentIntent", UserSubscriptionController.paymentintents);
  app.use("/api/users", router);
};
