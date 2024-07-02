module.exports = {
    apps: [
      {
        name: 'my-react-app',
        script: 'npm',
        args: 'start',
        interpreter: 'none',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };