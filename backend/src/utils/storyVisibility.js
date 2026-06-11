const {
  STORY_VISIBILITY,
} = require(
  "../constants/story.constants"
);

const canViewStory =
  async (
    story,
    viewerId,
    followRepository
  ) => {
    const ownerId =
      story.author?._id
        ? story.author._id.toString()
        : story.author.toString();

    const currentUserId =
      viewerId.toString();

    /**
     * Owner always can view
     */
    if (
      ownerId ===
      currentUserId
    ) {
      return true;
    }

    switch (
      story.visibility
    ) {
      case STORY_VISIBILITY.ONLY_ME:
        return false;

      case STORY_VISIBILITY.FOLLOWERS: {
        return await followRepository.isMutualFollow(
          currentUserId,
          ownerId
        );
      }

      case STORY_VISIBILITY.FOLLOWERS_EXCEPT: {
        const isMutual =
          await followRepository.isMutualFollow(
            currentUserId,
            ownerId
          );

        if (!isMutual) {
          return false;
        }

        const excluded =
          (
            story.excludedUsers ||
            []
          ).some(
            (userId) =>
              userId.toString() ===
              currentUserId
          );

        return !excluded;
      }

      case STORY_VISIBILITY.ONLY_SHARE_WITH: {
        return (
          story.allowedUsers ||
          []
        ).some(
          (userId) =>
            userId.toString() ===
            currentUserId
        );
      }

      default:
        return false;
    }
  };

module.exports = {
  canViewStory,
};