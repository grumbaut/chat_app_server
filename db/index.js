const conn = require('./conn');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  conn,
  models: {
    Conversation,
    User,
    Message
  }
};
