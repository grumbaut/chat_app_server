const server = require('http').createServer().listen(3000);
const io = require('socket.io')(server);
const { User, Conversation, Message } = require('./db').models;
const mobileSockets = {};

io.on('connection', socket => {
  socket.on('newUser', name => {
    User.create({
      name
    })
      .then(user => {
        mobileSockets[user.id] = socket.id;
        socket.emit('userCreated', user);
        socket.broadcast.emit('newUser', user);
      });
  });

  socket.on('chat', ({ user1, user2 }) => {
    Conversation.findOrCreateConversation(user1.id, user2.id)
      .then(conversation => socket.emit('priorMessages', conversation.messages));
  });

  socket.on('message', (text, sender, receiverId) => {
    Message.createMessage(text, sender, receiverId)
      .then(message => {
        const receiverSocketId = mobileSockets[receiverId];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
  });
});


