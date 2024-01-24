import { WinstonModuleOptions, utilities } from "nest-winston";
import * as winston from "winston";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

export default {
  level: configService.get<string>("ENV_AMB") == "LOCAL" ? "debug" : "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike("backend-full-sports", {
          colors: true,
          prettyPrint: true,
        })
      ),
    }),
  ],
} as WinstonModuleOptions;
