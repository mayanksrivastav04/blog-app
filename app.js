require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const port = 8080;
const port = process.env.PORT || 8080;
const Blog = require("./models/blogSchema.js");
const methodOverride = require("method-override");
app.use(methodOverride('_method'));


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require("path");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));


main()
  .then((res) => {
    console.log("connection successful...");
  })
  .catch((err) => {
    console.log(err);
  });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
// }
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "blogsDB"
    });
    console.log("✅ Connected to MongoDB Atlas");
    console.log("Connected DB:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}





//INDEX ROUTE
app.get("/",async (req,res)=>{
  let blogs = await Blog.find();

  res.render("centerpage.ejs",{blogs})
})
// app.get("/blogs", async (req, res) => {
//   // let blogs = await Blog.find();
//   console.log(blogs);
  
//   res.render("sidebar.ejs");
// });

//CREATE ROUTE
app.post("/blogs", async (req, res) => {
  let { title, author, content } = req.body;

  let blogData = {
    title,
    content,
    created_at: new Date()
  };
  if (author) {
    blogData.author = author;
  }

  try {
    let newBlog = new Blog(blogData);
    let savedBlog = await newBlog.save();
    console.log("✅ Blog saved:", savedBlog); // 👈 log saved doc
  } catch (err) {
    console.error("❌ Error saving blog:", err);
  }

  res.redirect("/");
});


app.get("/blogs/:id",async (req,res)=>{
  let {id}= req.params;
  let blog = await Blog.findById(id);
  // console.log(blog.content);
  res.render("blogs.ejs",{blog})
  
})
// app.get("/blogs",(req,res)=>{
//     res.render("centerpage.ejs");

// })

//EDIT ROUTE
app.get("/blogs/:id/edit",async (req,res)=>{
  let {id} = req.params;
  let blog = await Blog.findById(id);

  res.render("edit.ejs",{blog});
})

//UPDATE ROUTE
app.put("/blogs/:id/edit",async (req,res)=>{
  let {id} = req.params;
  let {title:newTitle,content:newContent} = req.body;
  await Blog.findByIdAndUpdate(id,{title:newTitle,content:newContent},{runValidators:true,new :true});
  
  res.redirect("/");
  
})


//DELETE ROUTE
app.delete("/blogs/delete/:id",async (req,res)=>{
  let {id} = req.params;
  await Blog.findByIdAndDelete(id);
  res.redirect("/")

})







app.get("/allblogs", async (req, res) => {
  let blogs = await Blog.find();

  res.json(blogs); // shows all blogs in JSON
});







app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
