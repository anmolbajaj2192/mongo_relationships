const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(()=> console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new Schema({
    item: String,
    price: Number,

});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const getData = async() => {
    let result = await Post.findOne({}).populate("user","username");
    console.log(result);
};

getData();
// 

// const del = async() => {
//  await Post.findByIdAndDelete(""); //paste the id 
//  await User.findByIdAndDelete(""); //paste the id
// }