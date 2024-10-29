import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../database/UserModel.js";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        if (user && user.password) {
            bcrypt
                .compare(password, user.password)
                .then((isPasswordCorrect) => {
                    if (isPasswordCorrect) {
                        const accessToken = jwt.sign(
                            { id: user.userId, email: user.email },
                            process.env.JWT_KEY,
                            { expiresIn: "7d" }
                        );
                        if (accessToken) {
                            const { userId, username, email, createdAt } = user;
                            res.status(200).json({
                                userId,
                                username,
                                email,
                                accessToken,
                                createdAt,
                            });
                        }
                    } else {
                        res.status(401).json({
                            message:
                                "The password that you entered is incorrect",
                        });
                    }
                });
            return;
        }
        res.status(401).json({
            message: "No user with the email address found",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const registerUser = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { username, email, password, userId } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            res.status(403).json({
                message: "The email is already in use",
            });
            return;
        }

        var hash = bcrypt.hashSync(password, 8);

        await UserModel.create({
            userId,
            username,
            email,
            password: hash,
        });

        res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User registration failed." });
    }
};
