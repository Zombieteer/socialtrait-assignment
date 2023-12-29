"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const credentials_1 = require("./config/credentials");
const env = process.env.NODE_ENV || 'local';
console.log(env);
const config = credentials_1.credentials;
exports.default = config[env];
//# sourceMappingURL=config.js.map