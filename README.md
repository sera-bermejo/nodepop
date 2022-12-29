# Nodepop


Deploy:

```sh
npm install
```
Load initial data to database:
```
npm run init-db
```

Start the application with:

```sh
npm run start
```
## API Documentation

Create Anuncio:

POST/api/create_anuncio
```json
{
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}
```
List anuncios:

GET/api/get_anuncios
```json
{
    "results": [
        {
            "_id": "63acaabd1c6ccffa09cbc16f",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        },
        {
            "_id": "63acaabd1c6ccffa09cbc170",
            "nombre": "Iphone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "iphone.png",
            "tags": [
                "lifestyle",
                "mobile"
            ],
            "__v": 0
        }
    ]
}
```

List tags:

GET /api/get_tags
```json

{
    "results": [
        "lifestyle",
        "motor",
        "mobile"
    ]
}
```

Show images

GET/images/:name

```
param: name
ej: http://localhost:3000/images/bici.jpg
```