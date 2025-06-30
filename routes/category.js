const express = require('express');
const router = express.Router();
const categoryController = require("../Controllers/categoryController");
const validate = require("../middleware/validate");
const { categorySchema } = require("../validators/categoryValidator");

router.post("/", validate(categorySchema), categoryController.create);
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.deleted);

module.exports = router;
