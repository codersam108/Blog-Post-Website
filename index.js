import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer"

const app = express();
const port = 3000;
var arr=[];
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/Add", (req, res) => {
    res.render("Add.ejs", { m: null });  // Initialize with null message
});

app.post("/submit", (req, res) => {
    let message = "";

    // Form validation
    if (req.body["title"] === "" || req.body["content"] === "") {
        message = "Please enter something - error";  // Error message
    } else {
        const newPost={
            title:req.body.title,
            content:req.body.content
        };
        arr.push(newPost);
        message = "Submitted Successfully - success";  // Success message
    }

    // Render the Add_Delete page with the message
    res.render("Add",{m:message} );
    // res.redirect("/");
});
app.get("/Delete",(req,res)=>{
    res.render("Delete.ejs",{posts:arr});
});
app.post("/delete",(req,res)=>{
    const postIndex=parseInt(req.body.postIndex,10);
    if(postIndex>=0 && postIndex<arr.length)
    {
        arr.splice(postIndex,1);
    }
    res.redirect('/');
});
app.get("/PostDisplay",(req,res)=>{
    
    res.render("PostDisplay.ejs",{posts:arr});
})
app.get("/aboutus",(req,res)=>{
    res.render("about.ejs");
})
app.get("/contactus",(req,res)=>{
    res.render("contact.ejs");
})
// app.post("/sub",(req,res)=>{
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: false, // true for port 465, false for other ports
//         auth: {
//           user: 
//           pass: "jn7jnAPss4f63QBp6D",
//         },
//       });
// })
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
