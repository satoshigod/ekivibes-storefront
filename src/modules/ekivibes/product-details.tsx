import PRODUCT_DETAILS from "./product-details-data"

export default function EkivibesProductDetails({
  handle,
}: {
  handle?: string | null
}) {
  const det = handle ? PRODUCT_DETAILS[handle] : undefined
  if (!det) return null

  return (
    <div className="content-container">
      <div className="pdp-details">
        {det.sections.map((s) => (
          <div key={s.title}>
            <h2 className="pdp-d-title">{s.title}</h2>
            {s.imgs.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={s.title} className="pdp-d-img" />
            ))}
          </div>
        ))}

        {det.note && <div className="pdp-d-note">{det.note}</div>}

        {det.tables?.map((t) => (
          <div key={t.title}>
            <h2 className="pdp-d-title">{t.title}</h2>
            {t.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.img} alt={t.title} className="pdp-d-img" />
            )}
            <table className="pdp-d-table">
              <thead>
                <tr>
                  {t.head.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pdp-d-fine">{t.fine}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
