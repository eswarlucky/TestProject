import express from 'express';

import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDomServer from 'react-dom/server';

import App from '../src/App';

const app = express();
 const PORT = 8000;
// resolver function
app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
            return res.status(500).send('something went wrong while building app!');
        }
        // chnage to normal rendering to SSR our app
        return res.send(data.replace(
            '<div id="root"></div>',  
            `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`));
    })

});
// TO need to specify the static file like build

app.use(express.static(path.resolve(__dirname, '..', 'build')));

// To listen the port 
app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
});