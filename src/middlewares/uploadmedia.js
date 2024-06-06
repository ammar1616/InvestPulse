const ImageKit = require("imagekit");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 15 * 1024 * 1024, // no larger than 15mb
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
        const extname = allowedTypes.test(file.mimetype.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only images and videos are allowed"));
        }
    }
});


exports.postMedia = function (req, res, next) {
    const uploadTask = upload.array("media", 10); // Maximum 10 files allowed, adjust as needed

    uploadTask(req, res, function (err) {
        if (err) {
            console.error("Error during upload:", err);
            return res.status(400).send(err.message);
        }

        // If no files uploaded, proceed to the next middleware or route handler
        if (!req.files || req.files.length === 0) {
            return next();
        }

        const uploadedMedia = [];
        let uploadCount = 0;

        req.files.forEach(file => {
            // Upload the media buffer to ImageKit
            const media = {
                fileName: file.originalname,
                file: file.buffer.toString("base64"),
            };
            imagekit.upload(media, function (error, result) {
                if (error) {
                    console.error("Error uploading media:", error);
                    return res.status(500).send("Error uploading media.");
                }

                uploadedMedia.push(result.url);
                uploadCount++;

                if (uploadCount === req.files.length) {
                    // All media uploaded, attach URLs to req.body and proceed
                    req.body.media = uploadedMedia;
                    next();
                }
            });
        });
    });
};