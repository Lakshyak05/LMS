import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        imageUrl: { type: String, required: true },
        enrolledCourses: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'course'
            }
        ],
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
export default User