/* ***********************
 * Review Routes
 *************************/
const express = require("express")
const router = new express.Router() 
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")
const validate = require('../utilities/review-validation')

/* ***********************
 * Deliver reviews view
 *************************/
router.get("/", utilities.handleErrors(reviewController.buildReviews));

// Route to get reviews by inv_id for reviews view
router.get("/getReviews/:inv_id", utilities.handleErrors(reviewController.getReviewsJSON));

// Route to get add review view
router.get("/add-review/", utilities.handleErrors(reviewController.buildAddReviewsView));

// Route to process review
router.post("/add-review/", validate.reviewRules(),
validate.checkReviewData, utilities.handleErrors(reviewController.processAddReviews));

module.exports = router;
