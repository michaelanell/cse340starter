const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const reviewsModel = require("../models/reviews-model")

/*  **********************************
 *  Review Data Validation Rules
 * ********************************* */
validate.reviewRules = () => {
    return [
      // classification_name is required and must be string
      body("review_firstname")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Please provide a name or initial."), // on error this message is sent.
  
        // lastname is required and must be string
      body("review_lastname")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a name or initial."), // on error this message is sent.
  
      // lastname is required and must be string
      body("review_rating")
        .trim()
        .isInt({ min: 1, max: 5})
        .isLength({ max: 1})
        .withMessage("Please provide a rating between 1 and 5."), // on error this message is sent.
  
        // lastname is required and must be string
      body("review_comments")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please provide an inventory description."), // on error this message is sent.
      ]
  }
  
  /* ******************************
   * Check data and return errors 
   * ***************************** */
  validate.checkReviewData = async (req, res, next) => {
    const { review_firstname, 
        review_lastname, 
        review_rating, 
        review_comments, 
        inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const inventorySelect = await utilities.buildInventoryDropdown()
      res.render("reviews/add-review", {
        errors,
        title: "Add Review",
        nav,
        inventorySelect,
        review_firstname, 
        review_lastname, 
        review_rating, 
        review_comments, 
      })
      return
    }
    next()
  }  

  module.exports = validate