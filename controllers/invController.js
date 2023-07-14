const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  const loginMessage = await utilities.checkLoginStatus()
  res.render("./inventory/classification", {
    loginMessage,
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view by inventory id
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const detailsView = await utilities.buildVehiclesDetailsView(data[0])
  let nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  const className = data[0].inv_make
  res.render("./inventory/details", {
    loginMessage,
    title: className,
    nav,
    detailsView,
    errors: null,
  })
}

/* ***************************
 *  Build Management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  const classificationSelect = await utilities.buildClassificationDropdown()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    loginMessage,
    classificationSelect,
    errors: null,
  })
}

/* ***************************
 *  Build Add Classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  res.render("./inventory/add-classification", {
    loginMessage,
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Process Add Classification
 * ************************** */
invCont.processAddClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  const { classification_name } = req.body
  
  const addResult = await invModel.processAddClassification(
    classification_name
  )

  if (addResult) {
    const classificationSelect = await utilities.buildClassificationDropdown()
    req.flash(
      "notice",
      `Classification ${classification_name} has been added.`
    )
    
      res.status(201).render("inventory/management", {
        loginMessage,
        title: "Login",
        nav,
        errors: null,
        classificationSelect: classificationSelect,
      }
      )
  } else {
    req.flash("notice", "Adding the classification failed.")
    res.status(501).render("inventory/add-classification", {
      loginMessage,
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Build Add Inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let loginMessage = await utilities.checkLoginStatus()
  const dropdown = await utilities.buildClassificationDropdown()
  res.render("./inventory/add-inventory", {
    loginMessage,
    title: "Add Inventory",
    nav,
    dropdown,
    errors: null,
  })
}

/* ***************************
 *  Process Add Inventory
 * ************************** */
invCont.processAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let loginMessage = await utilities.checkLoginStatus()
  const { inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id } = req.body

  const addResult = await invModel.processAddInventory(
    inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id
  )

  if (addResult) {
    const classificationSelect = await utilities.buildClassificationDropdown()
    req.flash(
      "notice",
      `Vehicle ${inv_make} ${inv_model} has been added.`
    )
      res.status(201).render("inventory/management", {
        title: "Login",
        nav,
        errors: null,
        classificationSelect: classificationSelect,
      }
      )
  } else {
    req.flash("notice", "Adding the vehicle failed.")
    res.status(501).render("inventory/add-inventory", {
      loginMessage,
      title: "Add Inventory",
      nav,
      errors: null,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}


/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.buildEditIventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventory_id)
  let nav = await utilities.getNav()
  let loginMessage = await utilities.checkLoginStatus()
  const itemData = await invModel.getInventoryByInventoryId(inv_id)
  const classificationSelect = await utilities.buildClassificationDropdown(itemData[0].classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/edit-inventory", {
    loginMessage,
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
}

/* ***************************
 *  Update Inventory view
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    let loginMessage = await utilities.checkLoginStatus()
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    loginMessage,
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}


/* ***************************
 *  Build confirm delete inventory view
 * ************************** */
invCont.buildDeleteInv = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventory_id)
  // console.log("inv_id")
  // console.log(inv_id)
  let nav = await utilities.getNav()
  let loginMessage = await utilities.checkLoginStatus()
  const itemData = await invModel.getInventoryByInventoryId(inv_id)
  // console.log("itemData")
  // console.log(itemData)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    loginMessage,
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price,
  })
}

/* ***************************
 *  Process delete inventory
 * ************************** */
invCont.processDeleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let loginMessage = await utilities.checkLoginStatus()
  // Collect the inv_id value from the request.body 
  const inv_id = parseInt(req.body.inv_id)

  //Pass the inv_id value to a model-based function to delete the inventory item.
  const deleteResult = await invModel.deleteInventory(inv_id)

  if (deleteResult) {
    req.flash("notice", "The item was successfully deleted.")
    res.redirect("/inv/")
  } else {
    req.flash("notice", "Sorry, the deletion failed.")
    res.redirect(`/inv/delete/" + ${inv_id}`)
  }
}

/* ***************************
 *  Build an intentional error
 * ************************** */
// invCont.intentionalError = async function (req, res, next) {
//   let nav = await utilities.getNav()
//   let loginMessage = await utilities.checkLoginStatus()
//   const className = data[0].inv_make
//   res.render("./inventory/details", {
//     loginMessage,
//     title: className,
//     nav,
//     detailsView,
//   })
// }

/* ***************************
 *  Build vehicle detail view by inventory id
 * ************************** */
invCont.intentionalError = async function (req, res, next) {
  const inv_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const detailsView = await utilities.buildVehiclesDetailsView(data[0])
  let nav = await utilities.getNav()
  const loginMessage = await utilities.checkLoginStatus()
  const className = data[0].inv_make
  res.render("./inventory/details", {
    loginMessage,
    title: className,
    nav,
    detailsView,
    errors: null,
  })
}

module.exports = invCont