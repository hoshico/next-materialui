/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
);

module.exports = nextConfig;
