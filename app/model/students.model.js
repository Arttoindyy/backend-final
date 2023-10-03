module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        studentsName: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        university: {
            type: Sequelize.STRING
        },
        Graduation: {
            type: Sequelize.BOOLEAN
        },
    });

    return Student;
};