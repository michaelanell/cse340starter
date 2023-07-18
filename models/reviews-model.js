const pool = require("../database/")

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

  module.exports = {getReviewsByInvId}