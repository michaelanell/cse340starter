/* ******************************************
 * Account Controller
 * Deliver login view (Unit 4 activity)
 *******************************************/
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")

/* ******************************************
 * Deliver login view
 * Deliver login view (Unit 4 activity)
 *******************************************/
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    //const loginView = await utilities.buildLoginView()
    res.render("./account/login", {
      title: "Login",
      nav,
      errors: null,
    })
}

/* ******************************************
 * Deliver registration view
 * Deliver registration view (Unit 4 activity)
 *******************************************/
async function buildRegistration(req,res,next) {
  let nav = await utilities.getNav()
  res.render("./account/registration", {
    title: "Registration",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
*  Unit 4 activity
* *************************************** */
async function registerAccount(req,res,next) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

}

module.exports = {buildLogin, buildRegistration, registerAccount}