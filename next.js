import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import { webpack } from "next/dist/compiled/webpack/webpack";

module.export = {
  webpack: (config, { server }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};
