import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Acerca de Hit-Air | Ekivibes",
  description:
    "Conoce el sistema airbag Hit-Air: cómo funciona, qué protege y por qué es el chaleco de protección más usado en equitación a nivel mundial.",
}

export default function AcercaDeHitAir() {
  return (
    <div className="ekv-page">
      <div className="ekv-page-header">
        <h1 className="ekv-page-title">Acerca de Hit-Air</h1>
        <p className="ekv-page-subtitle">
          El sistema airbag líder mundial en protección ecuestre, fabricado en Japón desde 1985
        </p>
      </div>

      <div className="ekv-page-body">
        <section className="ekv-page-section">
          <h2>¿Qué es Hit-Air?</h2>
          <p>
            Hit-Air es un sistema de chaleco airbag fabricado por Mugen Denko Co., Ltd. en Japón.
            Desde 1985 es el líder mundial en protección activa para equitación y motociclismo,
            con presencia en Asia, Europa, Australia y América. En Colombia, Ekivibes es el
            distribuidor exclusivo para la línea ecuestre.
          </p>
          <p>
            A diferencia de los protectores rígidos tradicionales, el chaleco Hit-Air es ligero,
            cómodo y flexible. Se usa como una prenda normal sobre la ropa de equitación y solo
            se activa en el momento de una caída, en menos de medio segundo.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>¿Cómo funciona?</h2>
          <p>
            El chaleco se conecta a la montura mediante un cable en espiral (lanyard) que se fija
            a las argollas del sillín. En el momento de una caída, cuando el jinete se separa del
            caballo, el cable se estira y activa automáticamente el mecanismo: el cartucho de CO₂
            se perfora y el airbag se infla en menos de 0,5 segundos.
          </p>
          <p>
            No es necesario hacer nada: el sistema es completamente automático. Una fuerza mínima
            de 25 a 30 kg es necesaria para activarlo, lo que hace prácticamente imposible una
            activación accidental.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>¿Qué protege?</h2>
          <p>
            Al inflarse, el chaleco envuelve completamente el torso del jinete, protegiendo las
            zonas más vulnerables en una caída:
          </p>
          <ul className="ekv-page-list">
            <li>Cuello y nuca</li>
            <li>Pecho y costillas</li>
            <li>Espalda</li>
            <li>Sacro y coxis</li>
          </ul>
          <p>
            La sensación al inflarse es la de un gran cojín firme que te rodea, absorbiendo el
            impacto antes de que llegues al suelo.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>Certificación</h2>
          <p>
            Los chalecos Hit-Air cumplen la norma europea <strong>EN 1621-4:2013</strong>,
            la certificación más exigente para protectores airbag en equitación y motociclismo
            dentro de la Unión Europea.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>Reutilizable</h2>
          <p>
            Después de una caída leve, puedes rearmar el chaleco tú mismo en pocos minutos:
            vacías el airbag, pliegas los cojines y reemplazas el cartucho de CO₂ por uno nuevo
            original Hit-Air. El chaleco queda listo para usar nuevamente.
          </p>
          <p>
            En caso de una caída fuerte, recomendamos enviarlo a revisión técnica para verificar
            el estado completo del chaleco y el mecanismo.
          </p>
        </section>

        <section className="ekv-page-section">
          <h2>¿Por qué Hit-Air?</h2>
          <ul className="ekv-page-list">
            <li>Más de 25 años de experiencia y desarrollo en Japón</li>
            <li>Activación automática en menos de 0,5 segundos</li>
            <li>Ligero y cómodo: entre 1,2 y 1,5 kg según el modelo</li>
            <li>Reutilizable después de una caída</li>
            <li>Certificación CE EN 1621-4:2013</li>
            <li>Distribuidor exclusivo para Colombia: Ekivibes</li>
          </ul>
        </section>

        <div className="ekv-page-cta">
          <p>¿Tienes preguntas sobre el chaleco airbag?</p>
          <LocalizedClientLink href="/preguntas-frecuentes" className="ekv-btn-primary">
            Ver preguntas frecuentes
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
