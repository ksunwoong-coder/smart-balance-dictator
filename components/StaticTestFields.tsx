import NumericField from './NumericField';
import type { StaticTestData, CopCondition } from '@/lib/types';

interface Props {
  data: StaticTestData;
  onChange: (updated: StaticTestData) => void;
}

const CONDITIONS: { key: keyof StaticTestData; label: string; required?: boolean }[] = [
  { key: 'firmEO', label: 'Firm / Eyes Open', required: true },
  { key: 'firmEC', label: 'Firm / Eyes Closed' },
  { key: 'foamEO', label: 'Foam / Eyes Open' },
  { key: 'foamEC', label: 'Foam / Eyes Closed' },
];

export default function StaticTestFields({ data, onChange }: Props) {
  function updateCondition(condKey: keyof StaticTestData, field: keyof CopCondition, value: string) {
    onChange({ ...data, [condKey]: { ...data[condKey], [field]: value } });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CONDITIONS.map(({ key, label, required }) => (
        <div key={key} className="bg-slate-50 rounded-md p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</p>
          <div className="space-y-2">
            <NumericField
              label="Path Length"
              unit="cm"
              value={data[key].pathLength}
              onChange={(v) => updateCondition(key, 'pathLength', v)}
              required={required}
            />
            <NumericField
              label="Sway Area"
              unit="cm²"
              value={data[key].swayArea}
              onChange={(v) => updateCondition(key, 'swayArea', v)}
            />
            <NumericField
              label="Mean Velocity"
              unit="cm/s"
              value={data[key].meanVelocity}
              onChange={(v) => updateCondition(key, 'meanVelocity', v)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
