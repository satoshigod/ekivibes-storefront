import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/ekivibes/logo"
import CartMenu from "@modules/ekivibes/cart-menu"

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
          <LocalizedClientLink href="/categories/chalecos-airbag">Airbags</LocalizedClientLink>
          <LocalizedClientLink href="/categories/repuestos-y-accesorios-hit-air">Accesorios</LocalizedClientLink>
          <LocalizedClientLink href="/preguntas-frecuentes">FAQ</LocalizedClientLink>
        </div>
        <div className="nav-icons">
          <LocalizedClientLink href="/account" className="ic">
            Cuenta
          </LocalizedClientLink>
          <CartMenu />
        </div>
      </nav>
    </header>
  )
}
