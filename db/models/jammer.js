'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jammer = sequelize.define('Jammer', {
    userId: DataTypes.INTEGER,
    jamId: DataTypes.INTEGER
  }, {});
  Jammer.associate = function(models) {
    Jammer.belongsTo(models.Jam, { foreignKey: 'jamId' })
    Jammer.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Jammer;
};
