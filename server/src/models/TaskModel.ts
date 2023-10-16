import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('Task', TaskSchema)