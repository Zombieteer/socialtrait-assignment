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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const post_dto_1 = require("./posts/dto/post.dto");
const posts_service_1 = require("./posts/posts.service");
let AppController = class AppController {
    constructor(appService, postsService) {
        this.appService = appService;
        this.postsService = postsService;
    }
    async getPosts(res, query) {
        try {
            const data = await this.postsService.getPosts(query);
            return res.status(200).json(data);
        }
        catch (error) {
            const data = {
                errorMessage: 'Error with create posts -> ' + error.message,
                success: 0,
            };
            console.log(data);
            return res.status(500).json(data);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_dto_1.GetPostsDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPosts", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        posts_service_1.PostsService])
], AppController);
//# sourceMappingURL=app.controller.js.map