module.exports = (io) => {
  const roomUsers = []; // Array to store room and user email mapping

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Handle room creation
    socket.on("create-room", (data) => {
      const { roomCode, email } = data;
      socket.join(roomCode);
      roomUsers.push({ roomCode, email, socketId: socket.id });
      console.log(`Room created: ${roomCode} by ${email}`, "Room Size: ",roomCode.size);
    });

    // Handle joining a room
    socket.on("join-room", (data, callback) => {
      const { roomCode, email } = data;
      const room = io.sockets.adapter.rooms.get(roomCode);

      if (room && room.size < 2) {
        socket.join(roomCode);
        roomUsers.push({ roomCode, email, socketId: socket.id });
        console.log(`User ${email} joined room: ${roomCode}`, "Room Size: ", room.size);

        callback({ status: "ok" });
      } else {
        callback({ status: "error", message: "Room is full or doesn't exist" });
      }
    });

    // Handle typing updates
    socket.on("typing-update", (data) => {
      const { room, email, speed } = data;
  
      // Find all users in the room whose roomCode matches
      const usersInRoom = roomUsers.filter(user => user.roomCode === room);
      console.log("Speed Update ", speed);
      // Emit typing-update to each user in the room
      usersInRoom.forEach(user => {
          if (user.email !== email) { // Don't send to the sender
              io.emit("typing-update", { room, opponentEmail:user.email, opponentSpeed:speed });
          }
      });
    });  

    // Handle starting the game with email
    socket.on("start-game", (data) => {
      const { room, startTime, email } = data; // Capture the email of the user starting the game
      console.log(`Game started in room: ${room} by ${email}`);

      // Emit to all users except the current user, and include the email
      const usersInRoom = roomUsers.filter((user) => user.roomCode === room);
      usersInRoom.forEach((user) => {
        if (email !== user.email) {
          console.log("Sending start notif to ",user.email);
          io.emit("start-game", {
            room,
            startTime,
            email: user.email
          });
        }
      });
    });

    // Handle disconnects and cleanup
    socket.on("disconnect", () => {
      const index = roomUsers.findIndex((user) => user.socketId === socket.id);
      if (index !== -1) {
        console.log(`User ${roomUsers[index].email} disconnected from room: ${roomUsers[index].roomCode}`);
        roomUsers.splice(index, 1);
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
