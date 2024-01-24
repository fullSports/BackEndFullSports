import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/users/users.module";
import { ImageModule } from "./modules/image/image.module";
import { ProductModule } from "./modules/product/product.module";
import { ProviderModule } from "@providers/providers.module";
import { OderModule } from "./modules/order/order.module";
import { RecommendationModule } from "./modules/componentRecommendation/recommendation.module";
import { AuthModule } from "./modules/auth/auth.module";
import { JwtInjectionMiddleware } from "./modules/auth/jwt-injection.middleware";
let MongoUrl = "";
if (process.env.ENV_AMB === "PROD") MongoUrl = process.env.mongoPROD;
else if (process.env.ENV_AMB === "QA") MongoUrl = process.env.mongoQA;
else MongoUrl = process.env.DBAAS_MONGODB_ENDPOINT;
@Module({
  imports: [
    MongooseModule.forRoot(MongoUrl),
    UserModule,
    ImageModule,
    ProductModule,
    ProviderModule,
    OderModule,
    RecommendationModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtInjectionMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
