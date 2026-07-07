const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema(
  {
    actionName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    baseUrl: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      trim: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
    collection: 'permissions',
  }
);

const Permission = mongoose.model('permission', PermissionSchema);
module.exports = Permission;
