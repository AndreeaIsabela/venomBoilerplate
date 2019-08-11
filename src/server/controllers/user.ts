import * as jwt from "jsonwebtoken";
import { Mongoose } from "mongoose";

import { IUser } from "../types/IUser"
import { config } from "../config/config";

export class UserController {
  userModel: any;

  constructor(userModel) {
    this.userModel = userModel;
  }

  jwtSignUser(user: IUser) {
    const ONE_WEEK: number = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    });
  }

  async addUser(user: IUser): Promise<IUser> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async getUserById(id:string): Promise<IUser>{
    return await this.userModel.findById(id);
  }

  async getUserByEmail(email:string) {
    return await this.userModel.findOne({email: email});
  }

}
