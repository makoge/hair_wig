// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    updated: { type: "date", required: false },
    category: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false }
  },
  computedFields: {
    locale: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[0]
      // en/...
    },
    categorySlug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[1]
      // en/wig-treatment/...
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
      // wig-treatment/how-to-wash-lace-wig
    },
    url: {
      type: "string",
      resolve: (doc) => {
        const [locale, ...rest] = doc._raw.flattenedPath.split("/");
        return `/${locale}/blog/${rest.join("/")}`;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-RA5A5FCC.mjs.map
