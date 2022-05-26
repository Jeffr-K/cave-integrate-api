
import { UserDeleteRequestAdapter } from "src/adapters/in/user.delete-request.adapter";
import { UserController } from "src/application/controllers/user/user.controller";
import { UserService } from "src/domain/user/services/user.service";


describe("UserController", () => {
  
  let userController: UserController;
  let userService: UserService
  
  beforeEach(() => {
    userService = new UserService();
    userController = new UserController();
  });

  describe("dropdownMembership()", () => {
    it("should return an user", async () => {
      const id = "wqwewqewqe"

      const result = {
        code: 204,
        message: 'true'
      }

      jest.spyOn(userService, 'deleteUser').mockImplementation(() => result);
      expect(await userController.delete(id)).toBe(result);
    });
  });
});