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
var PostsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
let PostsService = PostsService_1 = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
        this.logger = new common_1.Logger(PostsService_1.name);
    }
    createPosts(postsData) {
        try {
            const newPosts = this.postsRepository.create(postsData);
            const posts = this.postsRepository.save(newPosts);
            if (posts) {
                return {
                    message: 'Posts Added',
                    success: 1,
                };
            }
            else {
                return {
                    errorMessage: `Posts not Added`,
                    success: 0,
                };
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getPosts(data) {
        try {
            const p = data.page || 1;
            const limit = 30;
            const offset = (p - 1) * limit;
            const posts = await this.postsRepository.find({
                order: { createdAt: 'DESC' },
                take: limit,
                skip: offset,
            });
            if (posts) {
                return {
                    message: posts,
                    success: 1,
                };
            }
            else {
                return {
                    errorMessage: `Unable to get posts`,
                    success: 0,
                };
            }
        }
        catch (err) {
            throw err;
        }
    }
    findOne(id) {
        return `This action returns a #${id} post`;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = PostsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post, 'postgres')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map