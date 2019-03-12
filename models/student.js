'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      knownFor: DataTypes.STRING,
      github: DataTypes.STRING,
      slack: DataTypes.STRING
    },
    {}
  );
  Student.associate = function(models) {
    Student.belongsTo(models.Cohort);
  };
  return Student;
};
