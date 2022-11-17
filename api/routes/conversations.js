import express from "express";

const routerConversations = express.Router();

import { auth } from "../middleware/auth.js";
import {
  fetchAll,
  addMessage,
  create,
  reportMessage,
} from "../controlers/conversations.js";

routerConversations.post("/fetchAll", auth, fetchAll);
routerConversations.post("/create", auth, create);
routerConversations.post("/addMessage", auth, addMessage);
routerConversations.post("/reportMessage", auth, reportMessage);

export default routerConversations;
