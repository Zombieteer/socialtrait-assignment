"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestServiceUtils = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
let RestServiceUtils = class RestServiceUtils {
    constructor() { }
    static async MakePostRequest(variables) {
        try {
            const Options = {
                method: 'POST',
                url: variables.url,
                headers: variables.headers
                    ? variables.headers
                    : { 'Content-Type': 'application/json' },
                data: variables.data,
                auth: variables?.auth
            };
            const response = await (0, axios_1.default)(Options);
            return response.data;
        }
        catch (error) {
            if (error?.response?.data)
                return error?.response?.data;
            else
                return error;
        }
    }
    static async MakeGetRequest(variables) {
        try {
            const url = new URL(variables.url);
            for (const key in variables.params) {
                if (variables.params.hasOwnProperty(key)) {
                    url.searchParams.append(key, variables.params[key]);
                }
            }
            const Options = {
                method: 'GET',
                url: url.toString(),
                headers: variables.headers
                    ? variables.headers
                    : { 'Content-Type': 'application/json' }
            };
            const response = await (0, axios_1.default)(Options);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
    static async MakePutRequest(variables) {
        try {
            const Options = {
                method: 'PUT',
                url: variables.url,
                headers: variables.headers
                    ? variables.headers
                    : { 'Content-Type': 'application/json' },
                data: variables.data,
            };
            const response = await (0, axios_1.default)(Options);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
};
exports.RestServiceUtils = RestServiceUtils;
exports.RestServiceUtils = RestServiceUtils = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RestServiceUtils);
//# sourceMappingURL=RestServiceUtils.js.map