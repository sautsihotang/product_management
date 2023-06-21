const errHandler = (err, req, res, next) => {
    console.error(err); // Menampilkan error ke konsol
  
    // Mengatur status dan pesan kesalahan yang sesuai
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message = err.message || 'Internal Server Error';
  
    // Mengirim respon dengan status dan pesan kesalahan
    res.status(statusCode).json({ message });
  };
  
  module.exports = errHandler;
  