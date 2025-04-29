require('dotenv').config(); // <-- load env variables at the top

const axios = require('axios');
const mongoose = require('mongoose');
const connectDB = require('./db');
const Country = require('./models/country.js');

const fetchAndStoreData = async () => {
  await connectDB();

  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;

    // Optional: Clear old data
    await Country.deleteMany({});

    for (let country of countries) {
      const newCountry = new Country({
        name: {
          common: country.name?.common || '',
          official: country.name?.official || '',
        },
        capital: country.capital || [],
        region: country.region || '',
        population: country.population || 0,
        flags: {
          png: country.flags?.png || '',
          svg: country.flags?.svg || '',
        },
      });

      await newCountry.save();
    }

    console.log('✅ Country data sucessfully stored in  MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error fetching or storing data:', err.message);
    process.exit(1);
  }
};

fetchAndStoreData();
