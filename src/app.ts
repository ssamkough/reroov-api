import express from 'express';

import router from './router';
import sock from './sock';

const app = express();
app.use('/api', router);

app.get('/', (req, res) => {
    const fullUrl: string = req.protocol + '://' + req.get('host') + req.originalUrl + 'api';

    res.status(200).send('<a href="' + fullUrl + '">' + fullUrl + '</a>');
});

const onAppStarted = () => {
    console.log(`App running on ${port}.`);
};

const port = parseInt(process.env.PORT) || 8000;
const server = app.listen(port, onAppStarted);

sock(server);
