import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevokedToken } from '../entities/revoked-token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RevokedToken)
    private revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  revokeToken(jti: string): Promise<RevokedToken> {
    return this.revokedTokenRepository.save({ jti });
  }

  findRevokedToken(jti: string): Promise<RevokedToken> {
    return this.revokedTokenRepository.findOne({ where: { jti } });
  }
}
