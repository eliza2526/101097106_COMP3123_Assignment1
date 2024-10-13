const express = require('express');
const router = express.Router();
const employees = require('../employees')

//home page
router.get('/', (req, res) => { //http://localhost:3000/
    res.send("<h1>COMP 3123 Full Stack Development - Assignment 1</h1>")
});

//User can get all employees list
router.get('/api/v1/emp/employees', (req, res) => { //http://127.0.0.1:3000/api/v1/emp/employees
    res.json(employees);
});

//User can get employee details by employee id
router.get('/api/v1/emp/employees/:id', (req, res) => { //http://127.0.0.1:3000/api/v1/emp/employees/1
    const empId = parseInt(req.params.id);
    const employee = employees.find(e => e.employee_id === empId);
    if (employee) {
        res.json(employee);
    } else {
        res.status(400).send({"message" : "Employee not found"})
    } 
});

//User can create new employee
router.post("/api/v1/emp/employees", (req, res) => { //http://127.0.0.1:3000/api/v1/emp/employees
    const newEmployee = {
        employee_id: req.body.employee_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        position: req.body.position,
        salary: req.body.salary,
        date_of_joining: req.body.date_of_joining,
        department: req.body.department,
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee)    
});

//User can update employee by employee id
router.put('/api/v1/emp/employees/:id', (req, res) => {
    const empId = parseInt(req.params.id);
    const empIndex = employees.findIndex(e => e.employee_id === empId);
    if (empIndex !== -1){
        employees[empIndex] = { ...employees[empIndex], ...req.body }
        res.json(employees[empIndex]);
    } else {
        res.status(404).send({"message" : "Employee not found"});
    }
});

//User can delete employee by employee id
router.delete('/api/v1/emp/employees/:id', (req, res) => {
    const empId = parseInt(req.params.id);
    employees = employees.filter(e => e.employee_id === empId);
    res.status(204).send("Employee not found");    
});

module.exports = router;