import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import sendResetEmail from '../utils/sendResetEmail.js';

dotenv.config();
const GOOGLE_CLIENT_ID = '350518038891-ng6gtlroqcb9f802eisp5adorqskgrfr.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserDatas = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await UserModel.findOne({ where: { id: userId } });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerGoogle = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        const { email } = ticket.getPayload();
        let user = await UserModel.findOne({ where: { email } });

        if (user) {
            const Token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token: Token, userRole: user.role });
        } else {
            const randomPassword = crypto.randomBytes(8).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 8);
            user = await UserModel.create({
                email: email,
                password: hashedPassword
            });
            const Token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token: Token, userRole: user.role });
        }

    } catch (error) {
        console.error("❌ Error en registerGoogle:", error);
        res.status(500).json({ message: error.message });
    }
};

export const profileDatas = async (req, res) => {
    const { email, attribute, value } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        user[attribute] = value;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const changeRole = async (req, res) => {
    const { email, role } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        user.role = role;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await UserModel.findOne({ where: { email } });
        await user.destroy();
        res.status(200).json({ message: "Deleted user" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUsersCount = async (req, res) => {
    try {
        const usersCount = await UserModel.count();
        res.status(200).json(usersCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'Unregistered user' });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const expires = new Date(Date.now() + 5 * 60 * 1000);

        await user.update({
            resetCode: code,
            resetCodeExpires: expires,
        });

        await sendResetEmail(user.email, code);

        res.status(200).json('Codigo Enviado');
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const validateCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'Unregistered user' });
        }

        const now = new Date();

        const isCodeValid = user.resetCode === code && new Date(user.resetCodeExpires) > now;

        if (!isCodeValid) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }

        user.resetCode = null;
        user.resetCodeExpires = null;
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token: token, userRole: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



