import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./users/users.module";
import { ImageModule } from "./image/image.module";
import { ProductModule } from "./product/product.module";
import { ProviderModule } from "./providers/providers.module";
import { OderModule } from "./order/order.module";
import { RecommendationModule } from "./componentRecommendation /recommendation.module";
import { AuthModule } from "./auth/auth.module";
import { JwtInjectionMiddleware } from "./auth/jwt-injection.middleware";
let MongoUrl = "";
if (process.env.ENV_AMB === "PROD") MongoUrl = process.env.mongoPROD;
else if (process.env.ENV_AMB === "QA") MongoUrl = process.env.mongoQA;
else MongoUrl = null;
@Module({
  imports: [
    MongooseModule.forRoot(MongoUrl),
    CacheModule.register({
      ttl: 900000,
      isGlobal: true,
    }),
    UserModule,
    ImageModule,
    ProductModule,
    ProviderModule,
    OderModule,
    RecommendationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtInjectionMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
