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
 * Route to update account view 
 *************************/
router.get("/update-account/:accountId", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

/* ***********************
 * Route to update account data
 *************************/
router.post(
  "/update/",
  validate.accountUpdateRules(),
  validate.checkAccountUpdateData,
  utilities.handleErrors(accountController.processAccountUpdate)
)

/* ***********************
 * Route to update account password
 *************************/
router.post(
  "/update-password/",
   validate.passwordUpdateRules(),
   validate.checkPasswordUpdateData,
  utilities.handleErrors(accountController.processPasswordUpdate)
 )

/* ***********************
 * Route to logout
 *************************/
router.get("/logout", utilities.checkLogin, utilities.handleErrors(accountController.buildLogoutView))

/* ***********************
 * Process logout
 *************************/
router.post("/logout", utilities.logout, utilities.handleErrors(accountController.processLogout))

module.exports = router;