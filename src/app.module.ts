import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./users/users.module";
var MongoUrl = "";
if (process.env.ENV_AMB === "PROD") MongoUrl = process.env.mongoPROD;
else if (process.env.ENV_AMB === "QA") MongoUrl = process.env.mongoQA;
else MongoUrl = null;
@Module({
  imports: [MongooseModule.forRoot(MongoUrl), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
