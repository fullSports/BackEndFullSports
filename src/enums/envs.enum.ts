import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();
export const envseEnum = {
  PROD: configService.get<string>("mongoPROD"),
  QA: configService.get<string>("mongoQA"),
  LOCAL: configService.get<string>("DBAAS_MONGODB_ENDPOINT"),
};
