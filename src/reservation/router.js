const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.put("/", controller.getReservations);
router.post("/", controller.addReservation);
router.get("/:id", controller.getReservationById);
router.put("/:id", controller.updateReservation);
router.delete("/:id", controller.removeReservation);

module.exports = router;
