const userController = require("./userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/forgotPassword", userController.forgotPassword);
userRouter.post("/resetPassword", userController.resetPassword);
userRouter.get("/activate/:token", userController.activateAccount);
userRouter.post("/login", userController.login);
// Services
userRouter.get("/getServices", userController.getAllServices);
userRouter.post("/addService", userController.addService);
userRouter.delete("/removeService", userController.removeService);
userRouter.post("/editService", userController.editService);
// Clients
userRouter.post("/addClient", userController.addClient);
userRouter.get("/getClients", userController.getClients);
userRouter.delete("/removeClient", userController.removeClient);
userRouter.post("/editClient", userController.editClient);
userRouter.post("/addVisitToClient", userController.addVisitToClient);
userRouter.delete(
  "/removeVisitFromClient",
  userController.removeVisitFromClient
);
// Events
userRouter.get("/getEvents", userController.getEvents);
userRouter.post("/addEvent", userController.addEvent);
userRouter.delete("/removeEvent", userController.removeEvent);
userRouter.post("/finalizeEvent", userController.finalizeEvent);
userRouter.post("/editEvent", userController.editEvent);
// Active hours
userRouter.get("/getHours", userController.getHours);
userRouter.post("/editActiveHours", userController.editActiveHours);

module.exports = userRouter;
