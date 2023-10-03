const db = require("../model");
const Student = db.Students;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.studentsName){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const student = {
        id: req.body.id,
        studentsName: req.body.studentsName,
        lastname: req.body.lastname,
        university: req.body.university,
        Graduation: req.body.Graduation ? req.body.Graduation : false
    }

    Student.create(student)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500!"
            });
        });
};

exports.findAll = (req, res) => {
    const studentsName = req.body.studentsName;
    var condition = studentsName ? {studentsName : {[Op.like]: `%${studentsName}%`}} : null;

    Student.findAll()
        .then(data => { 
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred!"
            });
        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    //message: `Error 404 ${id}`
                    message: "Error 404" + id
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500" + id
            });
        });
};

exports.findAllPublished = (req, res) => {
    Student.findAll({ where: {Graduation: true }})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {where: {id:id}})
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Updated successfully."
                });
            }else{
                res.send({
                    message: "Updated failed!"
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error update!"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfully."
            })
        }else{
            res.send({
                message: "Delete failed!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error deleted 500"
        });
    });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where:{},
        truncate: false
    })
    .then(num => {
        res.send({ message: "Deleted succesfully."});
    })
    .catch(error => {
        res.status(500).send({
            message: "Error 500!"
        })
    });
};