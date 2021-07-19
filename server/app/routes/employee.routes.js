module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // create a new employee
    app.post('/api/employee', employee.create);

    // retrieve all employee
    app.get('/api/employee', employee.findAll);

    // retrieve a single employee with id
    app.get('/api/employee/:id', employee.findOne);

    // update a employee with id
    app.put('/api/employee/:id', employee.update);

    // delete a employee with id
    app.delete('/api/employee/:id', employee.delete);
}