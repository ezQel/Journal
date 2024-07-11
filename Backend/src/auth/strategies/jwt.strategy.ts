import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '9f86d081884c7d659a2feaa0c55ad015',
    });
  }

  async validate(payload: any) {
    // TODO: Db lookup for revoked tokens
    return { id: payload.sub, username: payload.username };
  }
}
