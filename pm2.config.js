module.exports = {
  apps: [
    {
      name: "front",
      script: "npm",
      args: "run start",
      cwd: "front",
      watch: true,
    },
    {
      name: "back",
      script: "back/dist/index.js",
      watch: true,
    },
  ],
};
