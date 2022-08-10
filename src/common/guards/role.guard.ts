import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

import { MENSAGENS } from '../enums/mensagens';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly usuarioService?: UsuarioService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new HttpException(MENSAGENS.SEM_PERMISSAO, HttpStatus.FORBIDDEN);
    }

    // const result: any = await this.usuarioService.findProfilesByPersonId(user.personId);
    // const profiles = result.data;
    const profiles = [];

    return this.matchRoles(roles, profiles);
  }

  matchRoles(roles: string[], userRoles: any[]) {
    const found = userRoles.some(profile => roles.includes(profile.name));

    if (!found) {
      throw new HttpException(MENSAGENS.SEM_PERMISSAO, HttpStatus.FORBIDDEN);
    }

    return found;
  }
}
