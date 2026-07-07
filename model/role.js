const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission", // use "Permission" if that's your model name
      },
    ],
  },
  {
    timestamps: true,
    collection: "roles",
  }
);

const Role = mongoose.model("role", roleSchema);

module.exports = Role;