import superagent from 'superagent';

import logger from '../../../../util/logger';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      let response = await superagent
        .post(`${process.env.gateway}${req.url}`)
        .send(req.body)
        .set('accept', 'json');
      res.status(200).json(response.body);
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500);
  }
};
