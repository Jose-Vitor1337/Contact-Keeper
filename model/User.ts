import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    date: Date
}

const UserSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         required: true
     },
     date: {
         type: Date,
         default: Date.now
     }
});

export const User = mongoose.model<User>('user', UserSchema)