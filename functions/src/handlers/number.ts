//@ts-ignore
import validate from 'express-validation';
import express from 'express';
import cors from 'cors';
import ErrorHandler from '../utils/ErrorHandler';

import CreateNumberValidation from '../validators/CreateNumberValidation';
import enableLogging from '../utils/Logging';
import { validateBasicAuth } from '../middleware/Auth';
import { unsafeUnwrap } from '../utils/AppProviderTypes';
import NumberBuilder from '../api/NumberBuilder';
import FileBuilder from '../api/FileBuilder';
import { uploadPublicFile } from '../api/FBStorageApi';
import { rateLimit } from '../middleware/RateLimit';

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

  /* Rate Limit Middleware */
  app.use(rateLimit);



  app.get('/number', async (req, res) => {
    return res.json("TESTING 123");
  });


  /**
   * CreateNumber
   * 
   * @description Specify the number and language to generate an audio file
   */
  app.post('/number', validate(CreateNumberValidation), async (req, res) => {
    const { language, number } = req.body;

    //Using NumberBuilder, generate a list of audio files to be compiled
    const audioFiles = unsafeUnwrap(await NumberBuilder.buildNumber(number, language));

    //Using FileBuilder, load files and append into a single file
    const file = unsafeUnwrap(await FileBuilder.createFile(audioFiles, language));

    const expiry = 60 * 60; //60 minutes
    const publicUrl = unsafeUnwrap(await uploadPublicFile(file, expiry));

    //Set expiry on file, upload to storage
    //get the download url, and format response

    res.json({
      expiry: 60 * 60 * 24, //1 day, this is currently managed in the cloud storage lifecycle management
      url: publicUrl,
    });
  });

  /**
   * GetNumberLanguages
   * 
   * @description Gets the available language codes for the number audio generator
   */
  app.get('/number/languages', async (req, res) => {
    
    //TODO: make sure language code is available

    res.json([
      'en_AU_male',
      'sw_TZ_male',
    ]);
  });


  /* Error Handling - must be at bottom! */
  app.use(ErrorHandler);

  return functions.https.onRequest(app);
}