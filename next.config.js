/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig =(phase)=> {
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      reactStrictMode: true,
      env: {
        mongodb_username:'dev',
        mongodb_password:'pcCx7z6r7cog39rl',
        mongodb_clustername:'cluster0',
        mongodb_database:'bullet-journal-dev'
      }
    }
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_clustername:'cluster0',
      mongodb_database:'bullet-journal'
    }
  }
}

module.exports = nextConfig