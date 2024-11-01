export function generateNumericUsername() {
    const baseUsername = "User";
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `${baseUsername}${timestamp}${randomNum}`;
}
