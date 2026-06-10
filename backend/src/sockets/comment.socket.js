const {
  COMMENT_EVENTS,
} = require(
  "../constants/comment.constants"
);

let io = null;

const initializeCommentSocket = (
  socketIo
) => {
  io = socketIo;
};

const emitCommentCreated = (
  payload
) => {
  if (!io) return;

  io.emit(
    COMMENT_EVENTS.CREATED,
    payload
  );
};

const emitCommentDeleted = (
  payload
) => {
  if (!io) return;

  io.emit(
    COMMENT_EVENTS.DELETED,
    payload
  );
};

const emitReplyCreated = (
  payload
) => {
  if (!io) return;

  io.emit(
    COMMENT_EVENTS.REPLY_CREATED,
    payload
  );
};

module.exports = {
  initializeCommentSocket,

  emitCommentCreated,

  emitCommentDeleted,

  emitReplyCreated,
};