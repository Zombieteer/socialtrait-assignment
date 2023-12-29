import styles from "./page.module.scss";
import {
  Fragment,
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import ycIcon from "../../public/yc.svg";
import Image from "next/image";
import { getPosts } from "@/api";

const baseUrl = "https://news.ycombinator.com";
const headerLinks = [
  "new",
  "past",
  "comments",
  "ask",
  "show",
  "jobs",
  "submit",
];

type Posts = {
  rank: string | null;
  title: string | null;
  link: string | null;
  site: string | null;
  hasUpvote: boolean;
  points: string | null;
  author: string | null;
  time: string | null;
  comments: string | null;
  createdAt: Date;
};

export const fetchPosts = async () => {
  let posts = await fetch("http://localhost:3003", { cache: "force-cache" });
  posts = await posts.json();
  const allPosts = posts.message.sort(
    (a: Object, b: Object) =>
      Number(a.rank.split(".")[0]) - Number(b.rank.split(".")[0])
  );

  return allPosts;
};

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <section>
      <center>
        <div className={styles.parentContainer}>
          <div className={styles.header}>
            <div style={{ display: "flex" }}>
              <Image
                priority
                src={ycIcon}
                alt="yc"
                style={{ border: "1px white solid" }}
              />
            </div>
            <div className={styles.headerTitle}>
              <p className={styles.hackernewsHeading}>Hacker News</p>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {headerLinks.map((link, index) => (
                  <div key={index}>
                    <a href={`${baseUrl}/${link}`}>{link}</a>
                    {index !== headerLinks.length - 1 && <>&nbsp;|&nbsp;</>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <a href={`${baseUrl}/login?goto=news`}>login</a>
            </div>
          </div>

          <div style={{ paddingTop: "10px" }}>
            {posts.map((post: Posts, index: number) => (
              <div className={styles.itemContainer} key={index}>
                <div className={styles.rankStyle}>{post.rank}</div>
                <div>
                  <div className={styles.itemHeadContainer}>
                    <Image
                      priority
                      src={"https://news.ycombinator.com/triangle.svg"}
                      alt="yc"
                      width={10}
                      height={10}
                      style={{
                        border: "1px white solid",
                        margin: "3px 2px 6px",
                      }}
                    />
                    <div>
                      <a href={post.link || "#"} className="title">
                        {post.title}
                      </a>
                      <a
                        href={`${baseUrl}/from?site=${post.site}`}
                        className="titleHelp"
                      >
                        &nbsp;({post.site})
                      </a>
                    </div>
                  </div>
                  <div className={"subText"} style={{ paddingLeft: "15px" }}>
                    {post.points} {post.points && "by"}{" "}
                    <a href={`${baseUrl}/user?id=${post.author}`}>
                      {post.author}{" "}
                    </a>
                    {post.time} | hide {post.comments && `| ${post.comments}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </center>
    </section>
  );
}
