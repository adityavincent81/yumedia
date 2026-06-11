const {
  initializeCommentSocket,
} = require(
  "./comment.socket"
);

const {
  initializeMessageSocket,
} = require(
  "./message.socket"
);

const initializeSockets =
  (io) => {
    initializeCommentSocket(
      io
    );

    initializeMessageSocket(
      io
    );
  };

module.exports = {
  initializeSockets,
};