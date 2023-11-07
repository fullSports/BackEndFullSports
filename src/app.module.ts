import {
  CacheModule,
  Module,
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./users/users.module";
import { ImageModule } from "./image/image.module";
import { ProductModule } from "./product/product.module";
import { ProviderModule } from "./providers/providers.module";
import { OderModule } from "./order/order.module";
import { RecommendationModule } from "./componentRecommendation/recommendation.module";
import { AuthModule } from "./auth/auth.module";
import { QueueModule } from "./queues/queue.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
let MongoUrl = "";
if (process.env.ENV_AMB === "PROD") MongoUrl = process.env.mongoPROD;
else if (process.env.ENV_AMB === "QA") MongoUrl = process.env.mongoQA;
else MongoUrl = null;
@Module({
  imports: [
    MongooseModule.forRoot(MongoUrl),
    CacheModule.register({
      ttl: 999999,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({ global: true }),
    UserModule,
    ImageModule,
    ProductModule,
    ProviderModule,
    OderModule,
    RecommendationModule,
    AuthModule,
    QueueModule,
  ],
})
export class AppModule {
}
