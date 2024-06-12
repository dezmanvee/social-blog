import mongoose from "mongoose";
const crypto = await import("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
    authMethod: {
      type: String,
      required: true,
      enum: ["local", "google", "facebook", "linkdin"],
      default: "local",
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationExpires: {
      type: Date,
      default: null,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    nextEarningDate: {
      type: Date,
      default: () => {
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
      },
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    hasSelectedPlan: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },

    //Relations
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//Generate Account Verification Token
userSchema.methods.generateAccVerificationEmail = function () {
  //Generate token
  const emailToken = crypto.randomBytes(20).toString("hex");

  //update accountVerificationToken
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

// update accountVerificationExpires
this.accountVerificationExpires = Date.now() + 10 * 60 * 1000 // Expires in 10mins

return emailToken
};

export const User = mongoose.model("User", userSchema);
