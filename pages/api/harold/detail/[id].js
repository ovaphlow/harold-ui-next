import superagent from 'superagent';

import logger from '../../../../util/logger';

export default async (req, res) => {
  try {
    if (req.method === 'PUT') {
      let response = await superagent
        .put(`${process.env.gateway}/api/harold/${req.query.id}`)
        .send(req.body)
        .set('accept', 'json');
      res.status(response.status).send();
    } else {
      res.status(200).send();
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({});
  }
};
