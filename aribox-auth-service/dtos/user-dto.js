class UserDto {
  id;
  email;
  name;
  isActivated;

  constructor(data) {
    this.id = data._id;
    this.email = data.email;
    this.name = data.name;
    this.isActivated = data.isActivated;
  }
}

module.exports = UserDto;
