const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getHospitals);
router.post("/", controller.addHospital);
router.get("/:id", controller.getHospitalById);
router.put("/:id", controller.updateHospital);
router.delete("/:id", controller.removeHospital);

module.exports = router;
