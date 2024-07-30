const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(()=> console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const orderSchema = new Schema({
    item: String,
    price: Number,

});

const customerSchema = new Schema({
    name: String,
    orders:[
        {
            //mongoose > populate > hume objectID store karani hai child object mein
            type: Schema.Types.ObjectId,

            ref:"Order"//collection ka naam batana padega jise hum refer kar rahe hai
        },
    ],
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async ()=>{
    let cust1 = new Customer({
        name: "Rahul Kumar",
    });

    let order1 = await Order.findOne({item:"Chips"}); //chips ka data DB mein se abstract karke order1 mein store kia hai.
    let order2 = await Order.findOne({item:"Chocolate"});

    cust1.orders.push(order1); //order1 object hai
    cust1.orders.push(order2);
    
    let result = await cust1.save();
    console.log(result);
}
addCustomer();

// const addOrders = async()=>{
//     let result = await Order.insertMany([
//         {item:"Samosa", price:12},
//         {item:"Chips", price: 10},
//         {item: "Chocolate", price: 40},
//     ]);

//     console.log(result);
// }

// addOrders();




