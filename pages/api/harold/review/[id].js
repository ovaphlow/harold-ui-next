import superagent from 'superagent';

import logger from '../../../../util/logger';

export default async (req, res) => {
  try {
    if (req.method === 'PUT') {
      let url = [
        process.env.gateway,
        '/api/harold/',
        req.query.id,
        '?option=',
        req.query.option,
      ];
      let response = await superagent
        .put(url.join(''))
        .send(req.body)
        .set('headers', req.headers)
        .set('accept', 'json');
      res.status(response.status).send();
    } else {
      res.status(200);
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({});
  }
};
