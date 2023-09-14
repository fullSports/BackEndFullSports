import { JwtModuleOptions } from "@nestjs/jwt";
export const jwtConfig: JwtModuleOptions = {
  secret: "teste", // Defina sua própria chave secreta
  signOptions: { expiresIn: "3min" }, // Define a expiração do token JWT
};
