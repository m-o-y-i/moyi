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
      script: "dist/index.js",
      cwd: "back",
      watch: true,
    },
  ],
};
