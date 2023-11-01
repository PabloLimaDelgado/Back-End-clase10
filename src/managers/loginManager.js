import { loginModel } from "../db/models/login.model.js";

class LoginModel {
  async findById(id) {
    const response = await loginModel.findById(id);
    return response;
  }

  async findByEmail(email) {
    const response = await loginModel.findOne({ email });
    return response;
  }

  async createOne(obj) {
    const response = await loginModel.create(obj);
    return response;
  }
}

export const loginManager = new LoginModel();
