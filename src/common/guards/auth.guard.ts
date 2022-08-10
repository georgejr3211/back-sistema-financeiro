import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { MENSAGENS } from '../enums/mensagens';
import { verifyToken } from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    const { authorization } = request.headers;

    if (isPublic || Number(process.env.TOKEN) === 0) {
      return true;
    }

    if (!authorization) {
      throw new HttpException(MENSAGENS.TOKEN_NAO_ENCONTRADO, HttpStatus.BAD_REQUEST);
    }

    const usuario = verifyToken(authorization);
    request.usuario = usuario;

    return true;
  }
}
