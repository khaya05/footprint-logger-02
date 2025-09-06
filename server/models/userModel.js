import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: String,
  lastName: String,
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

export default mongoose.model('User', UserSchema)