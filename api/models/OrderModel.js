import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    menuItemId: {
        type: String,
        required: true,
    },

    userPhoneNumber: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: Date.now,
    },
})

export const order =
    mongoose.models.order || mongoose.model('order', OrderSchema)
