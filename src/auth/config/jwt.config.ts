import { JwtModuleOptions } from '@nestjs/jwt';
export const jwtConfig: JwtModuleOptions = {
    secret: 'SUA_CHAVE_SECRETA', // Defina sua própria chave secreta
    signOptions: { expiresIn: '1h' }, // Define a expiração do token JWT
};