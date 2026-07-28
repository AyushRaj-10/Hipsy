import User from "../models/User.js";

export const findByEmail = async (email) => {
  return User.findOne({ email });
};

export const findById = async (id) => {
  return User.findById(id);
};

export const createUser = async (data) => {
  return User.create(data);
};