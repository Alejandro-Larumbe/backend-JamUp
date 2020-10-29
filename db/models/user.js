'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    instrument: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    photoUrl: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    const columnMapping = {
      as: 'attending',
      through: "Jammer",
      otherKey: "jamId",
      foreignKey: "userId"
    }
    User.belongsToMany(models.Jam, columnMapping)
    User.belongsTo(models.City, { foreignKey: 'cityId'})
    User.hasMany(models.Jam, { as: 'host', foreignKey: 'hostId'})
  };

  return User;
};
