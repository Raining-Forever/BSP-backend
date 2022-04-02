const controller = require("./controller");

const { Router } = require("express");
const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.login);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.removeUser);

module.exports = router;
