const {
  MESSAGE_EVENTS,
} = require(
  "../constants/message.constants"
);

let io = null;

const initializeMessageSocket =
  (
    socketIo
  ) => {
    io = socketIo;
  };

const emitNewMessage =
  (
    payload
  ) => {
    if (!io) return;

    io.emit(
      MESSAGE_EVENTS.NEW_MESSAGE,
      payload
    );
  };

const emitMessageRead =
  (
    payload
  ) => {
    if (!io) return;

    io.emit(
      MESSAGE_EVENTS.MESSAGE_READ,
      payload
    );
  };

const emitTyping =
  (
    payload
  ) => {
    if (!io) return;

    io.emit(
      MESSAGE_EVENTS.TYPING,
      payload
    );
  };

const emitConversationUpdated =
  (
    payload
  ) => {
    if (!io) return;

    io.emit(
      MESSAGE_EVENTS.CONVERSATION_UPDATED,
      payload
    );
  };

module.exports = {
  initializeMessageSocket,

  emitNewMessage,

  emitMessageRead,

  emitTyping,

  emitConversationUpdated,
};