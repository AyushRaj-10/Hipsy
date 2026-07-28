import {
  createUser,
  findByEmail
} from "../repositories/user.repository.js";

import {
  hashPassword,
  comparePassword
} from "../utils/bcrypt.js";

import { generateToken } from "../utils/jwt.js";

export const register = async (data) => {

  const exists = await findByEmail(data.email);

  if (exists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    ...data,
    password: hashedPassword
  });

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    user,
    token
  };

};

export const login = async (data) => {

  const user = await findByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await comparePassword(
    data.password,
    user.password
  );

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    user,
    token
  };

};