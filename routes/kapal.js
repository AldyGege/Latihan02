const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query(`SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat FROM kapal 
    JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik 
    JOIN dpi on kapal.id_dpi = dpi.id_dpi 
    JOIN alat_tangkap ON kapal.id_alat = alat_tangkap.id_alat`, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed'
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Detail Kapal',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('nama_kapal').notEmpty(),
    body('id_alat').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_alat: req.body.id_alat,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi
    }
    connection.query('insert into kapal set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
});

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat FROM kapal 
    JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik 
    JOIN dpi on kapal.id_dpi = dpi.id_dpi 
    JOIN alat_tangkap ON kapal.id_alat = alat_tangkap.id_alat where id_kapal= ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data Kapal',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('nama_kapal').notEmpty(),
    body('id_alat').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id;
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_alat: req.body.id_alat,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi
    }
    connection.query(`update kapal set ? where id_kapal = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(500).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
});

router.delete('/delete/(:id)', function(req, res) {
    let id = req.params.id;
    connection.query(`delete from kapal where id_kapal = ${id}`, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been Delete!'
            })
        }
    })
});
module.exports = router;