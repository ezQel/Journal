import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RevokedToken extends BaseEntity {
  @Column({ unique: true })
  jti: string;
}
