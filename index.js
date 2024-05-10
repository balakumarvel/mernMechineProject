const express = require('express')
const app = express()
const mongoose = require('mongoose') 
const cors = require('cors')
let bodyParser = require("body-parser")
let multer = require("multer")
const EmployeeModel = require('./models/registeredUser')
const modelEmpoloyeeRegister = require('./models/modelEmpoloyeRegister')
const { default: axios } = require('axios')
const port = 4005
const path = require('path');

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

// multer file uplode 
const stroage = multer.diskStorage({
    destination: function (req,image,cb){
          return cb(null,'./Images')
    },
    filename: function(req,image,cb){
          return cb(null,`${image.originalname}`)
    }
})
const upload = multer({stroage})

// handling register action
app.post('/register',(req,res)=>{
    EmployeeModel.create(req.body)
    .then(employees=>res.json(employees))
    .catch(err=>res.json(err)) 
})
// handling login action
app.post('/login',(req,res)=>{
    const{email,password}=req.body
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if(user){
        if(user.password===password){
            res.json('sucess')
        }else{
            res.json('user not founded')
        }}else{
            res.json(" no user founded")
        }
    })
})
// handling admin name for dashboad
app.get('/user/:ID', (req, res) => {
    const ID = req.paoriginalnamerams.ID;
    EmployeeModel.findOne({ _id: ID })
        .then((employee) => {
            if (employee) {
                res.json(employee.name);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        })
        .catch((err) => {
            console.log("Problem finding employee:", err);
            res.status(500).json({ error: "Internal server error" });
        });
});


//saving employee list
app.post('/employee',upload.single('image'),(req,res)=>{
    try {
        const fs = require('fs');
        // console.log(req.file.)
        fs.writeFileSync('./Images/'+req.file.originalname, req.file.buffer);
    console.log('File saved successfully');
    }catch(er){
        console.log(er)
        res.json("error in data upload ")
    }
    // console.log(req.body)
    // console.log(req.file)
    modelEmpoloyeeRegister.findOne({email:req.body.email})
    .then((user)=>{
        if(user!==null){
            res.json("Email id already registered..")
        }else{
            const dataforDb = new modelEmpoloyeeRegister({
                name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course,
                    image: req.file.originalname
            })
            return dataforDb.save()
            .then((data)=>res.json("inpiut saved successfully"))
            .catch((err)=>{
                console.log(err)
                res.json("error in data upload ")
        })
    }
    })
})
 
// showing employee list
app.get('/employee-list',(req,res)=>{
    modelEmpoloyeeRegister.find()
    .then((e)=>{res.send(e)})
})
app.use('/Images', express.static(path.join(__dirname, 'Images')));



// edit-employee send data
app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID;
    if (!ID) {
        return res.status(400).json({ error: "ID parameter is required" });
    }

    modelEmpoloyeeRegister.findById(ID)
        .then((employee) => {
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).json({ error: "Employee not found" });
            }
        })
        .catch((err) => {
            console.log("Problem finding employee:", err);
            res.status(500).json({ error: "Internal server error" });
        });
});


// edit-employee update values
app.put("/employee-list/:ID",upload.single('image'), (req, res) => {
    let ID = req.params.ID
    modelEmpoloyeeRegister.updateOne({ _id: ID }, req.body)
        .then((e) => { res.send("successfully updated data") })
        .catch(() => { res.send("error at Delete API"); })
})

//delete employee
app.delete('employee-list/:ID',(req,res)=>{
    const ID = req.params.ID
    modelEmpoloyeeRegister.deleteOne({_id:ID},req.body)
    .then(()=>{res.send("user deleted")})
    .catch(()=>{res.send("error in deletion")})
})

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})

