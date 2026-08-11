// Detalles de producto (URLs /public/ + tablas). Sin base64 — sin crashes.
export type DetailSection = { title: string; imgs: string[] }
export type DetailTable = { title: string; img?: string; head: string[]; rows: string[][]; fine: string }
export type ProductDetail = { sections: DetailSection[]; note?: string; tables?: DetailTable[] }

const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "chaleco-airbag-vh-ninos": {
    "sections": [
      {
        "title": "Características del producto",
        "imgs": [
          "/product-details/vh-ninos-det1.jpg"
        ]
      },
      {
        "title": "Sistema de protección por airbag",
        "imgs": [
          "/product-details/vh-ninos-det2.jpg"
        ]
      },
      {
        "title": "Configuración del airbag",
        "imgs": [
          "/product-details/vh-ninos-det3.jpg",
          "/product-details/vh-ninos-det5.jpg"
        ]
      }
    ],
    "note": "No uses una llave de resina agrietada o deformada. Si detectas algún daño, reemplázala.",
    "tables": [
      {
        "title": "Tabla de tallas (cm)",
        "head": [
          "Talla",
          "Estatura",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "Niños (XS)",
            "125–135",
            "60–70",
            "50–60"
          ]
        ],
        "fine": "Los estilos y especificaciones pueden cambiar sin previo aviso."
      },
      {
        "title": "Dimensiones del producto (cm)",
        "img": "/product-details/vh-ninos-det4.jpg",
        "head": [
          "Talla",
          "Largo (frente / espalda)",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "Niños (XS)",
            "48 / 50",
            "45",
            "37"
          ]
        ],
        "fine": "Medidas tomadas con la prenda extendida; puede haber variación de algunos centímetros."
      }
    ]
  },
  "chaleco-airbag-mlv3-h-ninos": {
    "sections": [
      {
        "title": "Características del producto",
        "imgs": [
          "/product-details/mlv3h-ninos-det1.jpg"
        ]
      },
      {
        "title": "Sistema de protección por airbag",
        "imgs": [
          "/product-details/mlv3h-ninos-det2.jpg"
        ]
      },
      {
        "title": "Configuración del airbag",
        "imgs": [
          "/product-details/mlv3h-ninos-det3.jpg"
        ]
      }
    ],
    "tables": [
      {
        "title": "Tabla de tallas (cm)",
        "head": [
          "Talla",
          "Estatura",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "Niños (2XS)",
            "125–135",
            "60–66",
            "50–55"
          ]
        ],
        "fine": "Los estilos y especificaciones pueden cambiar sin previo aviso."
      }
    ]
  },
  "chaleco-airbag-vh-juvenil-adulto": {
    "sections": [
      {
        "title": "Características del producto",
        "imgs": [
          "/product-details/vh-adult-det4.jpg"
        ]
      },
      {
        "title": "Sistema de protección por airbag",
        "imgs": [
          "/product-details/vh-adult-det3.jpg"
        ]
      },
      {
        "title": "Configuración del airbag",
        "imgs": [
          "/product-details/vh-adult-det2.jpg"
        ]
      }
    ],
    "tables": [
      {
        "title": "Tabla de tallas (cm)",
        "head": [
          "Talla",
          "Estatura",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "S",
            "150–165",
            "80",
            "66–74"
          ],
          [
            "M",
            "160–175",
            "85",
            "72–80"
          ],
          [
            "L",
            "165–180",
            "90",
            "78–86"
          ]
        ],
        "fine": "Los estilos y especificaciones pueden cambiar sin previo aviso."
      },
      {
        "title": "Dimensiones del producto (cm)",
        "img": "/product-details/vh-adult-det1.jpg",
        "head": [
          "Talla",
          "Largo (frente / espalda)",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "S",
            "53 / 55",
            "45",
            "37"
          ],
          [
            "M",
            "57 / 59",
            "50",
            "43"
          ],
          [
            "L",
            "62 / 64",
            "56",
            "49"
          ]
        ],
        "fine": "Medidas tomadas con la prenda extendida; puede haber variación de algunos centímetros por las características de la tela."
      }
    ]
  },
  "chaleco-airbag-mlv3-h-juvenil-adulto": {
    "sections": [
      {
        "title": "Características del producto",
        "imgs": [
          "/product-details/mlv3h-adult-det1.jpg"
        ]
      },
      {
        "title": "Sistema de protección por airbag",
        "imgs": [
          "/product-details/mlv3h-adult-det2.jpg"
        ]
      },
      {
        "title": "Configuración del airbag",
        "imgs": [
          "/product-details/mlv3h-adult-det3.jpg"
        ]
      }
    ],
    "tables": [
      {
        "title": "Tabla de tallas (cm)",
        "head": [
          "Talla",
          "Estatura",
          "Contorno de pecho",
          "Cintura"
        ],
        "rows": [
          [
            "XS",
            "135–150",
            "70",
            "55–65"
          ],
          [
            "S",
            "150–165",
            "80",
            "60–80"
          ],
          [
            "M",
            "160–180",
            "85",
            "70–90"
          ],
          [
            "L",
            "175–190",
            "90",
            "85–105"
          ]
        ],
        "fine": "Los estilos y especificaciones pueden cambiar sin previo aviso."
      },
      {
        "title": "Dimensiones del producto (cm)",
        "img": "/product-details/mlv3h-adult-dim.jpg",
        "head": [
          "Talla",
          "Largo (frente)",
          "Largo (espalda)",
          "Dobladillo"
        ],
        "rows": [
          [
            "XS",
            "48",
            "46",
            "43"
          ],
          [
            "S",
            "52",
            "55",
            "51"
          ],
          [
            "M",
            "59",
            "60",
            "57"
          ],
          [
            "L",
            "63",
            "64",
            "63"
          ]
        ],
        "fine": "Dimensiones externas. Medidas tomadas con la prenda extendida; puede haber variación de algunos centímetros."
      }
    ]
  }
}

export default PRODUCT_DETAILS
