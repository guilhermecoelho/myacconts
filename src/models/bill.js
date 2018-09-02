import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: { type:String, required: true },
    description: String,
    price: Number,
    date: Date

});

const Bill = mongoose.model('Bill', schema);

export default Bill;