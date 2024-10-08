import { validationResult } from 'express-validator';

//Result Checker
export const resultChecker = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.errors;
    }
    return [];
};