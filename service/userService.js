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
    longitude: user.location.coordinates ? user.location.coordinates[0] : null,
    latitude: user.location.coordinates ? user.location.coordinates[1]: null
  }
}