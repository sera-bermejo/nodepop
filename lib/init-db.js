const readline = require("readline");
const connection = require("./connectMongoose")
const Anuncio = require("../models/Anuncio");


async function main() {
    
    const continuar = await preguntaSiNo("¿Estás superseguro de que quieres borrar la base de datos? (n)")
    if (!continuar) {
        process.exit();
    }

    await initAnuncios();
    
    
    connection.close();
}

main().catch(err => console.log("Hubo un error", err));


async function initAnuncios() {
    
    const result = await Anuncio.deleteMany();
    console.log(`Eliminados ${result.deletedCount} anuncios.`);


    const inserted = await Anuncio.insertMany([
        {nombre: "Bicicleta", venta: true, precio: 230.15, foto: "bici.jpg", tags: ["lifestyle", "motor"]},
        {nombre: "Iphone 3GS", venta: false, precio: 50.00, foto: "iphone.png", tags: ["lifestyle", "mobile"]}   
    ]);
    console.log(`Creados ${inserted.length} anuncios.`);
  
}


function preguntaSiNo(texto) {

    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(texto, respuesta => {
            interface.close();
            if (respuesta.toLowerCase() === "si") {
                resolve(true);
                return;
            }
            resolve(false);
        })
    })
};


