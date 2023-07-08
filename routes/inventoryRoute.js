/* ***********************
 * Inv Routes
 *************************/
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory info by inventory id
router.get("/detail/:inventoryId", invController.buildByInventoryId);

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build add classification view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to process adding a classification to database
router.post('/process-add-classification', utilities.handleErrors(invController.processAddClassification));

// Route to process adding inventory to database
router.post('/process-add-inventory', utilities.handleErrors(invController.processAddInventory));

module.exports = router;