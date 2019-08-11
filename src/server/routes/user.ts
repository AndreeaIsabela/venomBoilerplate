import { Router } from "express";

import { UserController } from "../controllers/user";
import { UserModel } from "../models/user";
const userRoutes = Router();

const jwtService = require('../middleware/authenticationMiddleware');

// injecting the user model in the controller instance
const userController = new UserController(UserModel);

userRoutes.post('/register', async (req, res) => {
  try {
    const verifyUser = await userController.getUserByEmail(req.body.email)
    if (verifyUser) {
      return res.status(401).end();
    }
    const user = await userController.addUser(req.body);
    res.json(user);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
});

userRoutes.post('/login', async (req, res) => {
  try {
    const user = await userController.getUserByEmail(req.body.email);

    if (user.comparePassword(req.body.password) === true) {
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: userController.jwtSignUser(userJson)
      });
      return res.status(200).end();
    }
    return res.status(401).end();
  }
  catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

userRoutes.get('/', jwtService.userAuthentication, async (req, res) => {
  try {
    const users = await userController.getUsers();
    res.json(users);
  } catch (err) {
    return res.status(500).end();
  }
});

userRoutes.get('/:id', jwtService.userAuthentication, async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    res.json(user);
  }
  catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

export default userRoutes;