import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../database/UserModel.js";
import jwt from "jsonwebtoken";
import { generateNumericUsername } from "../utils/utils.js";

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await UserModel.findOne({ email: email });
        if (user && user.password) {
            bcrypt
                .compare(password, user.password)
                .then((isPasswordCorrect) => {
                    if (isPasswordCorrect) {
                        const accessToken = jwt.sign(
                            { id: user._id, email: user.email },
                            process.env.JWT_KEY,
                            { expiresIn: "7d" }
                        );
                        if (accessToken) {
                            const { _id, username, email, createdAt } = user;
                            res.status(200).json({
                                user: {
                                    id: _id,
                                    username,
                                    email,
                                    accessToken,
                                    createdAt,
                                },
                                message: "Logged In successfully",
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
    const { email, password } = req.body;
    const username = generateNumericUsername();

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
