import { get } from 'axios';

// Fetch and store countries from external API
const fetchAndStoreCountries = async (req, res) => {
  try {
    const response = await get('https://restcountries.com/v2/all');
    const countries = response.data.map(c => ({
      name: c.name,
      capital: c.capital,
      region: c.region,
      population: c.population,
      flag: c.flag,
    }));

    await Country.deleteMany(); // clear old data
    await Country.insertMany(countries);

    res.status(200).json({ message: 'Countries stored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all countries
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  fetchAndStoreCountries,
  getCountries,
};
