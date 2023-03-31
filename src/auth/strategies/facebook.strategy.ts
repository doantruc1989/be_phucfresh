import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID || '610174907344683',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '4e0c395155167fb81b8f5271654c6204',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'https://fephucfresh.quocson.site/auth/facebook/redirect',
      scope: "email",
      profileFields: ["emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    // const payload = {
    //   user,
    //   accessToken,
    // };

    done(null, user);
  }
}