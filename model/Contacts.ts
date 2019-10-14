import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'
import { User } from "./User"


interface Contact extends User {
    user: ObjectID,
    phone: String,
    type: String
}

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Contact = mongoose.model<Contact>('contact', ContactSchema)