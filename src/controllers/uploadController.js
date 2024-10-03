const { uploadFiles} = require('../helpers/uploader');
const Pago = require('../models/PagoModel');


// Controlador para manejar la subida y la asociación del recibo al pago.
exports.postFile = async (req, res) => {
  console.log(req);
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      // No files
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    //Find de Payment
    const { id } = req.params;
    const pago = await Pago.findByPk(id);
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }    
    //uplead the file 
    const recibo = await uploadFiles(req.files)

    if (!recibo) {
      return res.status(400).json({ message: 'Error al subir el archivo', error: error.message });
    }

    // Asociamos la ruta del archivo al pago.
    pago.recibo = recibo;
   
    try {
      await pago.save();
    } catch (error) {
      console.error("Error al guardar el pago:", error);
      return res.status(500).json({ message: 'Error al guardar el pago', error: error.message });
    }

    // Enviamos una respuesta JSON indicando que el archivo se subió y se asoció exitosamente.
    res.status(200).json({ message: 'File uploaded and associated successfully', file: req.file });
  } catch (error) {
    // Manejo de errores.
    res.status(500).json({ message: 'Error al subir y asociar el archivo', error: error.message });
  }
};