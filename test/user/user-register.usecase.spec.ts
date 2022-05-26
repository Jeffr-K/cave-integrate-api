import { UserCreateRequestAdapter } from "src/adapters/in/user.create-request.adapter";
import { UserService } from "src/domain/user/services/user.service";
import { UserController } from "../user/user.controller"

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService
  
  beforeEach(() => {
    userService = new UserService();
    userController = new UserController();
  });

  describe("createUser()", () => {
    it("should return an user", async () => {
      const data: UserCreateRequestAdapter = {
        username: 'jefrrey',
        password: 'test',
        email: 'jeff.cofos@gmail.com',
        address: 'sadong, east incheon station, incheon, south korea, 10000',
        phone: '010-3123-2244',
        agreement: true
      };

      const result = {
        code: 204,
        message: 'true'
      }

      jest.spyOn(userService, 'createUser').mockImplementation(() => result);
      expect(await userController.create(data)).toBe(result);
    })
  })
})