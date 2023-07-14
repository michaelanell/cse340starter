const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  //req.flash("notice", "This is a flash message.") // Only here to test flash
  res.render("index", {title: "Home", nav, errors: null, loginMessage})
}

module.exports = baseController