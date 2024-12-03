const express = require("express")
// Create express router object
const router = express.Router();
const connection = require("../db/mysql")


// Get request from router to get login form
router.get("/login", (req, res) => {
    res.render("login");
}) 

// Authenticate creds input by user
router.post("/authenticate", (req, res) => {
    // Get creds from req body
        let email = req.body.email;
        let password = req.body.password;

        // Create query to find the user and pass params
        connection.query("select * from emp where email=? and password=?", [email, password], (err, result, fields) => {
            if(!err && result.length != 0){
                console.log("User Valid: ", result);
                console.log("fields: ", fields);
                res.redirect("/employees")
               // res.redirect("/home");
            }else{
                res.status(500).send("<h1>Valid User Not Found!</h1>");
            }
        })
});


// endpoint to display all employees
router.get("/employees", (req, res) => {
    connection.query("select * from emp2", (err, result, fields) => {
        if (!err){
            console.log(result);
            console.log(fields);
            res.render("employees", {empdata:result});
        }
    });
});

// endpoint to display emp by ID 
router.get("/employees/:id", (req, res) => {
    connection.query("select * from emp2 where id=?", [req.params.id], (err, result, fields) => {
        if (!err){
        console.log(result);
        console.log(fields);
        res.render("empbyid", {empdata:result});
        }
    })
})

router.get("/employee-add", (req, res) => {
    res.render("addemp");
})

router.post("/addEmp", (req, res) => {
    connection.query("insert into emp2 values (?,?,?,?)", [req.body.id, req.body.name, req.body.sal, req.body.dept], (err, result, fields) => {

        if (!err) {
            console.log("Emp Added!", result);
            res.redirect("/employees")
    }
        else 
            res.status(500).send("<h1>Emp Not Added!</h1>");
            
    });
})

router.get("/editEmp/:id", (req, res) => {
    connection.query("select * from emp2 where id=?", [req.params.id], (err, result, fields) => {
        res.render("update-emp", {emp:result[0]})
    })
})

router.post("/updateEmp", (req, res) => {
    connection.query("update emp2 set name=?, sal=?, dept=? where id=?", [req.body.name, req.body.sal, req.body.dept, req.body.id], (err, result, fields) => {

        if (!err) {
            console.log("Id: "+req.body.id+"Emp Updated! :", result);
            res.redirect("/employees")
    }
        else 
            res.status(500).send("<h1>Emp Not Updated!</h1>");
    })
})

router.get("/deleteEmp/:id", (req, res) => {
    connection.query("delete from emp2 where id=?", [req.params.id], (err, result, fields) => {

        if (!err){
            console.log("Emp Deleted Id: "+req.params.id);
            console.log("Data", result);
            res.redirect("/employees")
        } else res.status(500).send("<h1>Emp Not Deleted!</h1>");
    })
})
// Export router to be used in app.js
module.exports = router;