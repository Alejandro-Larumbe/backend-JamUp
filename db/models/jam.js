'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jam = sequelize.define('Jam', {
    time: DataTypes.TIME,
    date: DataTypes.DATE,
    hostId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Jam.associate = function(models) {
    const columnMapping = {
      through: "Jammer",
      otherKey: "userId",
      foreignKey: "jamId"
    }
    Jam.belongsToMany(models.User, columnMapping)
    Jam.belongsTo(models.City, { foreignKey: 'cityId' })
    Jam.belongsTo(models.User, { foreignKey: 'hostId' })
    Jam.hasMany(models.Jammer, { foreignKey: 'jamId' })
  };
  return Jam;
};
