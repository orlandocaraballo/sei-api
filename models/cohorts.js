'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define(
    'Cohort',
    {
      name: DataTypes.STRING
    },
    {}
  );
  Cohort.associate = function(models) {
    Cohort.hasMany(models.Student);
  };
  return Cohort;
};
