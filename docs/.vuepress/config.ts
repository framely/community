import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",

  title: "Blog2",
  description: "Blog plugin for VuePress2",

  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.svg",
    navbar: [
      "/",
      {
        text: "Article",
        link: "/article/",
      },
    ],
  },
});