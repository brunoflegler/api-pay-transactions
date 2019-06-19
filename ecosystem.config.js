module.exports = {
  apps: [
    {
      name: 'api-psp',
      script: 'src/index.js',
      instances: '1',
      autorestart: true,
      watch: false
    }
  ]
}
