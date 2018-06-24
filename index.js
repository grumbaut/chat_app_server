const server = require('http').createServer().listen(3000);
const conn = require('./db').conn;
const io = require('socket.io')(server);
const { User, Conversation, Message } = require('./db').models;
const mobileSockets = {};

conn.sync({ logging: false, force: true });

io.on('connection', socket => {
  socket.on('newUser', credentials => {
    const { name, password } = credentials;
    Promise.all([
      User.findOrCreate({
        where: {
          name,
          password
        }
      }),
      User.findAll()
    ])
      .then(([user, users]) => {
        mobileSockets[user[0].id] = socket.id;
        socket.emit('userCreated', { user: user[0], users });
        socket.broadcast.emit('newUser', user[0]);
      });
  });

  socket.on('chat', users => {
    Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
      .then(conversation => socket.emit('priorMessages', conversation.messages));
  });

  socket.on('message', ({ text, sender, receiver }) => {
    Message.createMessage(text, sender, receiver)
      .then(message => {
        socket.emit('incomingMessage', message);
        const receiverSocketId = mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
  });
});


