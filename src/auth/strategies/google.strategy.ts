import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '49503388661-ld482tm57aobddqpdd2sa3k4s31ic4kp.apps.googleusercontent.com',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://fephucfresh.quocson.site/auth/redirect',
      scope: ['email', 'profile']
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken
    }
    done(null, user);
  }
}