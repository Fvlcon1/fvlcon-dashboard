"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Check that SENDGRID_API_KEY is defined
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not defined in the environment variables.");
}
// Configure SendGrid API key
mail_1.default.setApiKey(sendgridApiKey);
// In-memory "database" for demonstration
const users = {};
// Function to send the MFA code via email
const sendMfaCodeEmail = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: email,
        from: 'blvcksaphhire@gmail.com',
        subject: 'Your MFA Code',
        html: `
          <p>Your MFA code is: <strong>${code}</strong></p>
          <p>This code will expire in 5 minutes.</p>
        `,
    };
    try {
        yield mail_1.default.send(msg);
        console.log("MFA code email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error('Failed to send MFA code email');
    }
});
app.post('/setup-mfa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!users[email]) {
        const secret = speakeasy_1.default.generateSecret({ length: 20 });
        users[email] = { mfaSecret: secret.base32, code: '', expiry: 0 };
    }
    const code = speakeasy_1.default.totp({
        secret: users[email].mfaSecret,
        encoding: 'base32',
        step: 300,
    });
    users[email].code = code;
    users[email].expiry = Date.now() + 5 * 60 * 1000;
    try {
        yield sendMfaCodeEmail(email, code);
        res.json({ success: true, message: 'MFA code email sent successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// Endpoint to verify the MFA code
app.post('/verify-mfa', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    const user = users[email];
    // Check if the user exists
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Check if the code has expired
    const isExpired = Date.now() > user.expiry;
    if (isExpired) {
        return res.status(400).json({ success: false, message: 'MFA code has expired' });
    }
    // Verify the code
    const isCodeValid = speakeasy_1.default.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: code,
        step: 300,
        window: 3,
    });
    if (isCodeValid) {
        res.json({ success: true, message: 'MFA code verified successfully' });
    }
    else {
        res.status(400).json({ success: false, message: 'Invalid MFA code' });
    }
}));

app.listen(5001, () => console.log("Server running on port 5001"));
