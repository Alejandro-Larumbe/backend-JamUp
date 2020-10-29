'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    photoUrl: DataTypes.TEXT
  }, {});
  City.associate = function(models) {
    City.hasMany(models.User, { foreignKey: 'cityId' })
    City.hasMany(models.Jam, { foreignKey: 'cityId' })
    // associations can be defined here
  };
  return City;
};
