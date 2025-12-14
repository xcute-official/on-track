import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    nickname: {
      type: String
    },
    picUrl: {
      type: String
    },
    goalsIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goal"
      }
    ]
  },{
    timestamps: true
  }
)

export const User = mongoose.models.User || mongoose.model("User", userSchema);