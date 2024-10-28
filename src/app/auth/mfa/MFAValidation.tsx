// import React, { useState } from 'react';
// import axios from 'axios';

// const MFAValidation: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [code, setCode] = useState('');
//     const [message, setMessage] = useState<string | null>(null);

//     const handleValidateCode = async () => {
//         try {
//             const response = await axios.post('http://localhost:5001/verify-mfa', {
//                 email,
//                 code,  // Update to 'code' instead of 'token'
//             });
//             if (response.data.success) {
//                 setMessage("MFA validated successfully!");
//             } else {
//                 setMessage("Invalid MFA code.");
//             }
//         } catch (error) {
//             console.error("MFA validation error:", error);
//             setMessage("Validation failed. Please check the code and try again.");
//         }
//     };

//     return (
//         <div>
//             <h2>Validate MFA</h2>
//             <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter email"
//                 required
//             />
//             <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="Enter MFA Code"
//                 required
//             />
//             <button onClick={handleValidateCode}>Validate</button>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default MFAValidation;

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const MFAValidation: React.FC = () => {
    const [code, setCode] = useState(Array(6).fill(''));
    const [message, setMessage] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(300);
    const [isResending, setIsResending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            } else if (!value && index > 0) {
                const prevInput = document.getElementById(`code-${index - 1}`);
                if (prevInput) prevInput.focus();
            }
        }
    };

    const handleMfaValidation = async () => {
        setIsLoading(true);
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setMessage("Please enter a 6-digit code.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5001/verify-mfa', { email, code: fullCode });
            if (response.data.success) {
                setMessage("MFA validated successfully!");
                window.location.href = '/agreementpage';
            } else {
                setMessage(response.data.message || "Invalid MFA code.");
            }
        } catch (error) {
            console.error("MFA validation error:", error);
            setMessage("Validation failed. Please try again.");
        }
        setIsLoading(false);
    };

    const handleResendCode = async () => {
        setIsResending(true);
        try {
            const response = await axios.post('http://localhost:5001/setup-mfa', { email });
            if (response.data.success) {
                setMessage("A new verification code has been sent.");
                setTimeRemaining(300); // Reset timer
                setCode(Array(6).fill('')); // Clear code input
            } else {
                setMessage("Failed to resend code. Please try again.");
            }
        } catch (error) {
            console.error("Error resending code:", error);
            setMessage("Error resending code. Please try again.");
        }
        setIsResending(false);
    };

    const formattedTime = `${Math.floor(timeRemaining / 60)}:${('0' + (timeRemaining % 60)).slice(-2)}`;
    const maskedEmail = email ? email.replace(/^(.)(.*)(.@.*)$/, (_, a, b, c) => a + '*'.repeat(b.length) + c) : 'your email';

    return (
        <div style={styles.outerContainer}>
            <div style={styles.container}>
                <h2 style={styles.title}>Verify Your Email Address</h2>
                <p style={styles.instruction}>
                    A verification code has been sent to <strong>{maskedEmail}</strong>
                </p>
                <p style={styles.timer}>The code will expire in {formattedTime}.</p>

                <div style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            maxLength={1}
                            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                            style={styles.input}
                        />
                    ))}
                </div>

                <button style={styles.button} onClick={handleMfaValidation} disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>

                <button
                    style={styles.linkButton}
                    onClick={handleResendCode}
                    disabled={isResending}
                >
                    {isResending ? 'Resending...' : 'Resend code'}
                </button>

                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
    },
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#1e1e1e',
        border: '1px solid #333',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        color: '#ffffff',
        textAlign: 'center' as 'center',
    },
    instruction: {
        fontSize: '14px',
        color: '#b0b0b0',
        textAlign: 'center' as 'center',
        marginBottom: '10px',
    },
    timer: {
        fontSize: '14px',
        color: '#ff5722',
        textAlign: 'center' as 'center',
        marginBottom: '20px',
    },
    codeContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        width: '40px',
        height: '40px',
        textAlign: 'center' as 'center',
        fontSize: '18px',
        border: '1px solid #555',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: '#ffffff',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#4CAF50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    linkButton: {
        color: '#4CAF50',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '14px',
        marginTop: '10px',
    },
    message: {
        color: '#ff5722',
        fontSize: '14px',
        textAlign: 'center' as 'center',
        marginTop: '10px',
    },
};

export default MFAValidation;
