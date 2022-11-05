const express=require("express");
const cookieParser = require('cookie-parser')
const bodyParser=require('body-parser');
const app=express();

const path=require("path");

const controller=require("./controller/mycontroller");

app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine","ejs");
app.set("views","views");

app.get("/",controller.homepage);
app.get("/skill",controller.skillpage);
app.get("/education",controller.educationpage);
app.get("/experience",controller.experiencepage);
app.get('/personal',controller.personalinfo);
app.get('/summary',controller.summarypage);
app.get('/achievement',controller.achievementpage);
app.get('/build-resume',controller.buildresumepage);
app.get('/clear-resume',controller.cleardata);
app.post("/save",controller.savedata);

app.use("/",(req,res,next)=>{
    return res.render("404");
})


app.listen(3000);