import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStuct } from './jwt.struct';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   
  constructor(private readonly configService: ConfigService) {      
    const secret =configService.get<string>('JWT_SECRET');  
    if(!secret){
      throw new Error('SECRET NOT FOUND')
    }
    super({
   
       jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['access_token'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }
  async validate(payload: JwtStuct) {
    return { userId: payload.userId, email: payload.email };
  }
 
}