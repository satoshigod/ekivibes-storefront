import { Metadata } from "next"
import BusinessRegistrationForm from "@modules/business/components/registration-form"

export const metadata: Metadata = {
  title: "Compras Empresariales | Ekivibes",
  description:
    "¿Tienes un club de equitación, caballeriza o escuela? Regístrate como cliente empresarial de Ekivibes y accede a condiciones especiales en chalecos airbag Hit-Air.",
}

export default function ComprasEmpresariales() {
  return (
    <div className="ekv-page">
      <div className="ekv-page-header">
        <h1 className="ekv-page-title">Compras Empresariales</h1>
        <p className="ekv-page-subtitle">
          Condiciones especiales para clubes, caballerizas, escuelas de equitación y revendedores
        </p>
      </div>

      <div className="ekv-page-body">
        <section className="ekv-page-section">
          <h2>¿Ya compraste con nosotros?</h2>
          <p>
            Si tu empresa u organización ya ha realizado compras en Ekivibes, puedes
            acceder directamente con tu cuenta. No es necesario registrarte de nuevo.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <a href="/account" className="ekv-btn-primary">
              Iniciar sesión
            </a>
          </div>
        </section>

        <section className="ekv-page-section">
          <h2>Beneficios para clientes empresariales</h2>
          <ul className="ekv-page-list">
            <li>Precios especiales por volumen en chalecos airbag Hit-Air</li>
            <li>Asesoría personalizada para equipar a tu grupo o escuela</li>
            <li>Prioridad en stock durante temporada de competición</li>
            <li>Factura a nombre de la empresa</li>
            <li>Envío a toda Colombia con seguimiento</li>
            <li>Atención directa por WhatsApp con tu asesor</li>
          </ul>
        </section>

        <section className="ekv-page-section ekv-section-tip">
          <h2>¿Para quién es este programa?</h2>
          <ul className="ekv-page-list">
            <li>Clubes de equitación y jumping</li>
            <li>Caballerizas y centros ecuestres</li>
            <li>Escuelas y academias de equitación</li>
            <li>Federaciones departamentales o nacionales</li>
            <li>Tiendas y revendedores de equipamiento ecuestre</li>
            <li>Organizadores de eventos y competencias</li>
          </ul>
        </section>

        <section className="ekv-page-section">
          <h2>Regístrate como cliente empresarial</h2>
          <p>
            Completa el formulario con los datos de tu empresa u organización. Nuestro equipo
            revisará tu solicitud y te contactará en máximo 2 días hábiles.
          </p>
          <div style={{ marginTop: "1.5rem" }}>
            <BusinessRegistrationForm />
          </div>
        </section>

        <div className="ekv-page-cta">
          <p>¿Prefieres hablar directamente con nosotros?</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <a
              href="https://wa.me/573001234567?text=Hola%2C%20quiero%20registrarme%20como%20cliente%20empresarial%20de%20Ekivibes"
              target="_blank"
              rel="noopener noreferrer"
              className="ekv-btn-primary"
            >
              WhatsApp
            </a>
            <a href="mailto:hola@ekivibes.co?subject=Registro%20cliente%20empresarial" className="ekv-faq-mail">
              hola@ekivibes.co
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
