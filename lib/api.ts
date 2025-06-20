import { Post } from "@/types/post";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const sanitizedSlug = decodeURIComponent(realSlug);
  const fullPath = path.join(postsDirectory, `${sanitizedSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  console.log(realSlug);
  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(getPostBySlug)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
