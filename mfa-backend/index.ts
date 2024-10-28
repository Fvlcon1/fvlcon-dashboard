// import express, { Request, Response, RequestHandler } from 'express';
// import cors from 'cors';
// import speakeasy from 'speakeasy';
// import sgMail from '@sendgrid/mail';
// import 'dotenv/config';

// const app = express();
// app.use(cors());
// app.use(express.json());

// const sendgridApiKey = process.env.SENDGRID_API_KEY;
// if (!sendgridApiKey) {
//     throw new Error("SENDGRID_API_KEY is not defined in the environment variables.");
// }

// sgMail.setApiKey(sendgridApiKey);

// interface User {
//     mfaSecret: string;
//     code: string;
//     expiry: number;
// }

// const users: Record<string, User> = {};

// const sendMfaCodeEmail = async (email: string, code: string): Promise<void> => {
//     const msg = {
//         to: email,
//         from: 'blvcksaphhire@gmail.com',
//         subject: 'Your MFA Code',
//     html: `
//       <p>Your MFA code is: <strong>${code}</strong></p>
//       <p>This code will expire in 5 minutes.</p>
//     `,
// };

//     try {
//         await sgMail.send(msg);
//         console.log("MFA code email sent successfully");
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error('Failed to send MFA code email');
//     }
// };

// const setupMfaHandler: RequestHandler = async (req: Request, res: Response) => {
//     const { email } = req.body;

//     if (!email) {
//         res.status(400).json({ success: false, message: "Email is required" });
//         return;
//     }

//     if (!users[email]) {
//         const secret = speakeasy.generateSecret({ length: 20 });
//         users[email] = { mfaSecret: secret.base32, code: '', expiry: 0 };
//     }

//     const code = speakeasy.totp({
//         secret: users[email].mfaSecret,
//         encoding: 'base32',
//         step: 300,
//     });

//     users[email].code = code;
//     users[email].expiry = Date.now() + 5 * 60 * 1000;

//     try {
//         await sendMfaCodeEmail(email, code);
//         res.json({ success: true, message: 'MFA code email sent successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: (error as Error).message });
//     }
// };

// const verifyMfaHandler: RequestHandler = (req: Request, res: Response) => {
//     const { email, code } = req.body;
//     const user = users[email];

//     if (!user) {
//         res.status(404).json({ success: false, message: 'User not found' });
//         return;
//     }

//     const isExpired = Date.now() > user.expiry;
//     if (isExpired) {
//         res.status(400).json({ success: false, message: 'MFA code has expired' });
//         return;
//     }

//     const isCodeValid = speakeasy.totp.verify({
//         secret: user.mfaSecret,
//         encoding: 'base32',
//         token: code,
//         step: 300,
//         window: 3,
//     });

//     if (isCodeValid) {
//         users[email].code = '';
//         users[email].expiry = 0;
//         res.json({ success: true, message: 'MFA code verified successfully' });
//     } else {
//         res.status(400).json({ success: false, message: 'Invalid MFA code' });
//     }
// };

// app.post('/setup-mfa', setupMfaHandler);
// app.post('/verify-mfa', verifyMfaHandler);

// app.listen(5001, () => console.log("Server running on port 5001"));

import express, { Request, Response } from 'express';
import cors from 'cors';
import speakeasy from 'speakeasy';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not defined in the environment variables.");
}

// Configure SendGrid API key
sgMail.setApiKey(sendgridApiKey);


const users: Record<string, { mfaSecret: string; code: string; expiry: number }> = {};

// Endpoint to generate a TOTP code and send it to the provided email
app.post('/setup-mfa', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        if (!users[email]) {
            const secret = speakeasy.generateSecret({ length: 20 });
            users[email] = { mfaSecret: secret.base32, code: '', expiry: 0 };
        }

        const code = speakeasy.totp({
            secret: users[email].mfaSecret,
            encoding: 'base32',
            step: 300,
        });

        users[email].code = code;
        users[email].expiry = Date.now() + 5 * 60 * 1000;

        const msg = {
            to: email,
            from: 'blvcksaphhire@gmail.com',
            subject: 'Your MFA Code',
            html: `<p>Your MFA code is: <strong>${code}</strong></p><p>This code will expire in 5 minutes.</p>`,
        };

        await sgMail.send(msg);
        res.json({ success: true, message: 'MFA code email sent successfully' });
    } catch (error) {
        console.error("Error sending MFA code:", error);
        res.status(500).json({ success: false, message: 'Error sending MFA code email' });
    }
});



// Endpoint to verify the TOTP code
app.post('/verify-mfa', (req: Request, res: Response) => {
    const { email, code } = req.body;

    // Check if the user exists and if the code matches and is not expired
    const user = users[email];
    if (user && user.code === code && Date.now() < user.expiry) {
        res.json({ success: true, message: 'MFA code verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid or expired MFA code' });
    }
});


app.listen(5001, () => console.log("Server running on port 5001"));