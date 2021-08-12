import superagent from 'superagent';

import logger from '../../../util/logger';

export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      let path = [process.env.warehouse, req.url]; // eslint-disable-line
      let response = await superagent.get(path.join(''));
      res.status(200).json(response.body);
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500);
  }
};
