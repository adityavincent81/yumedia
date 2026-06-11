const StoryView = require(
  "../models/StoryView"
);

/**
 * CRUD
 */

const create = (
  data
) => {
  return StoryView.create(
    data
  );
};

const findById = (
  id
) => {
  return StoryView.findById(
    id
  );
};

/**
 * Viewer Checks
 */

const existsViewer =
  (
    storyId,
    viewerId
  ) => {
    return StoryView.exists(
      {
        story: storyId,

        viewer:
          viewerId,
      }
    );
  };

const findByStoryAndViewer =
  (
    storyId,
    viewerId
  ) => {
    return StoryView.findOne(
      {
        story: storyId,

        viewer:
          viewerId,
      }
    );
  };

/**
 * Story Viewers
 */

const findViewersByStory =
  (
    storyId,
    {
      page = 1,
      limit = 50,
    } = {}
  ) => {
    const skip =
      (page - 1) *
      limit;

    return StoryView.find({
      story: storyId,
    })
      .populate(
        "viewer",
        `
          username
          fullName
          avatar
          isVerified
        `
      )
      .sort({
        viewedAt: -1,
      })
      .skip(skip)
      .limit(limit);
  };

const countByStory =
  (
    storyId
  ) => {
    return StoryView.countDocuments(
      {
        story: storyId,
      }
    );
  };

/**
 * User Seen Stories
 */

const findViewedStoriesByUser =
  (
    viewerId
  ) => {
    return StoryView.find({
      viewer:
        viewerId,
    }).select("story");
  };

const findViewedStoryIdsByUser =
  async (
    viewerId
  ) => {
    const views =
      await StoryView.find(
        {
          viewer:
            viewerId,
        }
      ).select("story");

    return views.map(
      (view) =>
        view.story.toString()
    );
  };

/**
 * Cleanup
 */

const deleteManyByStory =
  (
    storyId
  ) => {
    return StoryView.deleteMany(
      {
        story: storyId,
      }
    );
  };

module.exports = {
  create,

  findById,

  existsViewer,

  findByStoryAndViewer,

  findViewersByStory,

  countByStory,

  findViewedStoriesByUser,

  findViewedStoryIdsByUser,

  deleteManyByStory,
};