import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/Model';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        console.log("sending email", email, emailType, userId)
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            console.log("verifying and saving the token")
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 360000



                // $set:{
                //     verifyToken: hashedToken,
                //     verifyTokenExpiry: new Date(Date.now() + 360000)
                // }
            })
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 360000

                // $set:{
                //     forgotPasswordToken: hashedToken,
                //     forgotPasswordTokenExpiry: new Date(Date.now() + 360000)
                // }
            })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "332d83382a9199",
                pass: "b43b6459615d59"
            }
        });
        const mailOptions = {
            from: "mukund@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> ${emailType = "VERIFY" ? "Verify your email" : "Reset your password"}
            or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const info = await transport.sendMail(mailOptions)
        return info;
    } catch (error) {

    }
}