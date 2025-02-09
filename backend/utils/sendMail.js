import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendAvailablity = async (
    email, hospitalName
) => {
    try {
        console.log(email, hospitalName);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Bed Availablity",
            html: `<h1>Bed available at ${hospitalName}</h1>`,
        });

        return {
            info: info,
            success: true,
        };
    } catch (err) {
        throw new Error(err);
    }
};

