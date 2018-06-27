const conn = require('../conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {

});

Conversation.findOrCreateConversation = function(user1Id, user2Id) {
  return Conversation.find()
    .then(conversation => {
      if(conversation) {
        return conversation;
      } else {
        return Conversation.create({
          user1Id: user1Id,
          user2Id: user2Id
        }, {
          include: [ conn.models.message ],
          order: [[ conn.models.message, 'createdAt', 'DESC' ]]
        });
      }
    });
};

module.exports = Conversation;
