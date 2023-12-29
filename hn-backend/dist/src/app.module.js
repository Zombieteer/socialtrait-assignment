"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const schedule_1 = require("@nestjs/schedule");
const scripts_module_1 = require("./scripts/scripts.module");
const typeorm_1 = require("@nestjs/typeorm");
const posts_module_1 = require("./posts/posts.module");
const config_1 = require("./config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: config_1.default.databaseConnections.postgres.params.host,
                port: config_1.default.databaseConnections.postgres.params.port,
                username: config_1.default.databaseConnections.postgres.username,
                password: config_1.default.databaseConnections.postgres.password,
                database: config_1.default.databaseConnections.postgres.database,
                name: 'postgres',
                autoLoadEntities: true,
                synchronize: true,
                extra: {
                    trustServerCertificate: true,
                    Encrypt: true,
                    IntegratedSecurity: false,
                },
                entities: [],
            }),
            schedule_1.ScheduleModule.forRoot(),
            scripts_module_1.ScriptsModule,
            posts_module_1.PostsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map