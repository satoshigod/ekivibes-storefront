import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/ekivibes/logo"

export default function Nav() {
  return (
    <header>
      <div className="topbar">
        <span>Envío a toda Colombia</span>
        <span>Productos originales Hit-Air</span>
        <span>Asesoría experta en equitación</span>
      </div>
      <nav className="nav">
        <LocalizedClientLink href="/" className="logo">
          <Logo height={46} />
          <span className="logo-text">EKIVIBES</span>
        </LocalizedClientLink>
        <div className="nav-menu">
          <LocalizedClientLink href="/store">Tienda</LocalizedClientLink>
          <LocalizedClientLink href="/store">Airbags</LocalizedClientLink>
          <LocalizedClientLink href="/store">Accesorios</LocalizedClientLink>
        </div>
        <div className="nav-icons">
          <LocalizedClientLink href="/account" className="ic">
            Cuenta
          </LocalizedClientLink>
          <LocalizedClientLink href="/cart" className="ic">
            Carrito
          </LocalizedClientLink>
        </div>
      </nav>
    </header>
  )
}
