const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs"); // Para verificar si la carpeta existe

const extensions = ["pdf"];

/**
 * Upload a file to the server.
 * @param {object} fileToUpload - The file to upload.
 * @returns {Promise<string>} - A promise that resolves to the new file name.
 */
const uploadFiles = (fileToUpload) => {
    return new Promise((resolve, reject) => {
        const { file } = fileToUpload; // Get the file

        // Verificar si el archivo existe
        if (!file) {
            return reject({ msg: "No file uploaded." });
        }

        // Obtener extensión y nombre del archivo
        const extensionAndName = file.name.split(".");
        const extension = extensionAndName[extensionAndName.length - 1].toLowerCase(); // Obtener la extensión en minúsculas
    

        // Verificar que la extensión sea permitida
        if (!extensions.includes(extension)) {
            return reject({ msg: `Allowed extensions: ${extensions.join(", ")}` });
        }

        const tempName = uuidv4() + "." + extension; // Crear un ID único para el archivo
        const uploadPath = path.join(__dirname, "../../uploads/", tempName); // Ubicación del archivo

        // Verificar si la carpeta de destino existe, si no, crearla
        fs.mkdir(path.join(__dirname, "../../uploads/"), { recursive: true }, (err) => {
            if (err) return reject(err); // Manejar errores de creación de carpeta
            // Mover el archivo a la ubicación de carga
            file.mv(uploadPath, (err) => {
                if (err) {
                    return reject(err); // Manejar errores de carga
                }
                resolve(tempName); // Retornar el nombre del archivo
            });
        });
    });
};

module.exports = { uploadFiles };
