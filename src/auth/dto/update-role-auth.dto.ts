import { IsNotEmpty } from 'class-validator';
import { Role } from '../entities/role.enum';

export class UpdateRoleAuthDto {
  @IsNotEmpty()
  roles: Role[];

  @IsNotEmpty()
  _id: string;
}
