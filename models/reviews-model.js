const pool = require("../database/")

/* *****************************
*   Get review by inventory id
* *************************** */
async function getReviewsByInvId(inv_id) {
    try {
      const data = await pool.query(
        `SELECT * FROM public.reviews AS i 
        WHERE i.inv_id = $1`,
        [inv_id]
      )
      return data.rows
    } catch (error) {
      console.error("getReviewsByInvId error " + error)
    }
  }

/* *****************************
*   Add review to database
* *************************** */
async function processAddReview(review_firstname, 
  review_lastname, 
  review_rating, 
  review_comment, 
  inv_id ){
  try {
    const sql = "INSERT INTO reviews (review_firstname, review_lastname, review_rating, review_comment, inv_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    return await pool.query(sql, [review_firstname, 
      review_lastname, 
      review_rating, 
      review_comment,
      inv_id ])
  } catch (error) {
    return error.message
  }
}

  module.exports = {getReviewsByInvId, processAddReview}

