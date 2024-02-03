import mongoose from "mongoose"

const storySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    duration: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    file: [{
      type: String,
      required: true
    }],
    fileType: {
      type: String,
      enum: ["image", "video"]
    }, // or
    isVideo: {
      type: Boolean,
      default: false,
      required: true
    }
  }
  , { timestamps: true }
)

export const Story = mongoose.model("Story", storySchema)