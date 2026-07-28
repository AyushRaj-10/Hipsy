import * as authService from "../services/auth.service.js";

import { success } from "../utils/response.js";

export const register = async (req, res, next) => {

  try {

    const result = await authService.register(req.body);

    return success(
      res,
      "User registered successfully",
      result,
      201
    );

  } catch (err) {

    next(err);

  }

};

export const login = async (req, res, next) => {

  try {

    const result = await authService.login(req.body);

    return success(
      res,
      "Login successful",
      result
    );

  } catch (err) {

    next(err);

  }

};