
import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { MOCK_APPOINTMENTS } from '../constants';
import { generateReminderText } from '../services/geminiService';

const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'info'} | null>(null);
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const showToast = (msg: string, type: 'success' | 'info' = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const sendReminder = async (apt: Appointment, medium: 'SMS' | 'Email' | 'Both') => {
    setLoadingId(apt.id);
    const reminderText = await generateReminderText(apt, medium === 'Both' ? 'Email' : medium);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setAppointments(prev => prev.map(a => 
      a.id === apt.id ? { ...a, reminderSent: true, reminderType: medium } : a
    ));

    setLoadingId(null);
    showToast(`${medium} Reminder sent to ${apt.patientName}!`, 'success');
    console.log(`[SIMULATED ${medium}] to ${apt.patientPhone || apt.patientEmail}: ${reminderText}`);
  };

  const triggerAutomatedBatch = async () => {
    const unsent = appointments.filter(a => !a.reminderSent && a.status === AppointmentStatus.SCHEDULED);
    if (unsent.length === 0) {
      showToast("All eligible patients have already been reminded.", "info");
      return;
    }

    showToast(`Starting automated batch for ${unsent.length} appointments...`, 'info');
    
    for (const apt of unsent) {
        setLoadingId(apt.id);
        await new Promise(resolve => setTimeout(resolve, 800));
        setAppointments(prev => prev.map(a => 
            a.id === apt.id ? { ...a, reminderSent: true, reminderType: 'Both' } : a
        ));
    }
    setLoadingId(null);
    showToast("Automated batch reminders completed successfully.", 'success');
  };

  const handleReschedule = () => {
    if (!reschedulingApt || !newDate || !newTime) return;

    setAppointments(prev => prev.map(a => 
      a.id === reschedulingApt.id 
        ? { ...a, date: newDate, time: newTime, reminderSent: false } 
        : a
    ));

    showToast(`Appointment for ${reschedulingApt.patientName} rescheduled to ${newDate} at ${newTime}.`, 'success');
    setReschedulingApt(null);
    setNewDate('');
    setNewTime('');
  };

  return (
     <div className="space-y-6 max-w-6xl mx-auto py-4">
      {notification && (
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-2xl shadow-2xl text-white font-bold animate-in slide-in-from-right-10 z-50 ${
          notification.type === 'success' ? 'bg-emerald-600' : 'bg-indigo-600'
        }`}>
          <div className="flex items-center gap-3">
            <span>{notification.type === 'success' ? '✅' : 'ℹ️'}</span>
            {notification.msg}
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Reschedule Visit</h3>
              <button onClick={() => setReschedulingApt(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Patient</p>
                <p className="font-bold text-slate-800">{reschedulingApt.patientName}</p>
                <p className="text-sm text-indigo-600 font-medium">{reschedulingApt.doctorName} • {reschedulingApt.specialty}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Select New Date</label>
                <input 
                  type="date" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Select Available Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'].map(t => (
                    <button
                      key={t}
                      onClick={() => setNewTime(t)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        newTime === t 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex gap-3">
              <button 
                onClick={() => setReschedulingApt(null)}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={!newDate || !newTime}
                onClick={handleReschedule}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Appointment Queue</h2>
          <p className="text-slate-500">Manage patient visits and automated outreach.</p>
        </div>
        <button 
          onClick={triggerAutomatedBatch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
        >
          <span>⚡</span> Run Auto-Reminders
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Patient</th>
              <th className="px-6 py-4 font-semibold">Doctor / Specialty</th>
              <th className="px-6 py-4 font-semibold">Schedule</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Reminder</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{apt.patientName}</div>
                  <div className="text-xs text-slate-400">{apt.patientPhone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-700">{apt.doctorName}</div>
                  <div className="text-xs text-indigo-500 font-semibold">{apt.specialty}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-600">{apt.date}</div>
                  <div className="text-xs text-slate-400">{apt.time}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                    apt.status === AppointmentStatus.COMPLETED ? 'bg-green-100 text-green-700' :
                    apt.status === AppointmentStatus.SCHEDULED ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {apt.reminderSent ? (
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      Sent via {apt.reminderType}
                    </div>
                  ) : (
                    <div className="text-slate-300 text-xs italic">Not sent</div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {apt.status === AppointmentStatus.SCHEDULED && (
                      <button 
                        onClick={() => {
                          setReschedulingApt(apt);
                          setNewDate(apt.date);
                          setNewTime(apt.time);
                        }}
                        className="p-2 hover:bg-white rounded-lg border border-slate-200 text-sm"
                        title="Reschedule"
                      >
                        🔄
                      </button>
                    )}
                    <button 
                      disabled={loadingId === apt.id || apt.status !== AppointmentStatus.SCHEDULED}
                      onClick={() => sendReminder(apt, 'SMS')}
                      className="p-2 hover:bg-white rounded-lg border border-slate-200 text-sm"
                      title="Send SMS"
                    >
                      💬
                    </button>
                    <button 
                      disabled={loadingId === apt.id || apt.status !== AppointmentStatus.SCHEDULED}
                      onClick={() => sendReminder(apt, 'Email')}
                      className="p-2 hover:bg-white rounded-lg border border-slate-200 text-sm"
                      title="Send Email"
                    >
                      📧
                    </button>
                    {loadingId === apt.id && (
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <h3 className="text-xl font-bold mb-2">Automated Rules</h3>
              <p className="text-slate-400 text-sm mb-6">Current logic for SevaHealth automated outreach:</p>
              <ul className="space-y-4">
                  {[
                      { t: 'T-24h Reminder', d: 'Sent via SMS & WhatsApp for confirmed slots.' },
                      { t: 'T-2h Final Call', d: 'Automated IVR/SMS for peak-hour efficiency.' },
                      { t: 'Post-Visit Feedback', d: 'Email survey sent 4 hours after checkout.' }
                  ].map((rule, i) => (
                      <li key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-xs text-indigo-400">0{i+1}</span>
                          <div>
                              <div className="font-bold text-sm">{rule.t}</div>
                              <div className="text-xs text-slate-500">{rule.d}</div>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Patient Engagement Stats</h3>
              <div className="space-y-6">
                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500 font-medium">SMS Delivery Rate</span>
                          <span className="text-indigo-600 font-bold">98.2%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[98.2%]"></div>
                      </div>
                  </div>
                  <div>
                      <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-500 font-medium">Email Open Rate</span>
                          <span className="text-indigo-600 font-bold">64.5%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full w-[64.5%]"></div>
                      </div>
                  </div>
                  <div className="pt-4 flex gap-4">
                      <div className="flex-1 bg-indigo-50 p-4 rounded-2xl text-center">
                          <div className="text-2xl font-bold text-indigo-700">12k</div>
                          <div className="text-[10px] text-indigo-400 uppercase font-bold">Reminders/Mo</div>
                      </div>
                      <div className="flex-1 bg-emerald-50 p-4 rounded-2xl text-center">
                          <div className="text-2xl font-bold text-emerald-700">15%</div>
                          <div className="text-[10px] text-emerald-400 uppercase font-bold">Reduction in No-Shows</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AppointmentManager;
