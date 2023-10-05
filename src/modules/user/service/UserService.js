import UserRepository from "../repositories/UserRepository.js";
import * as httpStatus from '../../../config/constants/HttpStatus.js'
import UserException from "../exception/UserException.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as secrets from "../../../config/constants/Secrets.js";

class UserService {
    async findByEmail(req) {
        try {
            const {email} = req.params;
            this.validateRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            return {
                status: httpStatus.SUCCESS, user: {
                    id: user.id, name: user.name, email: user.email
                }
            }
        } catch (e) {
            return {
                status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: e.message

            }
        }
    }

    validateRequestData(email) {
        if (!email) {
            throw new UserException(httpStatus.BAD_REQUEST, "Email not informed")
        }
    }

    validateUserNotFound(user) {
        if (!user) {
            throw new UserException(httpStatus.BAD_REQUEST, "User not found")
        }
    }

    async getAccessToken(req) {
        try {
            const {email, password} = req.body;
            this.validadeAccessTokenData(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validateUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {id: user.id, name: user.name, email: user.email};
            const accessToken = jwt.sign(authUser, secrets.API_SECRET, {expiresIn: '1h'});
            return {
                status: httpStatus.SUCCESS,
                accessToken
            }
        } catch (e) {
            return {
                status: e.status ? e.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: e.message
            }

        }
    }

    validadeAccessTokenData(email, password) {
        if (!email || !password) {
            console.log('Email e pass', email, password)
            throw new UserException(httpStatus.BAD_REQUEST, "Email and password must be informed")
        }
    }


    async validatePassword(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Invalid password")
        }

    }
}

export default new UserService();