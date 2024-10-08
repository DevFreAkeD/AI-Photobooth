import { body, check } from 'express-validator';
import { resultChecker } from './validationResult.js';
import APIError, { HttpStatusCode } from '../exception/errorHandler.js';
import { isString } from './commonValidations.js';

// Interface Imports
// Not needed in JavaScript

//#region Test Validation
export const testCustomValidation = async (req, res, next) => {
	try {
		// Destructure Request
		const { testVariable1 } = req.body;

		// Result Checker
		let errors = resultChecker(req, res);

		// Check Custom Validation
		if (errors.length === 0) {
			// Test Variable Empty String Check
			errors = isString(testVariable1, 'Test Variable 1', errors, false);

			// No Error
			if (errors.length === 0) {
				next();
			}
			// Error Found
			else {
				return res.status(HttpStatusCode.BAD_INPUT).json({ errors: errors });
			}
		}
		// Express Validator Errors
		else {
			return res.status(HttpStatusCode.BAD_INPUT).json({ errors: errors });
		}
	} catch (err) {
		return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: [{ msg: err.message }] });
	}
};

//#region Student Overall Fields
export const testVariableFields = [check('testVariable1', 'Test Variable 1 Is Required').exists()];