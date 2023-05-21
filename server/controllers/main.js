const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const provinces = require('../data/province.json');
const cities = require('../data/city.json');
const db = require('../models/index');

exports.postUpload = async (req, res, next) => {

    const { image: images, file: files } = req.files
        ? req.files
        : { image: [], file: [] };


    if (!fs.existsSync(path.join(__dirname, '../uploads'))){
        fs.mkdirSync(path.join(__dirname, '../uploads'));
    }
    if (!fs.existsSync(path.join(__dirname, '../uploads/wsm'))){
        fs.mkdirSync(path.join(__dirname, '../uploads/wsm'));
    }
    if (!fs.existsSync(path.join(__dirname, '../uploads/wmd'))){
        fs.mkdirSync(path.join(__dirname, '../uploads/wmd'));
    }

    const saved = [];

    try {

        if (images && images.length > 0) {

            await images.forEach(async (image) => {
                const filename = image.filename;
                if (filename) {
                    saved.push(image);
                    const input = fs.readFileSync(path.join(__dirname, '..', image.path));

                    const buffer = await sharp(input)
                        .resize({ width: 970, fit: "cover" })
                        .toBuffer();

                    // delete original file
                    fs.unlinkSync(path.join(__dirname, '..', image.path));

                    await sharp(buffer)
                        .resize(970, null, { fit: "cover" })
                        .toFile(path.join(__dirname, '../uploads/', filename));
                    await sharp(buffer)
                        .resize(90, 90, { fit: "cover" })
                        .toFile(path.join(__dirname, '../uploads/wsm', filename));
                    await sharp(buffer)
                        .resize(236, 177, { fit: "cover" })
                        .toFile(path.join(__dirname, '../uploads/wmd', filename));
                }
            });

        }
        if (files && files.length > 0) {

            files.forEach((file) => {
                const filename = file.filename;
                if (filename) {
                    saved.push(file);
                }
            });

        }
        const uploadedLength = files && files.length > 0
            ? files.length
            : (images && images.length > 0
                ? images.length
                : 0);

        if (saved.length >= uploadedLength) {
            res.send({
                success: true,
                files: saved
            });
        } else {
            res.send({
                success: false,
            })
        };

    } catch (error) {
        const err = new Error(error);
        next(err)
    }
};

exports.postUploadDeleteFile = async (req, res, next) => {
    const filename = req.body.filename;
    try {
        fs.unlinkSync(path.join(__dirname, '../uploads/', filename));
        fs.unlinkSync(path.join(__dirname, '../uploads/wsm', filename));
        fs.unlinkSync(path.join(__dirname, '../uploads/wmd', filename));
        res.send({
            success: true,
        });
    } catch (error) {
        const err = new Error(error)
        next(err)
    }
};

exports.postDownloadFile = async (req, res, next) => {
    const filename = req.body.filename;
    try {
        let contentType;
        if (filename.match(/\.json/)) {
            contentType = 'application/json';
        } else if (filename.match(/\.zip/)) {
            contentType = 'application/zip';
        } else if (filename.match(/\.7z/)) {
            contentType = 'application/7z';
        } else if (filename.match(/\.jpg/)) {
            contentType = 'image/jpg';
        } else if (filename.match(/\.gif/)) {
            contentType = 'image/gif';
        } else if (filename.match(/\.png/)) {
            contentType = 'image/png';
        } else if (filename.match(/\.rar/)) {
            contentType = 'application/rar';
        } else if (filename.match(/\.txt/)) {
            contentType = 'text/txt';
        } else if (filename.match(/\.csv/)) {
            contentType = 'text/csv';
        } else if (filename.match(/\.xlsx/)) {
            contentType = 'document/xlsx';
        } else if (filename.match(/\.xls/)) {
            contentType = 'document/xls';
        } else if (filename.match(/\.docx/)) {
            contentType = 'document/docx';
        } else if (filename.match(/\.doc/)) {
            contentType = 'document/doc';
        } else if (filename.match(/\.pdf/)) {
            contentType = 'document/pdf';
        }
        if (contentType) {
            res.setHeader('Content-Type', contentType + '; charset=utf-8');
            res.setHeader('Transfer-Encoding', 'chunked');
        }
        const readStream = fs.createReadStream(path.join(__dirname, '../uploads/', filename))
        readStream.pipe(res);
    } catch (error) {
        const err = new Error(error)
        next(err)
    }
};


exports.getProvinces = async (req, res, next) => {
    return res.send({
        success: true,
        data: provinces
    })
}

exports.getCities = async (req, res, next) => {

    const body = Object.keys(req.query).length === 0 ? req.body : req.query;

    if (!body.province_id) {
        const err = new Error('incurrect information')
        return next(err);
    }

    const data = cities.filter((c) => c.province_id === +body.province_id);
    return res.send({
        success: true,
        data
    })
}

exports.getPlans = async (req, res, next) => {

    try {
        const plans = await db["Plan"].find();
        return res.send({
            success: true,
            data: plans
        })
    } catch (error) {
        const err = new Error(error)
        next(err)
    }
}