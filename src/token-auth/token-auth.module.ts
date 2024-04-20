import { Module } from '@nestjs/common';
import { TokenService } from './token-service/token.service';

@Module({
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenAuthModule { }
