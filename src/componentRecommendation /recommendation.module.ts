import { Module } from "@nestjs/common";
import { RrecommendationController } from "./recommendation.controller";
import { RrecommendationService } from "./recommendation.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Recommendation, RrecommendationSchema } from "./Schema/Rrecommendation.schema";
import { UserSchema, Users } from "src/users/Schema/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Recommendation.name, schema: RrecommendationSchema }]),
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    ],
    controllers: [RrecommendationController],
    providers: [RrecommendationService]
})
export class RecommendationModule { }