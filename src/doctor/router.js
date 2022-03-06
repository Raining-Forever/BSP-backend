const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getDoctors);
router.post("/", controller.addDoctor);
router.get("/:id", controller.getDoctorById);
router.put("/:id", controller.updateDoctor);
router.delete("/:id", controller.removeDoctor);

module.exports = router;
