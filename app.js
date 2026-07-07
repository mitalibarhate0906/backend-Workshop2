const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

require("./config/db");

const app = express();

const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const permissionRoutes = require("./routes/permission");

app.use(express.json());

app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/permission", permissionRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});