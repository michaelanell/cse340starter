/* ***********************
 * Inv Routes
 *************************/
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory info by inventory id
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

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
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Route to build inventory by classification view for management view
router.get("/edit/:inventory_id", utilities.handleErrors(invController.buildEditIventory));

// Route to process update inventory
router.post("/update/", 
validate.newInventoryRules(),
validate.checkUpdateData,
utilities.handleErrors(invController.updateInventory));

// Route to delete inventory
router.get("/delete/:inventory_id", utilities.handleErrors(invController.buildDeleteInv));

router.post("/delete/", utilities.handleErrors(invController.processDeleteInventory));

// Route to intentional error
router.get("/error/", utilities.handleErrors(invController.intentionalError));

module.exports = router;