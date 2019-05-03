//@ts-ignore
import validate from 'express-validation';
import express from 'express';
import cors from 'cors';
import ErrorHandler from '../utils/ErrorHandler';

import CreateNumberValidation from '../validators/CreateNumberValidation';
import enableLogging from '../utils/Logging';
import { validateBasicAuth } from '../middleware';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
import NumberBuilder from '../api/NumberBuilder';
import FileBuilder from '../api/FileBuilder';
import { uploadPublicFile } from '../api/FBStorageApi';

const bodyParser = require('body-parser');
require('express-async-errors');


module.exports = (functions: any) => {
  const app = express();
  app.use(bodyParser.json());
  enableLogging(app); 
 
  /* CORS Configuration */
  const openCors = cors({ origin: '*' });
  app.use(openCors);

  /* Auth Middleware */
  app.use(validateBasicAuth);


  /**
   * CreateNumber
   * 
   * @description Specify the number and language to generate an audio file
   */
  app.post('/', validate(CreateNumberValidation), async (req, res) => {
    const { language, number } = req.body;

    //Using NumberBuilder, generate a list of audio files to be compiled
    const audioFiles = unsafeUnwrap(await NumberBuilder.buildNumber(number, language));
    console.log("audio files are", audioFiles);

    //Using FileBuilder, load files and append into a single file
    const file = unsafeUnwrap(await FileBuilder.createFile(audioFiles, language));

    console.log('file is', file);

    const expiry = 60 * 60; //60 minutes
    const publicUrl = unsafeUnwrap(await uploadPublicFile(file, expiry));

    //Set expiry on file, upload to storage
    //get the download url, and format response

    res.json({
      expiry: 10,
      url: publicUrl,
    });
  });

  /**
   * GetNumberLanguages
   * 
   * @description Gets the available language codes for the number audio generator
   */
  app.get('/languages', async (req, res) => {
    
    //TODO: make sure language code is available

    res.json([
      'en_AU_male',
    ]);
  });


  /* Error Handling - must be at bottom! */
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}