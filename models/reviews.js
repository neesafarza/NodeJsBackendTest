const mongoose = require('./index');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  sellerId: { type: Schema.Types.ObjectId, ref: 'User'},
  reviewValue: {type: Number, required: false},
  comment: {type: String, required: false}
});

module.exports = mongoose.model('Reviews', ReviewsSchema);
