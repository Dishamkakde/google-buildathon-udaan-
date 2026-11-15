import React from 'react';
import { RequestHelpForm } from '../../components/assistance/RequestHelpForm';
import { Eye, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const ReportNeedPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-udaan-blue-soft text-udaan-blue px-3 py-1 rounded-full text-xs font-bold">
          <Eye className="w-4 h-4 text-udaan-teal" />
          <span>{t.reportNeed}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-udaan-navy tracking-tight">
          Help Connect Someone in Distress
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
          If you have seen an abandoned elderly person, a child in need of care, or an unsheltered individual in Bengaluru, submit their approximate location and circumstances. UDAAN will coordinate verified outreach.
        </p>
      </div>

      {/* Main Request Form in citizen / volunteer mode */}
      <RequestHelpForm defaultRole="citizen" />
    </div>
  );
};
