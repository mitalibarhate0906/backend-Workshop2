const Role = require("../model/role");

exports.createRole = async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;

    const existingRole = await Role.findOne({ roleName });

    if (existingRole) {
      return res.status(400).json({
        message: "Role with this name already exists",
      });
    }

    const newRole = await Role.create({
      roleName,
      description,
      permissions,
    });

    res.status(201).json({
      message: "Role created successfully",
      role: newRole,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");

    res.status(200).json({
      message: "Roles fetched successfully",
      roles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching roles",
      error: error.message,
    });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role fetched successfully",
      role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        roleName,
        description,
        permissions,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate("permissions");

    if (!updatedRole) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role updated successfully",
      role: updatedRole,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);

    if (!deletedRole) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};