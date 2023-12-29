import { hnUrl } from "src/config/constants";

const axios = require('axios');
const jsdom = require('jsdom');

handleCron();
async function handleCron() {
  try {
    //     const simpleHtmlString = `
    //     <html lang="en" op="news">
    //     <head>
    //     </head>
    //     <body>
    //         <center>
    //             <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
    //                 <tr>
    //                     <td>
    //                         <table border="0" cellpadding="0" cellspacing="0">
    //                             <tr class='athing' id='38792446'>
    //                                 <td align="right" valign="top" class="title">
    //                                     <span class="rank">1.</span>
    //                                 </td>
    //                                 <td valign="top" class="votelinks">
    //                                     <center>
    //                                         <a id='up_38792446' href='vote?id=38792446&amp;how=up&amp;goto=news'>
    //                                             <div class='votearrow' title='upvote'></div>
    //                                         </a>
    //                                     </center>
    //                                 </td>
    //                                 <td class="title">
    //                                     <span class="titleline">
    //                                         <a href="https://blogsystem5.substack.com/p/the-ides-we-had-30-years-ago-and">IDEs we had 30 years ago</a>
    //                                         <span class="sitebit comhead">
    //                                             (
    //                                             <a href="from?site=blogsystem5.substack.com">
    //                                                 <span class="sitestr">blogsystem5.substack.com</span>
    //                                             </a>
    //                                             )
    //                                         </span>
    //                                     </span>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td colspan="2"></td>
    //                                 <td class="subtext">
    //                                     <span class="subline">
    //                                         <span class="score" id="score_38792446">52 points</span>
    //                                         by <a href="user?id=titaniumtown" class="hnuser">titaniumtown</a>
    //                                         <span class="age" title="2023-12-28T11:38:57">
    //                                             <a href="item?id=38792446">1 hour ago</a>
    //                                         </span>
    //                                         <span id="unv_38792446"></span>
    //                                         | <a href="hide?id=38792446&amp;goto=news">hide</a>
    //                                         | <a href="item?id=38792446">18 &nbsp;comments</a>
    //                                     </span>
    //                                 </td>
    //                             </tr>
    //                             </table>
    //                     </td>
    //                 </tr>
    //             </table>
    //         </center>
    //     </body>
    //     <script type='text/javascript' src='hn.js?YincnLCD7SC6VKAsotUi'></script>
    // </html>

    //       `;
    // const { document } = new jsdom.JSDOM(simpleHtmlString).window;
    // console.log('Parsed Document HTML:', document.documentElement.outerHTML);

    // const rows = document.querySelectorAll('.athing');
    // console.log(extractDataFromHTML(simpleHtmlString));
    // return;
    let respData = await axios.get(hnUrl);
    console.log(respData.data);
    return;
    const resp = extractDataFromHTML(respData);
    console.log(resp);
  } catch (err) {
    throw new Error(
      'Error while calling Lets doc fetch token api --> ' + err.message,
    );
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

    // Extract points, author, time, and comments from the next row
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
