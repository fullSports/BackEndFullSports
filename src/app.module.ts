import { Logger, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./users/users.module";
import { ImageModule } from "./image/image.module";
import { ProductModule } from "./product/product.module";
import { ProviderModule } from "./providers/providers.module";
import { OderModule } from "./order/order.module";
var MongoUrl = "";
if (process.env.ENV_AMB === "PROD") MongoUrl = process.env.mongoPROD;
else if (process.env.ENV_AMB === "QA") MongoUrl = process.env.mongoQA;
else MongoUrl = null;
@Module({
  imports: [
    MongooseModule.forRoot(MongoUrl),
    UserModule,
    ImageModule,
    ProductModule,
    ProviderModule,
    OderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
