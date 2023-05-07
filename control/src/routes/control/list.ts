import express, { Request, Response } from 'express';
import { NotFoundError } from '@vboxdev/common';
import { Control } from '../../models/control';
import { Features } from '../../models/features';
const AWS = require('aws-sdk');

interface dataInterface {
  imports: any;
}

// Just a test I made a chnage

const router = express.Router();

router.get('/api/control', async (req: Request, res: Response) => {
  const control = await Control.find({ status: true }).sort({ order: 1 });

  if (!control) {
    throw new NotFoundError();
  }

  const results = control.map(async (result) => {
    const features = await Features.find({ control: result._id });

    return { result, features };
  });

  const controls = await Promise.all(results);

  const dataEn: dataInterface = {
    imports: {},
  };

  const dataCH: dataInterface = {
    imports: {},
  };

  dataEn['imports']['react'] =
    'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js';
  dataEn['imports']['react-dom'] =
    'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js';

  dataCH['imports']['react'] =
    'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js';
  dataCH['imports']['react-dom'] =
    'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js';

    

  for (const { appName, appURL } of control) {
    if (appURL.includes('main.js')) {
      
      if (appURL.includes('localhost')) {
        dataEn['imports'][appName] = appURL;
        dataCH['imports'][appName] = appURL;
      } else {
        let newUrl = appURL.replace('/main.js', '');

        dataEn['imports'][appName] = newUrl + '/en-us/main.js';

        dataCH['imports'][appName] = newUrl + '/zh-cn/main.js';
      }
    }
  }

  // uatenglish
  dataEn['imports']['@Stanbic/root-config'] =
    'https://chenkenz.fra1.cdn.digitaloceanspaces.com/english/Stanbic-root-config.js';
  // data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
  dataEn['imports']['@stanbic/sidebar'] =
    'https://sbinternetbankingsidebar.web.app/en-us/main.js';
  // dataEn['imports']['@stanbic/header'] =
  //   'https://sbinternetbankingheader.web.app/en-us/main.js';
  dataEn['imports']['@stanbic/header'] = 'http://localhost:9002/main.js';
  dataEn['imports']['@stanbic/mobilemenu'] = 'http://localhost:9001/main.js';

  // chiness
  dataCH['imports']['@Stanbic/root-config'] =
    'https://chenkenz.fra1.cdn.digitaloceanspaces.com/english/Stanbic-root-config.js';
  // data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
  dataCH['imports']['@stanbic/sidebar'] =
    'https://sbinternetbankingsidebar.web.app/zh-cn/main.js';
  // dataCH['imports']['@stanbic/header'] =
  //   'https://sbinternetbankingheader.web.app/zh-cn/main.js';

  dataCH['imports']['@stanbic/header'] = 'http://localhost:9002/main.js';
  dataCH['imports']['@stanbic/mobilemenu'] = 'http://localhost:9001/main.js';

  console.log('dataEnwwwwwwww', dataEn);

  console.log('dataEneeeeee', dataCH);

  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'DO00LM8W8JRB978NZTNV',
    secretAccessKey: 'v3zwuVGcnjt3ASQhk6TkCe8MD4pr5DWc9PfczoVFZY0',
  });

  var paramsEn = {
    Body: JSON.stringify(dataEn),
    Bucket: 'chenkenz/english',
    Key: 'importmap.json',
    ACL: 'public-read',
    ContentType: 'application/json',
  };

  var paramsCH = {
    Body: JSON.stringify(dataCH),
    Bucket: 'chenkenz/chinese',
    Key: 'importmap.json',
    ACL: 'public-read',
    ContentType: 'application/json',
  };

  s3.putObject(paramsEn, function (err: any, data: any) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  s3.putObject(paramsCH, function (err: any, data: any) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
  res.send(controls);
});

