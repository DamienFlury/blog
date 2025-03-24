import { getAllPosts } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="m-4">
      <h1 className="text-4xl">Damien's Blog</h1>
      Welcome to my blog, glad that you're here! Here you find
      my stories and adventures.
      <h2 className="text-2xl">About my adventures and experiences abroad</h2>
      <ul className="mx-4">
        {posts.map((post) => (
          <li className="list-disc" key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-blue-600 block">
              {post.title ?? post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
