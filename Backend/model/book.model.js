import mongoose from "mongoose";

const bookScheme = mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    Image: String,
    title:String,
})

const Book = mongoose.model("Book", bookScheme);
export default Book;