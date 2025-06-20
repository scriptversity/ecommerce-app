const getProducts = async (req, res) => {
  try {
    // Simulate fetching products from a database
    const products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 },
    ];

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
}

module.exports = {
  getProducts
};
