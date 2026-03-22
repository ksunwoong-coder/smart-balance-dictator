import NumericField from './NumericField';
import type { DynamicTestData } from '@/lib/types';

interface Props {
  data: DynamicTestData;
  onChange: (updated: DynamicTestData) => void;
}

export default function DynamicTestFields({ data, onChange }: Props) {
  function update(field: keyof DynamicTestData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Front Left</p>
          <NumericField label="COP Area" unit="cm²" value={data.frontLeftArea} onChange={(v) => update('frontLeftArea', v)} />
        </div>
        <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Front Right</p>
          <NumericField label="COP Area" unit="cm²" value={data.frontRightArea} onChange={(v) => update('frontRightArea', v)} />
        </div>
        <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Back Left</p>
          <NumericField label="COP Area" unit="cm²" value={data.backLeftArea} onChange={(v) => update('backLeftArea', v)} />
        </div>
        <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Back Right</p>
          <NumericField label="COP Area" unit="cm²" value={data.backRightArea} onChange={(v) => update('backRightArea', v)} />
        </div>
      </div>
      <div className="bg-teal-50 rounded-md p-3 border border-teal-100">
        <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">Total LOS Area</p>
        <NumericField label="Total area" unit="cm²" value={data.totalLosArea} onChange={(v) => update('totalLosArea', v)} />
      </div>
    </div>
  );
}
