const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr>'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the vehicle detail view HTML
* ************************************ */
Util.buildVehiclesDetailsView = function(data){
  let detailsView //undefined
  console.log(data)
  if(data){
    let miles = data.inv_miles.toLocaleString("en-US");
    let priceFormatter = Intl.NumberFormat('en-US'); 

    detailsView = '<div id="vehicle-details-container">'
    detailsView += '<div id="vehicle-img-stats-container">'
    detailsView += '<img src="'+ data.inv_thumbnail +'">'
    detailsView += '<ul id="vehicle-details-list">'
    detailsView += '<li> Model Year: ' + data.inv_model + '</li>'
    detailsView += '<li> Make: ' + data.inv_make + '</li>'
    detailsView += '<li> Milage: ' + miles + '</li>'
    detailsView += '<li> Price: $' + priceFormatter.format(data.inv_price) + '</li>'
    detailsView += '</ul>'
    detailsView += '</div>'
    detailsView += '<section>'
    detailsView += '<h2>Description</h2>'
    detailsView += '<p>' + data.inv_description + '</p>'
    detailsView += '</section>'
    detailsView += '</div>'
  }

  return detailsView
}

/* **************************************
* Build the login view HTML
* ************************************ */
// Util.buildLoginView = function() {
//   loginView = '<div>'
//   loginView += '<form action="">'
//   loginView += '<label for"account_email">Email</label><br>'
//   loginView += '<input type="email" id="account_email" name="account_email" required><br>'
//   loginView += '<label for"account_password">Password</label><br>'
//   loginView += '<input type="password" id="account_password" name="account_password" required><br>'
//   loginView += '<input type="submit" value="Login">'
//   loginView += '</form>'
//   loginView += '<p>No account? <a href="/account/registration">Sign-up</a></p>'
//   loginView += '</div>'
//   return loginView
// }

// /* **************************************
// * Build the registration view HTML
// * ************************************ */
// Util.buildRegistrationView = function() {
//   registrationView = '<div>'
//   registrationView += '<form action="/account/register" method="post">'
//   registrationView += '<label for"account_firstname">First Name</label><br>'
//   registrationView += '<input type="text" id="account_firstname" name="account_firstname" required><br>'
//   registrationView += '<label for"account_lastname">Last Name</label><br>'
//   registrationView += '<input type="text" id="account_lastname" name="account_lastname" required><br>'
//   registrationView += '<label for"account_email">Email</label><br>'
//   registrationView += '<input type="email" id="account_email" name="account_email" required placeholder="Enter a valid email"><br>'
//   registrationView += '<label for"account_password">Password</label><br>'
//   registrationView += '<input type="password" id="account_password" name="account_password" required><br>'
//   registrationView += '<input type="submit" value="Sign Up">'
//   registrationView += '</form>'
//   registrationView += '<p>No account? <a href="/account/registration">Sign-up</a></p>'
//   registrationView += '</div>'
//   return registrationView
// }


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


module.exports = Util