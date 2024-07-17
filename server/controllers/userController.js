import UserModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserDatas = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { email: req.params.email } });
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
        } else if (password === user.password) {
            res.status(200).json(user.role);
        } else {
            res.status(401).json({ message: "Contraseña incorrecta" });
        }
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

export const createPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        await UserModel.create({
            email: email,
            password: password
        })
        res.status(200).json({ message: "Usuario agregado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { email } });
        user.password = password;
        await user.save();
        res.status(200).json({ message: "Contraseña cambiada" });
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