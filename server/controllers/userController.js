import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

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

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Correo sin registrar" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña invalida' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token: token, userRole: user.role });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const repeatEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            res.status(200).json({ message: "Correo agregado" });
        } else {
            res.status(400).json({ message: "Correo ya registrado" });
        }
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
        res.status(500).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await UserModel.create({
            email: email,
            password: hashedPassword
        })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await UserModel.findOne({ where: { email } });
        user.password = hashedPassword;
        await user.save();

        if (req.body.token) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(200).json(token);
        } else {
            res.status(200).json({ message: "Contraseña cambiada" })
        }

    } catch (error) {
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

export const findEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: "Correo no registrado" });
        }
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
        res.status(200).json({ message: "Usuario eliminado" });
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