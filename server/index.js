const app = require('./api/index.js');

const port = process.env.PORT || 1000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;