router.get('/api/control/app', async (req: Request, res: Response) => {
  const control = await Control.find({}).sort({ order: 1 });

  if (!control) {
    throw new NotFoundError();
  }

  const results = control.map(async (result) => {
    const features = await Features.find({ control: result._id });

    return { result, features };
  });

  const controls = await Promise.all(results);

  const dataEn: dataInterface = {
    imports: {},
  };

  const dataCH: dataInterface = {
    imports: {},
  };

  dataEn['imports']['react'] =
    'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js';
  dataEn['imports']['react-dom'] =
    'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js';

  dataCH['imports']['react'] =
    'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js';
  dataCH['imports']['react-dom'] =
    'https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js';

  for (const { appName, appURL } of control) {
    if (appURL.includes('main.js')) {
      if (appURL.includes('localhost')) {
        dataEn['imports'][appName] = appURL;
        dataCH['imports'][appName] = appURL;
      } else {
        let newUrl = appURL.replace('/main.js', '');

        dataEn['imports'][appName] = newUrl + '/en-us/main.js';

        dataCH['imports'][appName] = newUrl + '/zh-cn/main.js';
      }
    }
  }

  // uatenglish
  dataEn['imports']['@Stanbic/root-config'] =
    'https://chenkenz.fra1.cdn.digitaloceanspaces.com/english/Stanbic-root-config.js';
  // data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
  dataEn['imports']['@stanbic/sidebar'] =
    'https://sbinternetbankingsidebar.web.app/en-us/main.js';
  // dataEn['imports']['@stanbic/header'] =
  //   'https://sbinternetbankingheader.web.app/en-us/main.js';
  dataEn['imports']['@stanbic/header'] = 'http://localhost:9002/main.js';
  dataEn['imports']['@stanbic/mobilemenu'] = 'http://localhost:9001/main.js';

  // chiness
  dataCH['imports']['@Stanbic/root-config'] =
    'https://chenkenz.fra1.cdn.digitaloceanspaces.com/english/Stanbic-root-config.js';
  // data["imports"]["@stanbic/sidebar"] =  "https://sbinternetbankingsidebar.web.app/main.js"
  dataCH['imports']['@stanbic/sidebar'] =
    'https://sbinternetbankingsidebar.web.app/zh-cn/main.js';
  // dataCH['imports']['@stanbic/header'] =
  //   'https://sbinternetbankingheader.web.app/zh-cn/main.js';
  dataCH['imports']['@stanbic/header'] = 'http://localhost:9002/main.js';
  dataCH['imports']['@stanbic/mobilemenu'] = 'http://localhost:9001/main.js';

  console.log('dataEn', dataEn);

  console.log('dataEn', dataCH);

  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'DO00LM8W8JRB978NZTNV',
    secretAccessKey: 'v3zwuVGcnjt3ASQhk6TkCe8MD4pr5DWc9PfczoVFZY0',
  });

  var paramsEn = {
    Body: JSON.stringify(dataEn),
    Bucket: 'chenkenz/english',
    Key: 'importmap.json',
    ACL: 'public-read',
    ContentType: 'application/json',
  };

  var paramsCH = {
    Body: JSON.stringify(dataCH),
    Bucket: 'chenkenz/chinese',
    Key: 'importmap.json',
    ACL: 'public-read',
    ContentType: 'application/json',
  };

  s3.putObject(paramsEn, function (err: any, data: any) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  s3.putObject(paramsCH, function (err: any, data: any) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
  res.send(controls);
});

router.get('/api/control/search', async (req: Request, res: Response) => {
  const { appMenuName } = req.query;

  const fetchParams: any = {
    filterOptions: {
      appMenuName,
    },
  };

  if (!appMenuName) {
  }

  const appMenuNameRegex = new RegExp(
    fetchParams.filterOptions.appMenuName,
    'ig'
  );

  const appMenuNameGet = { $regex: appMenuNameRegex };

  console.log(appMenuNameGet);

  const control = await Control.aggregate([
    {
      $match: {
        appMenuName: appMenuNameGet,
      },
    },
  ]);

  const results = control.map(async (result) => {
    const features = await Features.find({ control: result._id });

    return { result, features };
  });

  const controls = await Promise.all(results);

  res.send(controls);
});

export { router as controlListRouter };
