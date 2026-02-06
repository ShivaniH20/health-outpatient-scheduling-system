
import React, { useEffect, useState } from 'react';
import { getProjectArchitectureSummary } from '../services/geminiService';

const ProjectSpecs: React.FC = () => {
    const [summary, setSummary] = useState('Loading architecture insights...');

    useEffect(() => {
        getProjectArchitectureSummary().then(setSummary);
    }, []);

    const folders = [
        { name: 'apps/frontend', type: 'Next.js 14 (App Router)' },
        { name: 'apps/api-effect', type: 'Bun + EffectTS + Vitest' },
        { name: 'apps/api-kotlin', type: 'Spring Boot + Kotlin + JUnit 5' },
        { name: 'libs/shared-types', type: 'Zod Schemas / Protobuf' },
        { name: 'nx.json', type: 'Monorepo Configuration' },
    ];

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span>🏗️</span> Parallel Stack Strategy
                        </h2>
                        <div className="space-y-6 text-slate-600">
                            <p>To evaluate the best ecosystem for our high-concurrency Indian hospital setup, we are building parallel backend implementations:</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                                    <h3 className="font-bold text-orange-900 mb-2">EffectTS + Bun</h3>
                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                        <li>High-performance runtime</li>
                                        <li>Functional & Type-safe</li>
                                        <li>Fiber-based concurrency</li>
                                        <li>Ultra-fast startup (Bun)</li>
                                    </ul>
                                </div>
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                                    <h3 className="font-bold text-blue-900 mb-2">Kotlin + Spring Boot</h3>
                                    <ul className="text-sm space-y-1 list-disc list-inside">
                                        <li>Enterprise Standard</li>
                                        <li>Coroutines for concurrency</li>
                                        <li>Rich Ecosystem (Hibernate/JPA)</li>
                                        <li>Scalable for 1M+ users</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-900 p-8 rounded-3xl shadow-xl text-white">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span>📂</span> Monorepo Structure (Nx)
                        </h2>
                        <div className="font-mono text-sm space-y-2 opacity-90">
                            {folders.map(f => (
                                <div key={f.name} className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-indigo-400">/{f.name}</span>
                                    <span className="text-slate-500"># {f.type}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-3">AI Architecture View</h3>
                        <p className="text-sm opacity-90 italic leading-relaxed">
                            {summary}
                        </p>
                    </section>
                    
                    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">India Compliance Requirements</h3>
                        <ul className="space-y-3">
                            {['ABHA / ABDM Integration', 'UPI Auto-pay Support', 'Regional Language i18n', 'OTP-less Login (Aadhaar)'].map(item => (
                                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                                    <span className="text-green-500 font-bold">✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProjectSpecs;
