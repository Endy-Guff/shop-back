import nodemailer from "nodemailer";

class MailService {
    transporter
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'endy_guff@mail.ru',
                pass: 'jZgvzh8i069tmbP8tbq' // g
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: 'vk-breaker <endy_guff@mail.ru>', // sender address
            to, // list of receivers
            subject: "Активация аккаунта на" + process.env.API_URL, // Subject line
            text: '',
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке ниже</h1>
                    <a href='${link}'>${link}</a>
                </div>
            `
        })
    }
}

export default new MailService()