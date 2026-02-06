
import React, { useState } from 'react';
import { getTriageAdvice } from '../services/geminiService';

const TriageAssistant: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTriage = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    const result = await getTriageAdvice(symptoms);
    setAdvice(result || 'No advice received.');
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span>🤖</span> AI Health Triage Assistant
        </h2>
        <p className="text-slate-500 mb-6">Describe your symptoms to get a quick recommendation for which specialist you should visit.</p>
        
        <div className="space-y-4">
          <textarea 
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. I have a sharp pain in my lower back for 2 days..."
            className="w-full h-32 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
          />
          <button 
            onClick={handleTriage}
            disabled={loading || !symptoms}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
              loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
            }`}
          >
            {loading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
          </button>
        </div>

        {advice && (
          <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-bold text-indigo-900 mb-2">Recommendation:</h3>
            <div className="prose prose-slate prose-indigo">
              <p className="text-indigo-800 whitespace-pre-wrap">{advice}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100">
            <span className="block text-2xl mb-2">⚡</span>
            <h4 className="font-bold text-slate-800">Instant Triage</h4>
            <p className="text-sm text-slate-500">Fast tracking for urgent symptoms based on AI patterns.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100">
            <span className="block text-2xl mb-2">📍</span>
            <h4 className="font-bold text-slate-800">Smart Mapping</h4>
            <p className="text-sm text-slate-500">Automatic matching with local specialists and hospital wings.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100">
            <span className="block text-2xl mb-2">📋</span>
            <h4 className="font-bold text-slate-800">Pre-Diagnosis</h4>
            <p className="text-sm text-slate-500">Gathering preliminary history to save doctor's time.</p>
        </div>
      </div>
    </div>
  );
};

export default TriageAssistant;
