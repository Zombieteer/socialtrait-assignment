"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./src/config/constants");
const axios = require('axios');
const jsdom = require('jsdom');
handleCron();
async function handleCron() {
    try {
        let respData = await axios.get(constants_1.hnUrl);
        console.log(respData.data);
        return;
        const resp = extractDataFromHTML(respData);
        console.log(resp);
    }
    catch (err) {
        throw new Error('Error while calling Lets doc fetch token api --> ' + err.message);
    }
}
function extractDataFromHTML(htmlString) {
    const { document } = new jsdom.JSDOM(htmlString).window;
    console.log(document.body.innerHTML);
    const rows = document.querySelectorAll('.athing');
    const entries = [];
    rows.forEach((row) => {
        const entry = {
            rank: row.querySelector('.rank')?.innerHTML?.trim() || null,
            title: row.querySelector('.titleline a')?.innerHTML?.trim() || null,
            link: row.querySelector('.titleline a')?.href || null,
            site: row.querySelector('.sitestr')?.innerHTML?.trim() || null,
            hasUpvote: !!row.querySelector('.votelinks .votearrow[title="upvote"]'),
            points: null,
            author: null,
            time: null,
            comments: null,
        };
        const subtext = row.nextElementSibling?.querySelector('.subtext');
        if (subtext) {
            entry.points = subtext.querySelector('.score')?.innerHTML?.trim() || null;
            entry.author =
                subtext?.querySelector('.hnuser')?.innerHTML?.trim() || null;
            entry.time = subtext?.querySelector('.age a')?.innerHTML?.trim() || null;
            entry.comments =
                subtext?.querySelector('.subline a:last-child')?.innerHTML?.trim() ||
                    null;
        }
        entries.push(entry);
    });
    return entries;
}
//# sourceMappingURL=run.js.map