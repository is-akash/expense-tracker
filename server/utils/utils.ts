import { UserType } from "../types/index.js";

export function sanitizeUser(user: UserType) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
