/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  publicRuntimeConfig: {
    site: {
      name: "Why Earth",
      url:
        process.env.NODE_ENV === "development"
          ? "https://whyearth.vercel.app"
          : "https://app.subconscious.ai",
      title: "Why Earth - Experimental Design",
      description:
        "Most of the world will make decisions by either guessing or using their gut. They will be either lucky or wrong. Artificial Intelligence has a strong grasp on probability, yet still can't compute cause and effect. Until now.",
      socialPreview: "/preview.png",
    },
  },
  images: {
    domains: [
      "whyearth.vercel.app",
      "app.subconscious.ai",
      "www.subconscious.ai",
      "countryflagsapi.com",
      "www.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
