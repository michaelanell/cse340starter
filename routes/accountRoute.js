/* ***********************
 * Account Routes
 *************************/
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const validate = require('../utilities/account-validation')


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
    validate.registationRules(),
    validate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

/* ***********************
 * Route to process login attempt
 *************************/
router.post(
  "/login",
  validate.loginRules(),
  validate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

/* ***********************
 * Route to account management page
 *************************/
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))

/* ***********************
 * Route to update account 
 *************************/
router.get("/update-account/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

router.post(
  "/update/",
  validate.accountUpdateRules(),
  validate.checkAccountUpdateData,
  utilities.handleErrors(accountController.processAccountUpdate)
)
module.exports = router;