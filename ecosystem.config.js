module.exports = {
    apps: [
      {
        name: 'TUVI-API2',
        script: './app.js',
        env: {
          NODE_ENV: 'production',
          PORT: 5000,
        },
      },
    ],
  };