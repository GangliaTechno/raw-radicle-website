export function ProductDetailsTable({ product, specs = [] }) {
  const rows = specs.length ? specs.map((spec) => [spec.title, spec.desc]) : [
    ['Weight', '60g'],
    ['Cocoa Content', product.cocoa],
    ['Botanical Blend', product.content],
    ['Dietary Info', product.type.includes('Milk') ? 'Contains milk and soy' : 'Contains soy; may contain traces of milk'],
    ['Storage Temperature', '18C - 24C'],
    ['Manufacturing Location', 'MUTBI, Manipal, Karnataka'],
  ]

  return (
    <table className="rr-detail-table">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th>{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
