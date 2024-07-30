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
    username: String,
    address: [
        {
            _id: false, //mtlb id wala attribute create nhi hoga
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async()=>{
    let user1 = new User({
        username: "sherlockholmes",
        address: [{
            location: "221B Baker Street",
            city: "London"
        }]
    });

    user1.address.push({location:"P21 WallStreet", city:"London"});
    let result = await user1.save();
    console.log(result);
}

addUsers();