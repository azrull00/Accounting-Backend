const express = require('express');
const router = express.Router();
const controller = require("../Controllers/transactionController");
const validate = require("../middleware/validate");
const { schema } = require("../validators/transactionValidator");


router.post("/", validate(schema), controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleted);

module.exports = router;