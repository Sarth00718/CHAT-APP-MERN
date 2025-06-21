import { User } from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        //alls fields are required
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //password and confirm password must match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        //check if user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //profile photo 
        const maleProfilePhoto = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=b6e3f4`;
        const femaleProfilePhoto = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=ffd5dc`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            // profilePhoto: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username}&gender=${gender}`
            gender

        })
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        //all fields are required
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        //check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        //compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }

        //create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '90d' });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 90 * 24 * 60 * 60 * 1000,// 1 day in milliseconds
            sameSite: 'strict' // Prevent CSRF attacks
        }).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePhoto: user.profilePhoto
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            httpOnly: true,
            maxAge: 0, // Set maxAge to 0 to delete the cookie
            sameSite: 'strict' // Prevent CSRF attacks
        }).json({
            message: "User logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

//getotherusers
export const getOtherUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.id } }).select("-password");
        return res.status(200).json({
            message: "Users fetched successfully",
            success: true,
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}