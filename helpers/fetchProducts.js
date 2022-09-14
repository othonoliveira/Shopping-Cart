const fetchProducts = async (product) => {
  const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  try {
    const request = await fetch(ENDPOINT);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
