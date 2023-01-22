import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const router = express.Router();

function generateToken(email: string) {
  const token = JWT.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: 360000,
  });

  return token;
}

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").isLength({ min: 5 }).withMessage("The password is invalid"),
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((e) => {
        return { msg: e.msg };
      });

      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.send({
        errors: [
          {
            msg: "Email already in use",
          },
        ],
        data: null,
      });
    } else {
      const saltRounds = 10;

      const hashed_process = bcrypt.hashSync(password, saltRounds);

      const token = generateToken(email);

      const createUser = await User.create({
        email,
        password: hashed_process,
      });

      return res.status(200).json({
        success: [
          {
            user: {
              email: createUser.email,
              id: createUser._id,
            },
            token,
          },
        ],
      });
    }
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const findUser: any = await User.findOne({ email });

  if (findUser !== null) {
    const checkPass = await bcrypt.compare(password, findUser.password ?? null);

    if (checkPass) {
      const token = generateToken(email);

      res.status(200).json({
        user: {
          email: findUser.email,
          id: findUser._id,
        },
        token,
        errors: []
      });
    } else {
      res.json({
        errors: [
          {
            msg: "invalid credentials",
          }
        ]
      });
    }

  } else {
    res.json({
      errors: [
        {
        msg: "User with that email not found!",
      }
      ]
    });
  }
});

// multiple route
export default router;
