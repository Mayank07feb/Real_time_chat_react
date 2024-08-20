const Message = require('../models/message');

const saveMessage = async (msg) => {
  try {
    const newMessage = new Message(msg);
    await newMessage.save();
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

module.exports = {
  saveMessage,
};
