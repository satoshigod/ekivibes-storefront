import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/ekivibes/logo"
import DistributorRegistrationForm from "@modules/business/components/distributor-form"

export const metadata: Metadata = {
  title: "Hazte Distribuidor | Ekivibes",
  description:
    "Únete a la red de distribuidores de Ekivibes en Colombia. Vende chalecos airbag Hit-Air y equipamiento ecuestre con condiciones especiales para tiendas y caballerizas.",
}

const FEATURES = [
  "25 años de efectividad comprobada en el mundo",
  "Sin batería, sin mantenimiento",
  "Inflado en 0.1 segundos",
  "Enganche Easy-Click, fácil de usar",
  "Producto certificado y con respaldo de marca",
  "Distribuidor exclusivo autorizado en Colombia",
]

const BENEFITS = [
  "Precios especiales por volumen para reventa",
  "Zona de trabajo definida, sin competir con otro distribuidor en tu área",
  "Material de marca y apoyo para exhibir el producto en tu tienda",
  "Capacitación sobre el producto y su uso correcto",
  "Acompañamiento comercial directo con el equipo Ekivibes",
]

export default function HazteDistribuidor() {
  return (
    <>
      <div className="hero">
        <div className="hero-horse">
          <Logo color="#ffffff" height={200} />
        </div>
        <div className="hero-c">
          <h1>Hazte Distribuidor</h1>
          <p>
            Únete a la red de distribuidores Ekivibes y lleva la mejor protección ecuestre a tu
            zona.
          </p>
          <a href="#formulario">
            <button className="btn-gold">Quiero ser distribuidor</button>
          </a>
        </div>
      </div>

      <div className="ekv-page">
        <div className="ekv-page-body">
          <section className="ekv-page-section">
            <h2>¿Ya eres distribuidor Ekivibes?</h2>
            <p>
              Si ya tienes una cuenta comercial con nosotros, ingresa directamente para hacer tus
              pedidos. No es necesario que vuelvas a registrarte.
            </p>
            <div style={{ marginTop: "1rem" }}>
              <LocalizedClientLink href="/account" className="ekv-btn-primary">
                Iniciar sesión
              </LocalizedClientLink>
            </div>
          </section>

          <section className="ekv-page-section ekv-section-tip">
            <h2>Por qué Ekivibes</h2>
            <ul className="ekv-page-list">
              {FEATURES.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section className="ekv-page-section">
            <h2>Beneficios de ser distribuidor</h2>
            <ul className="ekv-page-list">
              {BENEFITS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="ekv-page-section" id="formulario">
            <h2>Consulta condiciones y disponibilidad en tu zona</h2>
            <p>
              Cuéntanos un poco sobre tu tienda o negocio. Estaremos encantados de resolver
              todas tus dudas.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <DistributorRegistrationForm />
            </div>
          </section>

          <div className="ekv-page-cta">
            <p>¿Prefieres hablar directamente con nosotros?</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <a
                href="https://wa.me/573001234567?text=Hola%2C%20quiero%20ser%20distribuidor%20de%20Ekivibes"
                target="_blank"
                rel="noopener noreferrer"
                className="ekv-btn-primary"
              >
                WhatsApp
              </a>
              <a href="mailto:hola@ekivibes.co?subject=Quiero%20ser%20distribuidor" className="ekv-faq-mail">
                hola@ekivibes.co
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
