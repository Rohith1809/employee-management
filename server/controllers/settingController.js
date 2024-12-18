import User from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Wrong old password" });
        }

        // Hash the new password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;

        // Save the updated user
        await user.save();

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error.message);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export { changePassword };
