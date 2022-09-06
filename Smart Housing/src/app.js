const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const app = express();
const hbs = require("hbs");
require("./db/conn")
const Register = require("./models/register");
const port =  process.env.PORT || 5182;

// const DB = "mongodb+srv://coctumer-user:Muzamil123+@cluster0.ofky0as.mongodb.net/costumerdb?retryWrites=true&w=majority"



// mongoose.connect(DB, {
//     useNewUrlParse: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: false
// }).then(() =>{
//     console.log(`connection successful`);
// }).catch((err) =>{
//     console.log(`no connection`);
// })

const static_path = path.join(__dirname, "./public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(express.urlencoded({extended:false}))

// console.log(path.join(__dirname, "./public"))
app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/", (req, res) => {
    // console.log("index file not rendered");
    res.render("index")
});
app.get("/about", (req, res) => {
    res.render("about")
});
app.get("/contact", (req, res) => {
    res.render("contact")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.get("/buy", (req, res) => {
    res.render("buy")
});
app.get("/sell", (req, res) => {
    res.render("sell")
});
app.get("/latestads", (req, res) => {
    res.render("latestads")
});
app.post("/", (req, res) =>{
        const comments = req.body.Comments
        res.status(201).render("index", {name: "successfully submitted"})
   
})
app.post("/register", async (req, res) => {
    // res.render("index");
    // console.log("register post method!");
    try {
        const password = req.body.Password
        const cpassword = req.body.Confirmpassword
        console.log(req.body.Confirmpassword)
        console.log(req.body.Password)

        if(req.body.Password == req.body.Confirmpassword){
            const userRegister = new Register({
                Username : req.body.Username,
                Password : req.body.Password,
                Confirmpassword : req.body.Confirmpassword
            })

            const registered = await userRegister.save();   
              
            res.status(201).render("index",{name:"successfully"});
            console.log("successfully added");
        }
        else{
            res.render("error",{error:"Password did not match"})
            console.log("Error occured");

        }
    } catch (error) {
        res.status(400).send(error)
        
    }
});

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`)
})