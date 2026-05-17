const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPagesBuild = process.env.DEPLOY_TARGET === "github-pages";
const isProjectPagesSite =
  repositoryName.length > 0 && !repositoryName.endsWith(".github.io");
const basePath = isGitHubPagesBuild && isProjectPagesSite
  ? `/${repositoryName}`
  : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
