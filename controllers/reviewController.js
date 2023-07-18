const reviewsModel = require("../models/reviews-model")
const utilities = require("../utilities/")

const reviewsCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
reviewsCont.buildReviews = async function (req, res, next) {
    let nav = await utilities.getNav()
    const inventorySelect = await utilities.buildInventoryDropdown()
    res.render("./reviews/reviews", {
      title: "Reviews",
      nav,
      inventorySelect,
      errors: null,
    })
  }

/* ***************************
 *  Return Reviews by inv_id As JSON
 * ************************** */
reviewsCont.getReviewsJSON = async (req, res, next) => {
  console.log("getReviewsJSON")
  const inv_id = parseInt(req.params.inv_id)
  console.log(inv_id)
  const reviewsData = await reviewsModel.getReviewsByInvId(inv_id)
  console.log("Review data")
  console.log(reviewsData)
  console.log("Review data [0]")
  console.log(reviewsData[0].inv_id)
  if (reviewsData[0].inv_id){
    console.log('success')
    return res.json(reviewsData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = reviewsCont