const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({extended: false}));
app.use(bodyPs.json());

const alatRouter = require('./routes/alat_tangkap.js');
app.use('/api/alat', alatRouter);

const dpiRouter = require('./routes/dpi.js');
app.use('/api/dpi', dpiRouter);

const pemilikRouter = require('./routes/pemilik.js');
app.use('/api/pemilik', pemilikRouter);

const kapalRouter = require('./routes/kapal.js');
app.use('/api/kapal', kapalRouter);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})