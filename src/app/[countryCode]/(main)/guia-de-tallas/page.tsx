import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guía de Tallas | Ekivibes",
  description:
    "Encuentra tu talla correcta para los chalecos airbag Hit-Air de equitación. Tablas de tallas por modelo con estatura, pecho y cintura.",
}

export default function GuiaDeTallas() {
  return (
    <div className="ekv-page">
      <div className="ekv-page-header">
        <h1 className="ekv-page-title">Guía de Tallas</h1>
        <p className="ekv-page-subtitle">
          Chalecos airbag Hit-Air para equitación — medidas en centímetros
        </p>
      </div>

      <div className="ekv-page-body">
        <section className="ekv-page-section">
          <h2>¿Cómo tomar las medidas?</h2>
          <p>
            Toma las medidas <strong>encima de tu ropa de equitación</strong>, no sobre ropa de calle.
            Para la talla, considera primero tu <strong>estatura</strong> dentro del rango recomendado,
            y luego verifica que el pecho y la cintura también entren. Si estás entre dos tallas,
            escríbenos y te ayudamos a elegir.
          </p>
          <p>
            El chaleco debe quedar <strong>plano sobre el cuerpo</strong>, sin quedar muy ajustado
            ni muy holgado. Un chaleco demasiado ajustado puede dañarse al inflarse.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>Chaleco Airbag VH (Juvenil / Adulto)</h2>
          <p>Chaleco estilo gilet cerrado, el modelo más popular para equitación.</p>
          <div className="ekv-table-wrap">
            <table className="ekv-table">
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Estatura (cm)</th>
                  <th>Pecho (cm)</th>
                  <th>Cintura (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>S</td><td>150 – 165</td><td>80</td><td>60 – 80</td></tr>
                <tr><td>M</td><td>160 – 180</td><td>85</td><td>70 – 90</td></tr>
                <tr><td>L</td><td>175 – 190</td><td>90</td><td>85 – 105</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ekv-page-section">
          <h2>Chaleco Airbag MLV3-H (Juvenil / Adulto)</h2>
          <p>Chaleco tipo arnés con cinturón ajustable, mayor cobertura de protección.</p>
          <div className="ekv-table-wrap">
            <table className="ekv-table">
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Estatura (cm)</th>
                  <th>Pecho (cm)</th>
                  <th>Cintura (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>145 – 155</td><td>75</td><td>60 – 68</td></tr>
                <tr><td>S</td><td>150 – 165</td><td>80</td><td>66 – 74</td></tr>
                <tr><td>M</td><td>160 – 175</td><td>85</td><td>72 – 80</td></tr>
                <tr><td>L</td><td>170 – 185</td><td>90</td><td>84 – 92</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ekv-page-section">
          <h2>Chaleco Airbag VH Niños</h2>
          <p>Talla única. Diseñado para niños en iniciación ecuestre.</p>
          <div className="ekv-table-wrap">
            <table className="ekv-table">
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Estatura (cm)</th>
                  <th>Pecho (cm)</th>
                  <th>Cintura (cm)</th>
                  <th>Peso mínimo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>125 – 135</td><td>65</td><td>50 – 55</td><td>18 kg</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ekv-page-section">
          <h2>Chaleco Airbag MLV3-H Niños</h2>
          <p>Talla única. Mayor cobertura para niños, ideal para salto y cross.</p>
          <div className="ekv-table-wrap">
            <table className="ekv-table">
              <thead>
                <tr>
                  <th>Talla</th>
                  <th>Estatura (cm)</th>
                  <th>Pecho (cm)</th>
                  <th>Cintura (cm)</th>
                  <th>Peso mínimo</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>2XS</td><td>125 – 135</td><td>65</td><td>50 – 60</td><td>18 kg</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="ekv-page-section ekv-section-tip">
          <h2>Consejos para elegir bien</h2>
          <ul className="ekv-page-list">
            <li>Si tu pecho o cintura están en el límite superior de una talla, sube a la siguiente.</li>
            <li>El chaleco no debe quedar ajustado al máximo: al inflarse necesita espacio.</li>
            <li>Para niños en crecimiento, considera la talla siguiente si está cerca del límite de estatura.</li>
            <li>¿Usas chaqueta gruesa en invierno? Toma las medidas con ella puesta.</li>
          </ul>
        </section>

        <div className="ekv-page-cta">
          <p>¿Tienes dudas con tu talla?</p>
          <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" className="ekv-btn-primary">
            Consúltanos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
