import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date", required: false },
    category: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[0],
    },
    categorySlug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[1],
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    url: {
      type: "string",
      resolve: (doc) => {
        const [locale, ...rest] = doc._raw.flattenedPath.split("/");
        return `/${locale}/blog/${rest.join("/")}`;
      },
    },
    readingTime: {
      type: "string",
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Post],
});
