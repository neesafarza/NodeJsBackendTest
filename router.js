const router = require('express').Router();
const user = require('./controller/user')
const review = require('./controller/review')
const location = require('./controller/location')
const { withJWTAuthMiddleware } = require("express-kun");
const protectedRouter = withJWTAuthMiddleware(router, "secretkey");

router.post('/users/signup', user.createUser);
router.post('/users/login', user.login );
protectedRouter.get('/users/getAllSellers', user.getAllSellers );
protectedRouter.post('/review', review.createReview);
protectedRouter.get('/getSellerReviews', review.getSellerReviews);
protectedRouter.get('/getNearestSellers', location.getnearestSellers)


module.exports = router;