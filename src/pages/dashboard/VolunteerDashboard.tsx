import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  Send,
  PlusCircle,
  AlertTriangle,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useAuth } from '../../context/AuthContext';
import { VolunteerTask } from '../../types';
import { RequestHelpForm } from '../../components/assistance/RequestHelpForm';

export const VolunteerDashboard: React.FC = () => {
  const { volunteerTasks, updateVolunteerTaskStatus, volunteers } = useUDAAN();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'tasks' | 'completed' | 'report'>('tasks');
  const [completionNotes, setCompletionNotes] = useState<Record<string, string>>({});
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);

  const myVolunteerProfile =
    volunteers.find(v => v.name === currentUser.name) || volunteers[0];

  const pendingTasks = volunteerTasks.filter(t => t.status !== 'Completed');
  const completedTasks = volunteerTasks.filter(t => t.status === 'Completed');

  const handleAcceptTask = (taskId: string) => {
    updateVolunteerTaskStatus(taskId, 'Accepted', 'Volunteer accepted mission dispatch.');
  };

  const handleStartTask = (taskId: string) => {
    updateVolunteerTaskStatus(taskId, 'In Progress', 'Volunteer is on the ground at the coordinates.');
  };

  const handleFinishTask = (taskId: string) => {
    const note = completionNotes[taskId] || 'Delivered assistance and verified recipient safety.';
    updateVolunteerTaskStatus(taskId, 'Completed', note);
    setCompletingTaskId(null);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-udaan-teal text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Role C
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
              Volunteer Field Operations Dashboard
            </h1>
          </div>
          <p className="text-slate-500">
            Responder: <strong>{currentUser.name}</strong> | Assigned Sector:{' '}
            <strong>{myVolunteerProfile.assignedZones.join(', ')}</strong> | Completed Interventions:{' '}
            <strong className="text-emerald-700">{myVolunteerProfile.completedInterventions}</strong>
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'tasks' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assigned Tasks ({pendingTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'completed' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed History ({completedTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'report' ? 'bg-udaan-navy text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Report Person in Need
          </button>
        </div>
      </div>

      {/* TAB 1: Assigned Tasks */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 font-bold">{task.caseId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      task.urgency === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  <strong className="block text-sm font-bold text-slate-900 leading-snug">
                    {task.title}
                  </strong>
                  <p className="text-slate-600 leading-relaxed text-[11px] font-light">
                    {task.description}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1 space-y-0.5 border-t border-slate-100">
                    <p>📍 Location: <strong className="text-slate-700">{task.location}</strong></p>
                    <p>👤 Beneficiary: <strong className="text-slate-700">{task.beneficiaryName}</strong></p>
                    {task.notes && <p className="italic text-slate-600">Note: {task.notes}</p>}
                  </div>
                </div>

                {/* Task Actions */}
                <div className="pt-3 border-t border-slate-100">
                  {task.status === 'Assigned' && (
                    <button
                      onClick={() => handleAcceptTask(task.id)}
                      className="w-full py-2 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition"
                    >
                      Accept Assignment
                    </button>
                  )}

                  {task.status === 'Accepted' && (
                    <button
                      onClick={() => handleStartTask(task.id)}
                      className="w-full py-2 bg-udaan-blue hover:bg-blue-700 text-white font-bold rounded-xl transition"
                    >
                      Start Task (Mark In Progress)
                    </button>
                  )}

                  {task.status === 'In Progress' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Enter delivery completion notes..."
                        value={completionNotes[task.id] || ''}
                        onChange={(e) =>
                          setCompletionNotes({ ...completionNotes, [task.id]: e.target.value })
                        }
                        className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                      />
                      <button
                        onClick={() => handleFinishTask(task.id)}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
                      >
                        Confirm Task Completed ✓
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Completed History */}
      {activeTab === 'completed' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
          <h3 className="font-bold text-sm text-udaan-navy">Completed Mission Interventions</h3>
          <div className="space-y-2">
            {completedTasks.map((t) => (
              <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">{t.title}</strong>
                  <span className="text-[11px] text-slate-500">Case: {t.caseId} | Location: {t.location}</span>
                  {t.notes && <p className="text-[10px] text-emerald-700 italic mt-0.5">Note: {t.notes}</p>}
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Report Person in Need */}
      {activeTab === 'report' && (
        <div className="space-y-4">
          <RequestHelpForm defaultRole="volunteer" />
        </div>
      )}
    </div>
  );
};
