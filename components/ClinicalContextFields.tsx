import type { ClinicalContextData } from '@/lib/types';

interface Props {
  data: ClinicalContextData;
  onChange: (updated: ClinicalContextData) => void;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
    </div>
  );
}

export default function ClinicalContextFields({ data, onChange }: Props) {
  function update(field: keyof ClinicalContextData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField
          label="Primary Diagnosis"
          value={data.primaryDiagnosis}
          onChange={(v) => update('primaryDiagnosis', v)}
          placeholder="e.g. Cerebellar stroke"
        />
        <TextField
          label="Lesion Location"
          value={data.lesionLocation}
          onChange={(v) => update('lesionLocation', v)}
          placeholder="e.g. Right cerebellum"
        />
        <TextField
          label="Symptom Onset"
          value={data.symptomOnset}
          onChange={(v) => update('symptomOnset', v)}
          placeholder="e.g. 2 weeks ago"
        />
        <TextField
          label="Duration"
          value={data.symptomDuration}
          onChange={(v) => update('symptomDuration', v)}
          placeholder="e.g. Subacute"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Relevant PMH</label>
        <textarea
          rows={3}
          value={data.relevantPmh}
          onChange={(e) => update('relevantPmh', e.target.value)}
          placeholder="e.g. Peripheral neuropathy, prior vestibular neuritis, visual impairment..."
          className="w-full px-3 py-2 text-sm text-slate-800 border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
        />
      </div>
    </div>
  );
}
