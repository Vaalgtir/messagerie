import { Error } from "../Mongo/Errors.js";
import { socketsError } from "../Websocket/handlerConnection.js";

export const errorManagement = (res, status, message) => {
  res.status(status).send({ message });

  socketsError.map((socketError) => {
    socketError.socket.emit("errors", {
      code: status,
      message: message,
    });
  });

  const error = new Error({
    code: status,
    message: message,
  });

  error.save().catch((err) => {
    console.log(err);
  });
};

export default { errorManagement };
