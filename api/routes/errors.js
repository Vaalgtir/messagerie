import express from "express";

const routerErrors = express.Router();

import { authAdmin } from "../middleware/auth.js";
import { fetchAll } from "../controlers/errors.js";

routerErrors.post("/fetchAll", authAdmin, fetchAll);

export default routerErrors;
