import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';

@Processor('send-mail')
export class EmailConsumer {
  // constructor(private mailerService: MailerService) {}

  @Process('register')
  async registerEmail(job: Job<unknown>) {
    const GOOGLE_MAILER_CLIENT_ID = '49503388661-df69vuns5r99pl1hlsn1k05gejck6gof.apps.googleusercontent.com'
    const GOOGLE_MAILER_CLIENT_SECRET = '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'
    const GOOGLE_MAILER_REFRESH_TOKEN = '1//04-HDTzoZNWvqCgYIARAAGAQSNwF-L9IrN1MnDuzhhenkDJIX-UTZcaL3IPXqOf5hUhkFhDCLrMbVuc-KliZGXeYkt1XOHjCbOP4'
    const ADMIN_EMAIL_ADDRESS = 'ma.quy1987@gmail.com'

    const myOAuth2Client = new OAuth2Client(
        GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET
    )
    myOAuth2Client.setCredentials({
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
    })

    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    const myAccessToken = myAccessTokenObject?.token
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
    })
    let mailOptions = {
        from: '"Company" <' + 'me' + '>',
        to: `${job.data['to']}`, // list of receivers (separated by ,)
        subject: 'Forgotten Password',
        text: 'Forgot Password',
        html: 'Hi! <br><br> If you requested to reset your password<br><br>' +
            `http://localhost:3000/login/reset-password/${job.data['id']}`
    };
    await transport.sendMail(mailOptions)
  }
}
