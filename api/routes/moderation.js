import express from "express";

const routerModeration = express.Router();

import { authAdmin } from "../middleware/auth.js";
import {
  fetchAllReports,
  treatedReport,
  bannishUser,
} from "../controlers/moderation.js";

routerModeration.post("/fetchAllReports", authAdmin, fetchAllReports);
routerModeration.put("/treateReport", authAdmin, treatedReport);
routerModeration.put("/bannishUser", authAdmin, bannishUser);

export default routerModeration;
