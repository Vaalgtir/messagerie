export const socketsError = [];

export const onConnection = (socket, io) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    socket.username === 1 &&
      socketsError.push({
        userID: id,
        username: socket.username,
        socket: socket,
      });
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  socket.broadcast.emit("users", users);

  socket.on("private message", ({ message, _id, to }) => {
    console.log({ message, _id, to });
    socket.to(to).emit("private message", {
      message,
      _id,
      from: socket.username,
    });
  });

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);

    socketsError.splice(0, socketsError.length);
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      socket.username === 1 &&
        socketsError.push({
          userID: id,
          username: socket.username,
          socket: socket,
        });
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    socket.emit("users", users);
    socket.broadcast.emit("users", users);
  });
};
