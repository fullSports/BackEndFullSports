import { JwtModuleOptions } from "@nestjs/jwt";
export const jwtConfig: JwtModuleOptions = {
  secret: String(process.env.clientSecret),
  signOptions: { expiresIn: "3min" },
};
