import { Model } from "mongoose";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { ImageDocument } from "./Schema/image.schema";

describe("ImageController", () => {
  let imageController: ImageController;
  let ImageServices: ImageService;
  let ImageModel: Model<ImageDocument>;
  beforeEach(() => {
    ImageServices = new ImageService(ImageModel);
    imageController = new ImageController(ImageServices);
  });

  it("");
});
