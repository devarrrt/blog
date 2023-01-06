import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Введите заголовок для статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст для статьи').isLength({ min: 5 }).isString(),
    body('tags', 'Неверный формат тега').optional().isString(),
    body('imageUrl', 'Не удается распознать ссылку на изображение').optional().isString(),
];
