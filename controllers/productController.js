const { Product } = require('../models');

const addProduct = async (req, res, next) => {
  try {
    // Mendapatkan data produk dari body request
    const { name, qty, picture, isActive } = req.body;

    // Membuat produk baru menggunakan model Product
    const product = await Product.create({ name, qty, picture, isActive });

    // Mengembalikan respon berhasil dengan data produk yang telah ditambahkan
    res.status(201).json(product);
  } catch (error) {
    next(error); // Melanjutkan ke penanganan kesalahan oleh middleware errHandler
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Mendapatkan semua produk dari basis data menggunakan model Product
    const products = await Product.findAll();

    // Mengembalikan respon berhasil dengan data produk yang didapatkan
    res.json(products);
  } catch (error) {
    next(error); // Melanjutkan ke penanganan kesalahan oleh middleware errHandler
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Mendapatkan produk berdasarkan ID menggunakan model Product
    const product = await Product.findByPk(id);

    // Jika produk ditemukan, mengembalikan respon dengan data produk
    if (product) {
      res.json(product);
    } else {
      // Jika produk tidak ditemukan, mengembalikan respon dengan status 404
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Melanjutkan ke penanganan kesalahan oleh middleware errHandler
  }
};

const removeProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus produk berdasarkan ID menggunakan model Product
    const deletedProduct = await Product.destroy({ where: { id } });

    // Jika produk berhasil dihapus, mengembalikan respon berhasil
    if (deletedProduct) {
      res.json({ message: 'Product deleted successfully' });
    } else {
      // Jika produk tidak ditemukan, mengembalikan respon dengan status 404
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Melanjutkan ke penanganan kesalahan oleh middleware errHandler
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Mendapatkan data produk yang ingin diperbarui dari body request
    const { name, qty, picture, isActive } = req.body;

    // Mencari produk berdasarkan ID menggunakan model Product
    const product = await Product.findByPk(id);

    // Jika produk ditemukan, melakukan pembaruan atribut produk
    if (product) {
      product.name = name;
      product.qty = qty;
      product.picture = picture;
      product.isActive = isActive;

      // Menyimpan perubahan produk ke dalam basis data
      await product.save();

      // Mengembalikan respon berhasil dengan data produk yang diperbarui
      res.json(product);
    } else {
      // Jika produk tidak ditemukan, mengembalikan respon dengan status 404
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error); // Melanjutkan ke penanganan kesalahan oleh middleware errHandler
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  removeProductById,
  updateProductById,
};
