import * as path from "path";
import * as fs from "fs";
export class Mocks {
  component_recommendation(): JSON {
    const filePath: string = path.resolve(
      "",
      "src/mocks/component_recommendation.mock.json"
    );
    const file: string = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  }
}
