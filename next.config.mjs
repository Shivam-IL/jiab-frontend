import nextPwa from "@ducanh2912/next-pwa";

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  devOptions: {
    enabled: true,
  },
  buildExcludes: [/\.map$/], // .map files excluded
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["d35f5vastl4boc.cloudfront.net"],
  },
};

export default withPWA(nextConfig);
