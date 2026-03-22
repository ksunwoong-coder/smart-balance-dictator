import NumericField from './NumericField';
import type { PlantarPressureData } from '@/lib/types';

interface Props {
  data: PlantarPressureData;
  onChange: (updated: PlantarPressureData) => void;
}

function SumIndicator({ a, b }: { a: string; b: string }) {
  const sum = (parseFloat(a) || 0) + (parseFloat(b) || 0);
  const isOk = Math.abs(sum - 100) < 0.5;
  const hasInput = a !== '' || b !== '';
  if (!hasInput) return null;
  return (
    <p className={`text-xs mt-1 font-medium ${isOk ? 'text-teal-600' : 'text-amber-600'}`}>
      Sum: {sum.toFixed(1)}% {isOk ? '✓' : '— should equal 100%'}
    </p>
  );
}

export default function PlantarPressureFields({ data, onChange }: Props) {
  function update(field: keyof PlantarPressureData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Left / Right</p>
        <div className="grid grid-cols-2 gap-3">
          <NumericField label="Left" unit="%" value={data.leftPercent} onChange={(v) => update('leftPercent', v)} />
          <NumericField label="Right" unit="%" value={data.rightPercent} onChange={(v) => update('rightPercent', v)} />
        </div>
        <SumIndicator a={data.leftPercent} b={data.rightPercent} />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Front / Back</p>
        <div className="grid grid-cols-2 gap-3">
          <NumericField label="Front" unit="%" value={data.frontPercent} onChange={(v) => update('frontPercent', v)} />
          <NumericField label="Back" unit="%" value={data.backPercent} onChange={(v) => update('backPercent', v)} />
        </div>
        <SumIndicator a={data.frontPercent} b={data.backPercent} />
      </div>
    </div>
  );
}
