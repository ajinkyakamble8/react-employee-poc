const Employee = require('../models/employee.model.js');

// create and save a new employee
exports.create = (req, res) => {
    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // create a employee
    const employee = new Employee({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        designation: req.body.designation,
        dateOfJoining: req.body.dateOfJoining
    });

    // save employee in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the employee."
        });
    });
};

// retrieve and return all employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then((employees) => {
        res.send(employees);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
};

// find a single empployee with a object ID
exports.findOne = (req, res) => {
    Employee.findById(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.id
        });
    });
};

// update a employee identified by the object ID in the request
exports.update = (req, res) => {
    // validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.id, {
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        designation: req.body.designation,
        dateOfJoining: req.body.dateOfJoining
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.id
        });
    });
};

// delete a employee with the specified id in the request
exports.delete = (req, res) => {
    //req.params.id = 'sdgfsdf';
    Employee.findByIdAndRemove(req.params.id)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.id
        });
    });
};