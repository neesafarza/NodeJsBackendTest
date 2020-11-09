exports.convertDomainToDTO = (user) => {
  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    typeOfUser: user.typeOfUser,
    profession: user.profession,
    longitude: user.location.coordinates[0],
    latitude: user.location.coordinates[1]
  }
}