import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();
export enum envseEnum {
  PROD = configService.get("mongoPROD"),
  QA = configService.get("mongoQA"),
  LOCAL = configService.get("DBAAS_MONGODB_ENDPOINT"),
}
