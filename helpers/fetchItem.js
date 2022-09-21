const fetchItem = async (itemID) => {
  const endpoint = `https://api.mercadolibre.com/items/${itemID}`;
  try {
    const request = await fetch(endpoint);
    const response = await request.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
