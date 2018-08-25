// define our serialization schemes
module.exports.student = {
  // include all own properties and the associated `Student` instance
  include: ['@all', 'Cohort'],
  // let's exclude from the above the primary key and updated/created info
  exclude: ['@fk', 'createdAt', 'updatedAt'],
  // use lowercase association name based on JSON conventions
  as: { Cohort: 'cohort'},
  assoc: {
    // scheme to be used for the associated `Cohort` instance
    Cohort: {
      include: [ 'id', 'name' ]
    }
  }
};

module.exports.cohort = {
  // include only id, namd and associated students
  include: ['id', 'name', 'Students'],
  // use lowercase association name based on JSON conventions
  as: { Students: 'students' },
  // scheme to be used for the associated 'Cohort' instance
  assoc: {
    Students: {
      // exclude foreign key and created/updated info
      exclude: [ '@fk', 'createdAt', 'updatedAt' ]
    }
  }
};