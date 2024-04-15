/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ["my-forwarded-host.com"],
    },
  },
};
