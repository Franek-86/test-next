import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

module.export = {
  webpack: (config, { server }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};
