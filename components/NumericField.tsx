interface NumericFieldProps {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

export default function NumericField({ label, unit, value, onChange, required }: NumericFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <div className="flex items-center border border-slate-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 bg-white">
        <input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="flex-1 px-3 py-2 text-sm text-slate-800 outline-none bg-transparent min-w-0"
          placeholder="0.00"
        />
        <span className="px-2 py-2 text-xs text-slate-400 bg-slate-50 border-l border-slate-200 whitespace-nowrap">
          {unit}
        </span>
      </div>
    </div>
  );
}
