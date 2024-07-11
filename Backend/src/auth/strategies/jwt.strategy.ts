import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '9f86d081884c7d659a2feaa0c55ad015',
    });
  }

  async validate(payload: any) {
    const tokenIsInvalid = await this.authService.findRevokedToken(payload.jti);

    if (tokenIsInvalid) {
      throw new UnauthorizedException();
    }

    return { id: payload.sub, username: payload.username, jti: payload.jti };
  }
}
