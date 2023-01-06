import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5 }),
  body('fullName', 'Минимальная длина поля - 3 символа').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Минимальная длина пароля - 5 символов').isLength({ min: 5 }),
];
