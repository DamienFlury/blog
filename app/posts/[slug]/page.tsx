import { getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/mdToHtml";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Post = async (props: Props) => {
  const params = await props.params;
  const slug = params?.slug;
  const post = getPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="m-4">
      <h1 className="text-5xl mb-4">{post.title}</h1>
      <div className="shadow p-2 my-2">
        <h4 className="text-xl">Table of contents</h4>
        <nav>
          {content.toc.map((tocEntry) => (
            <a
              href={`#${tocEntry.id}`}
              key={tocEntry.id}
              className="block text-blue-600"
            >
              {tocEntry.text}
            </a>
          ))}
        </nav>
      </div>
      <div
        className={styles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content.value }}
      ></div>
    </main>
  );
};

export default Post;
