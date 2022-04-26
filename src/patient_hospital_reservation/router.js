const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.put("/", controller.getPHRs);
router.post("/", controller.addPHR);
router.get("/:id", controller.getPHRById);
router.put("/:id", controller.updatePHR);
router.delete("/:id", controller.removePHR);

module.exports = router;
