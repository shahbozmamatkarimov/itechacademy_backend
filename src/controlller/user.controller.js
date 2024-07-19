import User from "../models/user.model.js";
import handleError from "../utils/catchError.js";
import { JWT } from "../utils/jwt.js";
// import { sendConfirmationEmail } from "../../utils/nodemailer.js";

import crypto from "crypto";
class UserController {
  // Create a new user
  createUser = async (req, res) => {
    try {
      let { username, password } = req.body;
      const is_user = await User.findOne({ where: { username } });
      if (is_user) {
        return res.status(400).json({ error: "Such a username exists" });
      }

      // hash password
      const passwordHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const user = {
        username,
        password: passwordHash,
      };
      // create a new user
      const newUser = await User.create(user);
      res.status(201).send({
        success: true,
        data: newUser,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      // check user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        // not found
        res.status(404).json({ error: "User not found" });
        return;
      }
      // check password
      const passwordHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      if (user.password !== passwordHash) {
        // invalid password
        res.status(401).json({ error: "Invalid password" });
        return;
      }

      // Create a new JWT (token)
      const token = JWT.SIGN({ id: user.id });
      res.status(200).send({ succsess: true, token, data: user });
    } catch (error) {
      handleError(res, error);
    }
  };
  // Get all users
  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).send({
        success: true,
        data: users,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  // Get user by ID
  getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).send({
        succsess: true,
        data: user,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
  protectedRoute = async (req, res) => {
    try {
      let token = req.headers.authorization?.split(" ")[1];
      let { id } = JWT.VERIFY(token);
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).send({
        succsess: true,
        data: user,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}
export default new UserController();
