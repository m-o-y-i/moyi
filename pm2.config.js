module.exports = {
  apps: [
    {
      name: "front",
      script: "npm",
      args: "run start",
      cwd: "/var/www/moyi/front",
      watch: true,
    },
    {
      name: "back",
      script: "dist/index.js",
      cwd: "/var/www/moyi/back",
      watch: true,
    },
  ],
};
