import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "@users/users.module";
import { ImageModule } from "@image/image.module";
import { ProductModule } from "@product/product.module";
import { ProviderModule } from "@providers/providers.module";
import { OderModule } from "@order/order.module";
import { RecommendationModule } from "@componentRecommendation/recommendation.module";
import { AuthModule } from "@auth/auth.module";
import { JwtInjectionMiddleware } from "@auth/jwt-injection.middleware";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import winstonConfig from "@configs/winston.config";
import { envseEnum } from "@enums/envs.enum";
import { configService } from "@configs/configService";
const envAmb = configService.get<string>("ENV_AMB");
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    WinstonModule.forRoot(winstonConfig),
    MongooseModule.forRoot(envseEnum[envAmb]),
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
