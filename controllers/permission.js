const Permission = require('../model/permission');

exports.createPermission = async (req, res) => {
  try {
    const { actionName, description, method, baseUrl, path } = req.body;

    const existingPermission = await Permission.findOne({ actionName, method, baseUrl, path });
    if (existingPermission) {
      return res.status(400).json({
        message: 'Permission with this action and path already exists',
      });
    }

    const newPermission = await Permission.create({
      actionName,
      description,
      method,
      baseUrl,
      path,
    });

    res.status(201).json({
      message: 'Permission created successfully',
      permission: newPermission,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();

    res.status(200).json({
      message: 'Permissions fetched successfully',
      permissions,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching permissions',
      error: error.message,
    });
  }
};

exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({
        message: 'Permission not found',
      });
    }

    res.status(200).json({
      message: 'Permission fetched successfully',
      permission,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { actionName, description, method, baseUrl, path } = req.body;

    const updateData = {
      ...(actionName !== undefined ? { actionName } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(method !== undefined ? { method } : {}),
      ...(baseUrl !== undefined ? { baseUrl } : {}),
      ...(path !== undefined ? { path } : {}),
    };

    const updatedPermission = await Permission.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({
        message: 'Permission not found',
      });
    }

    res.status(200).json({
      message: 'Permission updated successfully',
      permission: updatedPermission,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const deletedPermission = await Permission.findByIdAndDelete(req.params.id);
    if (!deletedPermission) {
      return res.status(404).json({
        message: 'Permission not found',
      });
    }

    res.status(200).json({
      message: 'Permission deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
