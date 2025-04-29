const express = require('express');
const axios = require('axios');

const router = express.Router();

// Fetch countries from public API and save to DB
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    await Country.deleteMany(); // Clear previous entries
    await Country.insertMany(countries.map(country => ({
      name: country.name,
      capital: country.capital,
      region: country.region,
      population: country.population,
      flag: country.flag,
    })));

    res.json({ message: 'Countries saved to DB' });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching country data' });
  }
});

// Get countries from DB
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching from DB' });
  }
});

module.exports = router;
