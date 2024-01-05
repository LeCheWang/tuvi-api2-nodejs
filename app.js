const express = require('express');
const app = express();
const router = require('./routers');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

router(app);

app.listen(5000, () => {
  console.log('server nodejs run at port 5000');
});
