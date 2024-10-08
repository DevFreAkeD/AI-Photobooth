import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Image from '../db/models/imageModel.js';
import aiService from '../services/aiService.js'

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);  // Save file with timestamp-based name
    }
});

const upload = multer({ storage }).single('selfie');

// Upload selfie and store metadata
export const uploadSelfie = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading selfie', error: err });
        }

        const { gender, background } = req.body;

        // Save selfie metadata to database
        Image.create({
            selfiePath: req.file.path,
            gender,
            background
        })
        .then(newImage => {
            res.status(200).json({
                message: 'Selfie uploaded successfully',
                imageId: newImage.id  // Return the image ID for future steps
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error saving image metadata', error: error.message });
        });
    });
};

// Process the uploaded selfie and generate an AI image
export const generateAIImage = async (req, res) => {
    const { imageId } = req.body;

    try {
        // Find the uploaded image in the database
        const image = await Image.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Send selfie to the AI service to generate the AI image
        const generatedImage = await aiService.createAIImage(image.selfiePath, image.gender, image.background);

        // Save the generated image to the 'generated/' folder
        const generatedImagePath = `./generated/${Date.now()}.png`;
        fs.writeFileSync(generatedImagePath, generatedImage);

        // Update the database with the generated image path
        image.generatedImagePath = generatedImagePath;
        await image.save();

        res.status(200).json({
            message: 'AI image generated successfully',
            generatedImagePath  // Return the path to the generated image
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
};