import PostModel from '../models/Post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author').exec();
    res.json(posts);
  } catch (err) {
    res.status(404).json({
      message: 'Failed to load posts. Try again',
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err, 'err');
          return res.status(404).json({
            message: 'Failed to load post. Try again',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }
        res.json(doc);
      },
    );
  } catch (err) {
    res.status(404).json({
      message: 'Failed to load post. Try again',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err, 'err');
    res.status(404).json({
      message: 'Failed to create post. Try again',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        author: req.userId,
      },
    );
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(404).json({
      message: 'Failed to update article',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(404).json({
            message: 'Failed to delete post',
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Post not found',
          });
        }
        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    res.status(404).json({
      message: 'Failed to delete post',
    });
  }
};
