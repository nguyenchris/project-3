const axios = require('axios');
const { getSuggestions } = require('../utils/utility');
const querystring = require('querystring');

// controller for /api/event/search?{query=}
exports.getCityAutocomplete = (req, res, next) => {
  const authHeader = { headers: { Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}` } };
  if (req.query.location) {
    res.json({ locations: getSuggestions(decodeURI(req.query.location), 'location', 'city') });
  } else {
    axios
      .get(
        `https://www.eventbriteapi.com/v3/events/search?${querystring.stringify(req.query)}`,
        authHeader
      )
      .then(result => {
        res.json(result.data);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
    // console.log(querystring.stringify(req.query));
    // console.log(querystring(req.query.location.latitude));
    // res.end();
  }
};
