import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { JSDOM } from 'jsdom';
import { RestServiceUtils } from '../utils/RestServiceUtils';
import { PostsService } from 'src/posts/posts.service';
import { PostDTO } from 'src/posts/dto/post.dto';

type NewsEntry = {
  rank: string | null;
  title: string | null;
  link: string | null;
  site: string | null;
  hasUpvote: boolean;
  points: string | null;
  author: string | null;
  time: string | null;
  comments: string | null;
};

@Injectable()
export class ScrapHnService {
  private readonly logger = new Logger(ScrapHnService.name);
  constructor(private readonly postsService: PostsService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM, {
    name: 'getHNPosts',
  })
  async handleCron(): Promise<void> {
    const hnUrl = 'https://news.ycombinator.com/';
    try {
      let respData = await RestServiceUtils.MakeGetRequest({ url: hnUrl });
      const resp: NewsEntry[] = this.extractDataFromHTML(respData);
      const insertedResp = this.postsService.createPosts(resp as PostDTO[]);
      this.logger.debug(insertedResp, new Date());
    } catch (err) {
      throw new Error(
        'Error while calling Lets doc fetch token api --> ' + err.message,
      );
    }
  }

  extractDataFromHTML(htmlString: string): NewsEntry[] {
    const { document } = new JSDOM(htmlString).window;
    const rows = document.querySelectorAll('.athing');

    const entries: NewsEntry[] = [];

    rows.forEach((row) => {
      const entry: NewsEntry = {
        rank:
          (row.querySelector('.rank') as HTMLElement)?.innerHTML.trim() || null,
        title:
          (
            row.querySelector('.titleline a') as HTMLElement
          )?.innerHTML.trim() || null,
        link:
          (row.querySelector('.titleline a') as HTMLAnchorElement)?.href ||
          null,
        site:
          (row.querySelector('.sitestr') as HTMLElement)?.innerHTML.trim() ||
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
          (subtext.querySelector('.score') as HTMLElement)?.innerHTML.trim() ||
          null;
        entry.author =
          (subtext.querySelector('.hnuser') as HTMLElement)?.innerHTML.trim() ||
          null;
        entry.time =
          (subtext.querySelector('.age a') as HTMLElement)?.innerHTML.trim() ||
          null;

        const commentLink = Array.from(subtext.querySelectorAll('a')).find(
          (a) => {
            const text = a.textContent.trim();
            return text.includes('comment') || text.includes('discuss');
          },
        );

        entry.comments = commentLink ? commentLink.textContent.trim() : null;
      }

      entries.push(entry);
    });

    return entries;
  }
}
