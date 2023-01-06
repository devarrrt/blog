import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidation, loginValidation } from './validations/auth.js';
import { postCreateValidation } from './validations/post.js';
import handleValidationErrors from './utils/handleValidationErrors';

import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect(
    'mongodb+srv://devarrrt:wwwwww@cluster0.hq2cl7j.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log(err, 'err'));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

///auth
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

//posts
app.get('/posts', PostController.getPosts);
app.get('/posts/:id', PostController.getPost);
app.post(
  '/posts/create',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create,
);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);
app.delete('/posts/:id', checkAuth, PostController.remove);

//upload
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('server plows');
});

///npm run start:dev
//devarrrt-login  wwwwww-pas

//mongodb+srv://devarrrt:wwwwww@blogcluster.cnccrwn.mongodb.net/?retryWrites=true&w=majority
