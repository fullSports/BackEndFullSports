import { JwtModuleOptions } from '@nestjs/jwt';
export const jwtConfig: JwtModuleOptions = {
    secret: 'teste', // Defina sua própria chave secreta
    signOptions: { expiresIn: '2h' }, // Define a expiração do token JWT
};