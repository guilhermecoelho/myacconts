import mongoose from 'mongoose';

mongoose.Promise = Promise;

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/myacconts';

const connect = () => mongoose.connect(mongodbUrl);

export default {
    connect
}