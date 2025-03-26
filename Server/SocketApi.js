module.exports = (io) => {
  const roomUsers = []; // Array to store room and user email mapping
  const roomSpeeds = []; 
  let OnlineRooms = {};

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // // Handle room creation
    // socket.on("create-room", (data) => {
    //   const { roomCode, email } = data;
    //   socket.join(roomCode);
    //   roomUsers.push({ roomCode, email, socketId: socket.id });
    //   console.log(`Room created: ${roomCode} by ${email}`, "Room Size: ",roomCode.size);
    // });
    // // Handle joining a room
    // socket.on("join-room", (data, callback) => {
    //   const { roomCode, email } = data;
    //   const room = io.sockets.adapOnlineRooms.get(roomCode);
    //   if (room && room.size < 2) {
    //     socket.join(roomCode);
    //     roomUsers.push({ roomCode, email, socketId: socket.id });
    //     console.log(`User ${email} joined room: ${roomCode}`, "Room Size: ", room.size);

    //     callback({ status: "ok" });
    //   } else {
    //     callback({ status: "error", message: "Room is full or doesn't exist" });
    //   }
    // });

    // // Handle typing updates
    // socket.on("typing-update", (data) => {
    //   const { room, email, speed } = data;
  
    //   // Find all users in the room whose roomCode matches
    //   const usersInRoom = roomUsers.filter(user => user.roomCode === room);
    //   console.log("Speed Update ", speed);
    //   // Emit typing-update to each user in the room
    //   usersInRoom.forEach(user => {
    //       if (user.email !== email) { // Don't send to the sender
    //           io.emit("typing-update", { room, opponentEmail:user.email, opponentSpeed:speed });
    //       }
    //   });
    // });  







       // Handle room creation
       socket.on("create-room", (data) => {
        const { roomCode, email,username } = data;
        socket.join(roomCode);
    
        // Ensure no duplicate entries
        const existingUser = roomSpeeds.find(
            (user) => user.roomCode === roomCode && user.email === email
        );
        if (!existingUser) {
            roomUsers.push({ roomCode, email, socketId: socket.id });
            roomSpeeds.push({
                roomCode,
                email,
                username,
                socketId: socket.id,
                initialSpeed: 0,
            });
        }
    
        const room = io.sockets.adapter.rooms.get(roomCode);
        console.log(`Room created: ${roomCode} by ${email}, Room Size: `, room ? room.size : 0);
        // console.log("Current roomSpeeds after create-room:", roomSpeeds);
    });
    
  
      // Handle joining a room
      socket.on("join-room", (data, callback) => {
        const { roomCode, email,username } = data;
        const room = io.sockets.adapter.rooms.get(roomCode);
    
        console.log("Checking room: ", roomCode, "room: ", room);
    
        if (room) { // Room exists and has space
            socket.join(roomCode);
    
            // Add user to roomUsers
            roomUsers.push({ roomCode, email, socketId: socket.id });
    
            // Check if user already exists in roomSpeeds
            const existingUser = roomSpeeds.find(
                (user) => user.roomCode === roomCode && user.email === email
            );
    
            if (!existingUser) {
                roomSpeeds.push({
                    roomCode,
                    email,
                    username,
                    socketId: socket.id,
                    initialSpeed: 0,
                });
            }
    
             console.log("Current roomSpeeds after join-room:", roomSpeeds);
            // console.log("Current roomUsers after join-room:", roomUsers);
            callback({ status: "ok" });
        } else {
            callback({
                status: "error",
                message: room ? "Room is full" : "Room doesn't exist",
            });
        }
    });
    
    
  
      // Handle typing updates (speed updates)
      socket.on("typing-update", (data) => {
        const { room, email, speed } = data;
  
        // Find the user in roomSpeeds and update their speed
        const user = roomSpeeds.find((user) => user.roomCode === room && user.email === email);
        if (user) {
          user.initialSpeed = speed; // Update the user's speed
        }
        console.log("Current roomSpeeds after TYPING-UPDATE:", roomSpeeds);

        // Filter the users in the room and create an updated leaderboard
        const leaderboard = roomSpeeds
          .filter((user) => user.roomCode === room) // Filter users by room
          .map(({ email,username, initialSpeed }) => ({ email,username, initialSpeed })) // Get email and speed
          .sort((a, b) => b.initialSpeed - a.initialSpeed); // Sort by speed in descending order
         
          console.log("Yup Updated! ",leaderboard);
        // Emit the updated leaderboard to all users in the room
        io.emit("leaderboard-update", {leaderboard,room});
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





    // Random Online play Logic 

    socket.on('play-random', (data) => {
      // Find the first room with space available (less than 2 players)
      console.log("i am from play-random ", data);
      const {_, userEmail} = data;
      let roomId = null;
      for (let room in OnlineRooms) {
          if (OnlineRooms[room].users.length < 2) {
              roomId = room; 
              break;
          }
      }

      // If no room has space, create a new room
      if (!roomId) {
          roomId = `room${Object.keys(OnlineRooms).length + 1}`;  // Create a new room with a unique ID
          OnlineRooms[roomId] = { users: [], gameStarted: false };
      }

      // Add the user to the room
      OnlineRooms[roomId].users.push(userEmail);
      socket.join(roomId);
      console.log(`${userEmail} joined room: ${roomId}`);

      // Notify all users in the room about the new player
      io.to(roomId).emit('userJoined', { userEmail: userEmail, users: OnlineRooms[roomId].users });
      
      console.log("Room Length: ",OnlineRooms[roomId].users.length, "Total Rooms :",OnlineRooms);
      // If the room reaches 2 players, start the game
      if (OnlineRooms[roomId].users.length === 2 && !OnlineRooms[roomId].gameStarted) {
          console.log("hello siri");
          io.to(roomId).emit('startGame');
          OnlineRooms[roomId].gameStarted = true;

          // Schedule room deletion after 1 minute
          setTimeout(() => {
              console.log(`Deleting room: ${roomId} after 1 minute`);
              delete OnlineRooms[roomId];
              io.to(roomId).emit('roomDeleted', { roomId });
          }, 60000); // 60000 milliseconds = 1 minute
      }
      // If there are less than 2 users, notify the room that they are waiting
      if (OnlineRooms[roomId].users.length < 2) {
          io.to(roomId).emit('waitingForPlayers', { users: OnlineRooms[roomId].users });
      }

  });

  socket.on('wpmUpdate', (data) => {
    const {userEmail, _, wpm } = data;
    
    let roomId = null;
    for (const room in OnlineRooms) {
        if (OnlineRooms[room].users.includes(userEmail)) {
            roomId = room;
        }
    }

    if (roomId) {
        console.log(`Updating WPM for user ${userEmail} in room ${roomId}: ${wpm}`);
        io.to(roomId).emit('receiveWpm', { userEmail, opp_wpm: wpm });
    } else {
        console.error(`Room not found for user ${userEmail}`);
    }

  });

  });
};