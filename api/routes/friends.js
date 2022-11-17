import express from "express";

const routerFriends = express.Router();

import { auth } from "../middleware/auth.js";
import {
  requestFriend,
  fetchAll,
  removeFriend,
  confirmFriend,
} from "../controlers/friends.js";

routerFriends.post("/fetchAll", auth, fetchAll);
routerFriends.post("/add", auth, requestFriend);
routerFriends.post("/confirm", auth, confirmFriend);
routerFriends.delete("/remove/:id", auth, removeFriend);

export default routerFriends;
