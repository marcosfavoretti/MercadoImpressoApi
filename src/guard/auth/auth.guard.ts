import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { json } from 'body-parser';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token-auth/token-service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const tokenValid = this.tokenService.decodeToken(request.cookies.token);
      if (!tokenValid) throw new Error('Token nao foi decodificador')
      request.headers['user'] = JSON.stringify(tokenValid)
      return true
    }
    catch (err) {
      return false
    }
  }
}
