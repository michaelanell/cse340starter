/* ***********************
 * Inv Routes
 *************************/
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require('../utilities/inventory-validation')

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
router.post('/process-add-classification', 
validate.classificationRules(),
validate.checkClassificationData,
utilities.handleErrors(invController.processAddClassification));

// Route to process adding inventory to database
router.post('/process-add-inventory', 
validate.inventoryRules(),
validate.checkInventoryData,
utilities.handleErrors(invController.processAddInventory));

// Route to build inventory by classification view for management view
router.get("/getInventory/:classification_id", invController.getInventoryJSON);

module.exports = router;