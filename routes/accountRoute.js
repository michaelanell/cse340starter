/* ***********************
 * Account Routes
 *************************/
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')


/* ***********************
 * Deliver login view
 *************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/* ***********************
 * Deliver registration view
 *************************/
router.get("/registration", utilities.handleErrors(accountController.buildRegistration));

/* ***********************
 * Route to handle what happens after registration form is submitted
 *************************/
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

module.exports = router;