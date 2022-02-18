const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getSymtoms);
router.post("/", controller.addSymtom);
router.get("/:id", controller.getSymtomById);
router.put("/:id", controller.getSymtoms);
router.delete("/:id", controller.getSymtoms);

module.exports = router;
