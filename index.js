import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
// conncting MONGO DB here

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  }
  catch (err) {
    console.log(err);
  }
}
connectDb();


let products = [
  {
    id: 1,
    name: "Corsair HS45 Headphone",
    price: 4500,
    imageUrl: "https://techmatched.pk/wp-content/uploads/2024/05/4-13.png",
    desc: "A comfortable and high-quality gaming headset.",
  },
  {
    id: 2,
    name: "RTX 3060",
    price: 93000,
    imageUrl:
      "https://static.webx.pk/files/2603/Images/14-czone.com.pk-1540-12831-250122082031-2603-2261410-231124021614482.jpg",
    desc: "A powerful graphics card from nvidia.",
  },
];

app.get("/products", async (req, res) => {
  try {
    const productsFromDb = await Product.find({});
    res.status(200).json(productsFromDb);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/products", async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  try {
    const newDbProduct = new Product({
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      imageUrl: newProduct.imageUrl,
      desc: newProduct.desc,
    });

    await newDbProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
  }

});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updateproduct = req.body;
  console.log(id);
  console.log(updateproduct);
  try {
    await Product.findOneAndUpdate({ id: id }, { ...updateproduct });
    res.json("product updated");

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: id });
    if (deletedProduct) {
      return res.status(200).json("Successfullt Deleted");
    } else {
      return res.status(404).json({ message: "Product not found" });
    }

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
})



app.listen(5050, () => {
  console.log("my server is running")
});


