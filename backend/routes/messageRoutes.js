const express = require('express');
const { saveMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/message', async (req, res) => {
  await saveMessage(req.body);
  res.status(200).send('Message saved');
});

module.exports = router;
