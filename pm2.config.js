module.exports = {
  apps: [
    {
      name: "front",
      script: "npm",
      args: "run start",
      cwd: "/moyi/front",
      watch: true,
    },
    {
      name: "back",
      script: "dist/index.js",
      cwd: "/moyi/back",
      watch: true,
    },
  ],
};
