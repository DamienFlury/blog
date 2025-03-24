import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import { visit } from "unist-util-visit";
import { Node } from "unist";
import rehypeSlug from "rehype-slug";

type TOCEntry = {
  depth: number;
  text: string;
  id: string;
};

export default async function markdownToHtml(markdown: string) {
  const toc: TOCEntry[] = []; // Array to hold the Table of Contents
  const result = await unified()
    .use(remarkParse)
    .use(() => (tree: Node) => {
      visit(
        tree,
        "heading",
        (node: {
          depth: number;
          children: { type: string; value: string }[];
        }) => {
          const depth = node.depth;
          const text = node.children
            .filter((child) => child.type === "text")
            .map((child) => child.value)
            .join("");
          const id = text.toLowerCase().replace(/\s+/g, "-"); // Generate slug

          toc.push({ depth, text, id });
        }
      );
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);
  return { ...result, toc };
}
