import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/ekivibes/logo"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <Logo color="#000000" height={36} className="lh" />
            <span className="lt">EKIVIBES</span>
          </div>
          <p className="footer-desc">
            Tienda especializada en equitación para Colombia. Productos
            originales, asesoría experta y envío a todo el país.
          </p>
        </div>
        <div className="footer-col">
          <h5>Categorías</h5>
          <ul>
            <li><LocalizedClientLink href="/categories/chalecos-airbag">Airbags</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/categories/repuestos-y-accesorios-hit-air">Accesorios</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store">Cascos</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store">Guantes</LocalizedClientLink></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Ayuda</h5>
          <ul>
            <li>Guía de tallas</li>
            <li>Envíos y devoluciones</li>
            <li>Contacto</li>
            <li><a href="/preguntas-frecuentes" className="footer-link">Preguntas frecuentes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li>Medellín, Colombia</li>
            <li>hola@ekivibes.co</li>
            <li>@ekivibes.horse</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Ekivibes Colombia. Todos los derechos reservados.</span>
        <span>Amor en cada bocado 🐎</span>
      </div>
    </footer>
  )
}
