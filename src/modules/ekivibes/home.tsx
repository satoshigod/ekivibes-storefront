import { listProducts } from "@lib/data/products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EkivibesProductCard from "@modules/ekivibes/product-card"
import Logo from "@modules/ekivibes/logo"

const CATS = [
  { label: "Ropa",        slug: "ropa",       icon: "/cats/ropa.svg" },
  { label: "Guantes",     slug: "guantes",    icon: "/cats/guantes.svg" },
  { label: "Airbag",      slug: "airbag",     icon: "/cats/airbag.svg" },
  { label: "Cascos",      slug: "cascos",     icon: "/cats/cascos.svg" },
  { label: "Protección",  slug: "proteccion", icon: "/cats/proteccion.svg" },
  { label: "Chaps",       slug: "chaps",      icon: "/cats/chaps.svg" },
  { label: "Accesorios",  slug: "accesorios", icon: "/cats/accesorios.svg" },
]

export default async function EkivibesHome({
  countryCode,
}: {
  countryCode: string
}) {
  const { response } = await listProducts({
    countryCode,
    queryParams: { limit: 12 },
  })
  const products = response.products

  return (
    <>
      <div className="hero">
        <div className="hero-horse">
          <Logo color="#ffffff" height={260} />
        </div>
        <div className="hero-c">
          <h1>Temporada de Competición</h1>
          <p>
            Eleva tu equipamiento con las mejores marcas de equitación.
            Entrega en toda Colombia.
          </p>
          <LocalizedClientLink href="/store">
            <button className="btn-gold">Comprar ahora</button>
          </LocalizedClientLink>
        </div>
      </div>

      <div className="section">
        <div className="cats">
          {CATS.map((c) => (
            <LocalizedClientLink
              href={`/categories/${c.slug}`}
              className="cat"
              key={c.label}
            >
              <div className="cat-circle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.icon}
                  alt={c.label}
                  style={{ width: 48, height: 48, objectFit: "contain" }}
                />
              </div>
              <div className="cat-label">{c.label}</div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>

      {products.length > 0 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2 className="section-title">Nuestros destacados</h2>
            <LocalizedClientLink className="section-link" href="/store">
              Ver todo →
            </LocalizedClientLink>
          </div>
          <div className="grid">
            {products.slice(0, 4).map((p) => (
              <EkivibesProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="banner">
        <div className="banner-horse">
          <Logo color="#ffffff" height={220} />
        </div>
        <div className="banner-c">
          <h2>Seguridad Certificada</h2>
          <p>
            Chalecos airbag Hit-Air, la protección líder para tu monta
            diaria y de competición.
          </p>
          <LocalizedClientLink href="/categories/airbag">
            <button className="btn-gold">Ver airbags</button>
          </LocalizedClientLink>
        </div>
      </div>

      {products.length > 0 && (
        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Chalecos airbag &amp; accesorios</h2>
            <LocalizedClientLink className="section-link" href="/store">
              Ver todo →
            </LocalizedClientLink>
          </div>
          <div className="grid">
            {products.map((p) => (
              <EkivibesProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
