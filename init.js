const mongoose = require("mongoose");
const Blog = require("./models/blogSchema.js");

main()
  .then((res) => {
    console.log("connection successful...");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/blogs');
}

let allBlogs = ([
  {
    title:"game dev",
    author:"mayank",
    content:"very good gaming",
  },
  
])

Blog.insertMany(allBlogs);