import type { SpecRow } from "@/types";

/** جدول مشخصات فنی محصول. */
export function SpecsTable({ specs }: { specs: SpecRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-line">
          {specs.map((row) => (
            <tr key={row.label} className="odd:bg-surface even:bg-canvas">
              <th className="w-2/5 p-3 text-start font-medium text-muted">{row.label}</th>
              <td className="p-3 text-ink">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
