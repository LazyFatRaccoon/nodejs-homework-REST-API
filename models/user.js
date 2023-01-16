const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscription = ["starter", "pro", "business"];
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    subscription: {
      type: String,
      enum: subscription,
      default: subscription[0],
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...Object.values(subscription))
    .required(),
});

const User = model("user", userSchema);

module.exports = { User, joiSchema, subscriptionSchema, emailSchema };
