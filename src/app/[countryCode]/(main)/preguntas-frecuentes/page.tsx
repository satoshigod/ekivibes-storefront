import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Ekivibes",
  description:
    "Resolvemos tus dudas sobre los chalecos airbag Hit-Air para equitación: tallas, uso, recarga, mantenimiento y envíos en Colombia.",
}

const faqs = [
  {
    categoria: "Nuestros Productos",
    preguntas: [
      {
        q: "¿Cómo elijo la talla correcta del chaleco airbag?",
        a: "Para elegir la talla correcta debes considerar primero tu estatura, que debe estar dentro del rango recomendado para cada talla, y luego tus medidas tomadas encima de la ropa de equitación. Si tienes dudas o estás entre dos tallas, contáctanos y te ayudamos a elegir. El chaleco no debe quedar ni muy holgado ni muy ajustado: debe quedar plano sobre el cuerpo para distribuir bien la protección.",
      },
      {
        q: "¿El chaleco Hit-Air está certificado para equitación?",
        a: "Sí. Los chalecos Hit-Air cuentan con certificación CE y cumplen la norma EN 1621-4:2013, que es la más exigente dentro de la Unión Europea para protección airbag tanto en equitación como en motociclismo.",
      },
      {
        q: "¿Practico equitación y moto. ¿Puedo usar el mismo chaleco para ambas disciplinas?",
        a: "Sí, siempre que uses los accesorios correctos para cada actividad. Para equitación necesitas el cable de conexión específico que se fija a las argollas de la montura. El chaleco como tal es el mismo.",
      },
      {
        q: "¿Puedo usar cualquier cartucho de CO₂ con mi chaleco Hit-Air?",
        a: "No. Debes usar exclusivamente cartuchos originales Hit-Air, ya que la calidad del metal y el sello están diseñados específicamente para estos chalecos. Usar cartuchos de otra marca puede impedir el despliegue del airbag en una caída o dañar el mecanismo del chasis. En Ekivibes vendemos los cartuchos originales de 50cc y 60cc compatibles con nuestros modelos.",
      },
      {
        q: "¿Los cartuchos tienen fecha de vencimiento?",
        a: "En la etiqueta del cartucho se indica una vida útil orientativa de 5 años, pero esto no significa que expiren pasado ese plazo. Pasado este tiempo, recomendamos hacer una inspección visual para detectar signos de corrosión u oxidación, y pesar el cartucho para verificar que no haya pérdida de gas. Los cartuchos Hit-Air están fabricados en una sola pieza sin juntas, por lo que no pierden su carga.",
      },
      {
        q: "¿Cuánto pesa el chaleco?",
        a: "Los chalecos Hit-Air son de los más ligeros del mercado: su peso oscila entre 1,2 y 1,5 kg según la talla y el modelo, lo que los hace muy cómodos para usar durante toda la jornada de entrenamiento o competición.",
      },
    ],
  },
  {
    categoria: "Activación y Funcionamiento",
    preguntas: [
      {
        q: "¿Cómo funciona el sistema de activación en equitación?",
        a: "El chaleco se conecta a la montura mediante un cable que se fija a las argollas del sillín. Ante una caída, cuando el cable se estira más allá del límite, el mecanismo se activa automáticamente y el airbag se despliega en milisegundos. No es necesario que el jinete haga nada.",
      },
      {
        q: "¿Qué pasa si me olvido de desconectar el cable al desmontar?",
        a: "El sistema requiere una fuerza mínima de 25 a 30 kg para activarse. Al desmontar, sentirás tensión en el cable antes de que se active, lo que te recordará desconectarlo. Con el uso habitual, conectar y desconectar el cable se vuelve un hábito automático.",
      },
      {
        q: "¿Qué partes del cuerpo protege el airbag?",
        a: "El chaleco protege las zonas más vulnerables en una caída: cuello, pecho, espalda, sacro y coxis. Hit-Air lleva más de 25 años desarrollando esta tecnología y su eficacia en la protección de estas áreas está ampliamente documentada.",
      },
      {
        q: "¿El airbag puede activarse de forma accidental?",
        a: "No. La fuerza mínima requerida para activar el mecanismo (25-30 kg) hace que una activación accidental sea prácticamente imposible en condiciones normales de uso.",
      },
    ],
  },
  {
    categoria: "Uso y Recarga",
    preguntas: [
      {
        q: "¿El chaleco es reutilizable después de una caída?",
        a: "Sí. Después de una caída leve puedes rearmarlo tú mismo en pocos minutos: vacía el airbag presionando los cojines, pliégalos, inserta el tornillo de rearmado con la llave Allen, coloca el ball-key y enrosca un cartucho nuevo. Ante una caída fuerte, te recomendamos enviarlo a revisión para verificar el estado del chaleco y el mecanismo.",
      },
      {
        q: "¿El cartucho es recargable?",
        a: "No. El cartucho es perforado por el mecanismo al activarse, liberando el CO₂. Después de una activación debes reemplazarlo por un cartucho nuevo original Hit-Air.",
      },
      {
        q: "¿Puedo llevar el chaleco en el avión?",
        a: "Sí, puedes llevar tu chaleco y hasta 3-4 cartuchos en el equipaje de bodega, siempre separados del chaleco y notificando a la aerolínea con anticipación. Algunas líneas pueden requerir una hoja de seguridad del producto; si la necesitas, contáctanos.",
      },
      {
        q: "¿Puedo llevar algo encima del chaleco (mochila, chaleco de competición)?",
        a: "En general sí, siempre que no interfiera con el despliegue del airbag. Si llevas una mochila, debe ser ligera y con las correas poco ajustadas para no restringir la inflación del chaleco.",
      },
    ],
  },
  {
    categoria: "Mantenimiento y Cuidados",
    preguntas: [
      {
        q: "¿Cómo lavo el chaleco?",
        a: "El chaleco NO puede lavarse a máquina ni sumergirse en agua, ya que esto dañaría los componentes metálicos y la membrana interior. Para limpiarlo: usa un cepillo suave con un poco de agua jabonosa o una esponja húmeda, frota suavemente las zonas sucias y deja secar en una percha en lugar aireado. Limpiarlo con frecuencia evita que la suciedad penetre en el tejido.",
      },
      {
        q: "¿Cómo guardo el chaleco cuando no lo uso?",
        a: "Guárdalo en un lugar seco, alejado del calor y la humedad. Lo ideal es guardarlo en su funda protectora, plano o colgado en una percha, para evitar doblar la membrana interior. El chaleco Hit-Air es flexible y se puede plegar fácilmente si necesitas transportarlo.",
      },
      {
        q: "¿Cuánto dura el chaleco?",
        a: "Con uso normal y mantenimiento adecuado, los chalecos Hit-Air están diseñados para durar varios años. Te recomendamos revisar el estado del chaleco antes de cada uso y enviarlo a revisión técnica cada 2 o 3 años, o antes si se ha activado frecuentemente.",
      },
      {
        q: "El anillo rojo de mi chaleco se rompió, ¿es grave?",
        a: "No afecta el funcionamiento del airbag. El anillo rojo es una guía que facilita el rearmado, pero el chaleco funciona perfectamente sin él. Asegúrate siempre de que esté en posición alta (no sobre el ball-key) para que el mecanismo pueda activarse correctamente.",
      },
    ],
  },
  {
    categoria: "Pedidos y Envíos",
    preguntas: [
      {
        q: "¿Hacen envíos a todo Colombia?",
        a: "Sí, realizamos envíos a todo el territorio nacional colombiano.",
      },
      {
        q: "¿Puedo cambiar el chaleco si la talla no me queda bien?",
        a: "Sí. Contáctanos dentro de los 14 días después de recibir tu pedido. El chaleco debe estar sin usar (solo probado), con etiquetas y en su empaque original. Escríbenos al WhatsApp o correo y coordinamos el cambio.",
      },
      {
        q: "¿Tienen garantía los productos?",
        a: "Los chalecos Hit-Air tienen 2 años de garantía de fabricante sobre el mecanismo y la membrana interior bajo uso normal. Los daños textiles por caídas o mal uso no están cubiertos por la garantía.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="ekv-faq-page">
      <div className="ekv-faq-header">
        <h1 className="ekv-faq-title">Preguntas Frecuentes</h1>
        <p className="ekv-faq-subtitle">
          Todo lo que necesitas saber sobre los chalecos airbag Hit-Air para equitación
        </p>
      </div>

      <div className="ekv-faq-body">
        {faqs.map((bloque) => (
          <section key={bloque.categoria} className="ekv-faq-section">
            <h2 className="ekv-faq-cat">{bloque.categoria}</h2>
            <div className="ekv-faq-list">
              {bloque.preguntas.map((item, i) => (
                <details key={i} className="ekv-faq-item">
                  <summary className="ekv-faq-q">{item.q}</summary>
                  <p className="ekv-faq-a">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="ekv-faq-contact">
          <p>¿No encontraste la respuesta que buscabas?</p>
          <div className="ekv-faq-contact-links">
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="ekv-faq-wa"
            >
              Escríbenos por WhatsApp
            </a>
            <a href="mailto:contacto@ekivibes.co" className="ekv-faq-mail">
              contacto@ekivibes.co
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
