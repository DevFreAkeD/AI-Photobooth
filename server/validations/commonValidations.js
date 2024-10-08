import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

//#region String Validation
export const isString = (value, variableName, errors, isEmpty) => {
    let responseArray = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    if (value !== undefined) {
        // Type Check
        if (typeof value !== 'string') {
            let errorObject = { msg: `${variableName} Must Be A String` };
            responseArray.push(errorObject);
        }

        // Empty Check
        if (!isEmpty) {
            if (value.length === 0) {
                let errorObject = { msg: `${variableName} Must Not Be Empty` };
                responseArray.push(errorObject);
            }
        }
    } else {
        let errorObject = {
            msg: `Please Provide Valid Value For ${variableName}`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Exist Validation
export const exists = (errors, inputField, msg) => {
    let responseArray = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    if (inputField === undefined) {
        let errorObject = {
            msg: msg,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Fixed Value Validation
export const fixedValue = (errors, valueArray, inputField, inputFieldName) => {
    let responseArray = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    let matched = false;

    for (let x of valueArray) {
        if (x === inputField) {
            matched = true;
            break;
        }
    }

    if (!matched) {
        let errorObject = {
            msg: `Value Of ${inputFieldName} Must Be One Of [${valueArray}]`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Number Value Validation
export const numberValue = (errors, value, variableName, minValue, maxValue) => {
    let responseArray = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    // Check Type Of Given Value
    if (typeof value !== 'number') {
        let errorObject = { msg: `${variableName} Is Not A Number` };
        responseArray.push(errorObject);
        return responseArray;
    }

    // Minimum Value Check
    if (minValue !== undefined && value < minValue) {
        let errorObject = {
            msg: `Minimum Value Of ${variableName} Must Be ${minValue}`,
        };
        responseArray.push(errorObject);
    }

    if (maxValue !== undefined && value > maxValue) {
        let errorObject = {
            msg: `Maximum Value Of ${variableName} Must Be ${maxValue}`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};
//#endregion

//#region Check Valid Mongoose Id
export const isValidMongooseId = (errors, inputField, inputFieldName) => {
    let responseArray = [];

    // Adding Old Errors
    if (errors.length !== 0) {
        for (let x of errors) {
            responseArray.push(x);
        }
    }

    // Check Valid Mongoose Id
    const isValid = mongoose.isValidObjectId(inputField);

    if (!isValid) {
        let errorObject = {
            msg: `${inputFieldName} Must Be A Valid Object Id`,
        };
        responseArray.push(errorObject);
    }

    return responseArray;
};