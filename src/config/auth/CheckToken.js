import jwt from "jsonwebtoken";
import {promisify} from "util";
import * as secrets from "../../config/constants/Secrets.js";
import * as httpStatus from "../../config/constants/HttpStatus.js";
import AuthException from "./AuthException.js";

const bearer = "Bearer ";

export default async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            throw new AuthException(httpStatus.UNAUTHORIZED, "Token not informed");
        }
        let accessToken = authorization;
        if (accessToken.startsWith(bearer)) {
            accessToken = accessToken.substring(bearer.length, accessToken.length);
        }
        const decoded = await promisify(jwt.verify)(accessToken, secrets.API_SECRET);
        req.authUser = decoded.authUser;
        return next();

    } catch (e) {
        // return res.status(e.status).json({status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR, message: e.message});

        status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR
            message: e.message
    }

}
