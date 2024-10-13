const express = require('express');
const employees = require('./employees')
const empRouter = require('./routes/emp.js')
const userRouter = require('./routes/user.js')
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(empRouter); //employee list, create, update, delete without database
app.use(userRouter); //user login and signup without database


//using Mongodb
const Employee = require('./models/emp.js');
const mongoose = require('mongoose')
const DB_URL = 'mongodb+srv://elizabeththomas2:6zu6ywcVR4qVksqS@cluster0.u4oyz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, { 
    // useNewUrlParser : true,
    // useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Delete multiple employees in the collection
Employee.deleteMany()
.then(() => {
  console.log('Employees deleted successfully');  
})
.catch((err) => {
  console.error('Error deleteing employees:', err);
  mongoose.connection.close(); 
});

// Insert multiple employees into the collection
Employee.insertMany(employees)
    .then(() => {
      console.log('Employees inserted successfully');      
    })
    .catch((err) => {
      console.error('Error inserting employees:', err);
      mongoose.connection.close(); // Close the connection on error
    });

//database connected home page
app.get('/db', (req, res) => { //http://127.0.0.1:3000/db
    res.send("<h3>Welcome to My First DataBase application - Full Stack Devlopment</h3>");
});

// Get all employees from the database and send it as JSON format
app.get('/employees', async (req, res) => {  ///http://127.0.0.1:3000/employees
    try {
      const fetchedEmployees = await Employee.find();
      res.json(fetchedEmployees);
    } catch (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Retrieve a single Employee by Employee ID
app.get('/employees/:id', async (req, res) => { ///http://127.0.0.1:3000/employees/
    try {
        const empID=req.params.id;
        const fetchedEmployee = await Employee.find({_id:empID});
       res.json(fetchedEmployee); 
     } catch (err) {
       console.error('Error fetching Employee:', err);
       res.status(500).json({ message: 'Internal Server Error' });
     }
   });

////Find and Update a single employee by employee ID 
app.get('/employees/empIDUpdate/:id', async (req, res) => { ///http://127.0.0.1:3000/employees/empIDUpdate/
    try {
        const empID=req.params.id;
       const employee = await Employee.findByIdAndUpdate(empID,{
        "first_name": "Frank",
        "last_name": "Dawson",
        "email": "frank.dawson@example.com",
        "position": "Software Engineer",
        "salary": 90000,
        "date_of_joining": "2023-08-01",
        "department": "Engineering"});
       if(!employee){res.status(404).send("No Employee Found");}
       else{
           res.status(200).send();
           console.log("The Employee has been Updated");
           }
     } catch (err) {
       console.error('Error Updating employee :', err);
       res.status(500).json({ message: 'Internal Server Error' });
     }
   });

////Delete a single Employee by Employee ID
app.get('/employees/empIDDelete/:id', async (req, res) => { ///http://127.0.0.1:3000/employees/empIDDelete/
    try {
        const empID=req.params.id;
       const employee = await Employee.findByIdAndDelete(empID);
       if(!employee){res.status(404).send("No Employee Found");}
       else{
           res.status(200).send();
           console.log("The Employee has been deleted");
           }
     } catch (err) {
       console.error('Error deleting employee :', err);
       res.status(500).json({ message: 'Internal Server Error' });
     }
   });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});