import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProviderController } from "./providers.controller";
import { ProviderService } from "./providers.service";
import { Provider, ProviderSchema } from "./Schema/providers.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService, MongooseModule],
})
export class ProviderModule {}
