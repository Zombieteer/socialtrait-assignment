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
var ScrapHnService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapHnService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const jsdom_1 = require("jsdom");
const RestServiceUtils_1 = require("../utils/RestServiceUtils");
const posts_service_1 = require("../posts/posts.service");
let ScrapHnService = ScrapHnService_1 = class ScrapHnService {
    constructor(postsService) {
        this.postsService = postsService;
        this.logger = new common_1.Logger(ScrapHnService_1.name);
    }
    async handleCron() {
        const hnUrl = 'https://news.ycombinator.com/';
        try {
            let respData = await RestServiceUtils_1.RestServiceUtils.MakeGetRequest({ url: hnUrl });
            const resp = this.extractDataFromHTML(respData);
            const insertedResp = this.postsService.createPosts(resp);
            this.logger.debug(insertedResp, new Date());
        }
        catch (err) {
            throw new Error('Error while calling Lets doc fetch token api --> ' + err.message);
        }
    }
    extractDataFromHTML(htmlString) {
        const { document } = new jsdom_1.JSDOM(htmlString).window;
        const rows = document.querySelectorAll('.athing');
        const entries = [];
        rows.forEach((row) => {
            const entry = {
                rank: row.querySelector('.rank')?.innerHTML.trim() || null,
                title: row.querySelector('.titleline a')?.innerHTML.trim() || null,
                link: row.querySelector('.titleline a')?.href ||
                    null,
                site: row.querySelector('.sitestr')?.innerHTML.trim() ||
                    null,
                hasUpvote: !!row.querySelector('.votelinks .votearrow[title="upvote"]'),
                points: null,
                author: null,
                time: null,
                comments: null,
            };
            const subtext = row.nextElementSibling?.querySelector('.subtext');
            if (subtext) {
                entry.points =
                    subtext.querySelector('.score')?.innerHTML.trim() ||
                        null;
                entry.author =
                    subtext.querySelector('.hnuser')?.innerHTML.trim() ||
                        null;
                entry.time =
                    subtext.querySelector('.age a')?.innerHTML.trim() ||
                        null;
                const commentLink = Array.from(subtext.querySelectorAll('a')).find((a) => {
                    const text = a.textContent.trim();
                    return text.includes('comment') || text.includes('discuss');
                });
                entry.comments = commentLink ? commentLink.textContent.trim() : null;
            }
            entries.push(entry);
        });
        return entries;
    }
};
exports.ScrapHnService = ScrapHnService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_10AM, {
        name: 'getHNPosts',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScrapHnService.prototype, "handleCron", null);
exports.ScrapHnService = ScrapHnService = ScrapHnService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], ScrapHnService);
//# sourceMappingURL=getHNPosts.service.js.map