const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getPDAs);
router.post("/", controller.addPDA);
router.get("/:id", controller.getPDAById);
router.put("/:id", controller.updatePDA);
router.delete("/:id", controller.removePDA);

module.exports = router;
