const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.addUser);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.removeUser);

module.exports = router;
