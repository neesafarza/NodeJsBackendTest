const Reviews = require('../models/reviews');
const { getUserFromToken } = require('../service/securityService');

exports.createReview = async (req, res) => {
    try {
      const sellerId = req.query.sellerId;
      const user = await getUserFromToken(req);
      const review = await Reviews.create({
        userId: user.id,
        sellerId: sellerId,
        reviewValue: req.body.reviewValue,
        comment: req.body.comment,
      });
      res.json(review);
      res.status(201);
    } catch(error) {
      console.error(error);
      res.json(error).status(400);
    }

}

exports.getSellerReviews = async (req, res) => {
  try {
    const sellerId = req.query.sellerId;
    if(!sellerId) {
      res.status(400).send('You must include an id for seller');
      return;
    }
    const reviews = await Reviews.find( { sellerId: sellerId})
    if (!reviews || reviews.length < 1) {
      res.status(404).send('this seller has no reviews');
      return;
    } 
    res.json(reviews);
    res.status(200);
  } catch (error) {
    console.error(error);
    res.json(error).status(400);
  }
}