import superagent from 'superagent';

import logger from '../../../util/logger';

export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      let response = await superagent.get(`${process.env.gateway}${req.url}`);
      res.status(200).json(response.body);
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500);
  }
};
