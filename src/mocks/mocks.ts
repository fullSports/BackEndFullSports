import * as path from "path";
import * as fs from "fs";
import { Recommendation } from "@componentRecommendation/Schema/Rrecommendation.schema";
import { Users } from "@users/Schema/user.schema";
export class Mocks {
  component_recommendation(): Recommendation[] {
    const filePath: string = path.resolve(
      "",
      "src/mocks/component_recommendation.mock.json"
    );
    const file: string = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  }
  users(): Users[] {
    const filePath: string = path.resolve("", "src/mocks/user.mock.json");
    const file: string = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  }
}
