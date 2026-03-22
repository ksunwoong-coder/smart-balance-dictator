interface FormSectionProps {
  title: string;
  description?: string;
  optional?: boolean;
  children: React.ReactNode;
}

export default function FormSection({ title, description, optional, children }: FormSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          {optional && (
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              Optional
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
