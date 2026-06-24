const User = require("../model/user");
const Role = require("../model/role");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, roleId } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }

        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(400).json({
                message: "Role not found"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            mobileNumber,
            role: roleId
        });

        await newUser.populate({
            path: "role",
            select: "name description"
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate({ path: "role", select: "name description" })
            .select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({ path: "role", select: "name description" })
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, roleId } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({
                    message: "Email is already in use"
                });
            }
            updateData.email = email;
        }
        if (password) updateData.password = await bcrypt.hash(password, 10);
        if (mobileNumber) updateData.mobileNumber = mobileNumber;
        if (roleId) {
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(400).json({
                    message: "Role not found"
                });
            }
            updateData.role = roleId;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        })
            .populate({ path: "role", select: "name description" })
            .select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};