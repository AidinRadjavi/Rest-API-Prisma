"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
//---------------------------------------------------------------------------------------------------------------------------------------
// validate request
const validateRequest = (req, res, next) => {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        });
        return;
    }
    next();
};
//---------------------------------------------------------------------------------------------------------------------------------------
exports.default = validateRequest;
