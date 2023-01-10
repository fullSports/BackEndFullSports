import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from "./users.controller"
describe("UserController", () => {
    let userController: UserController;

    beforeEach(async () => {
        const user: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();
        userController = user.get<UserController>(UserController);
    });

    // describe("User Services", () => {
    //     it('• Deve execultar: (GET) /listar-clientes', async () => {
    //         expect(await userController.ListUsers()).toEqual(200)
    //         console.debug(userController.ListUsers())
    //     })
    // })
})