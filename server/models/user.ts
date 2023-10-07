import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email name is required"],
  },
  price: {
    type: Number,
    required: [true, "User price is required"],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
