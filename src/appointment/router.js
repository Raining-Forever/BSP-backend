const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getAppointments);
router.post("/", controller.addAppointment);
router.get("/:id", controller.getAppointmentById);
router.put("/:id", controller.updateAppointment);
router.delete("/:id", controller.removeAppointment);

module.exports = router;
