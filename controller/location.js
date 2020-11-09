const User = require('../models/users')
const { convertDomainToDTO } = require('../service/userService');


exports.getnearestSellers = async (req, res) => {
  try {
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
    const maxDistance = req.query.maxDistance;

    const users = await User.find({
      location: {
          $near: {
              $geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude]
              },
              $maxDistance: maxDistance
          }
      } 
  })
  if (users.length < 1 || !users) {
    res.status(404).send('No seller found');
  } else {
    res.json(users.map((user) => 
      convertDomainToDTO(user))
      ).status(200)
  }

  } catch (error) {
    console.error(error)
    res.json(error).send(500)
  }
}