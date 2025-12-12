import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDatas = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await UserModel.findOne({ where: { id: userId } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint de login o registro con google
export const registerGoogle = async (req, res) => {
  const { token } = req.body;

  // Validacion basica de token recibido
  if (!token) {
    return res.status(400).json({ message: "Missing Google credential." });
  }

  try {
    // Verificamos el token y extraemos el payload
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await UserModel.findOne({ where: { googleId: payload.sub } });

    // Si el usuario no existe creamos un nuevo usuario
    if (!user) {
      user = await UserModel.create({
        email: payload.email,
        googleId: payload.sub,
        name: payload.name,
        picture: payload.picture,
      });
    }

    // Creamos el token para el front y enviamos
    const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token: jwtToken, userRole: user.role });
  } catch (error) {
    console.error(error);
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
};

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
};

export const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ where: { email } });
    await user.destroy();
    res.status(200).json({ message: "Deleted user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersCount = async (req, res) => {
  try {
    const usersCount = await UserModel.count();
    res.status(200).json(usersCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
