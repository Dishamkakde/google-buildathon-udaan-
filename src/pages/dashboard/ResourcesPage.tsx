import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  ShieldCheck,
  Edit2,
  Check,
  X,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { AssistanceCategory, ResourceItem } from '../../types';

export const ResourcesPage: React.FC = () => {
  const { resources, updateResourceCapacity, addResource, organisations } = useUDAAN();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [editCapacityVal, setEditCapacityVal] = useState<number>(0);

  // Add Resource Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newResName, setNewResName] = useState('');
  const [newResOrgId, setNewResOrgId] = useState(organisations[0]?.id || '');
  const [newResCategory, setNewResCategory] = useState<AssistanceCategory>('emergency_shelter');
  const [newResCapacity, setNewResCapacity] = useState(25);
  const [newResUnit, setNewResUnit] = useState('beds');
  const [newResZone, setNewResZone] = useState('Majestic / KSR Hub');
  const [newResDesc, setNewResDesc] = useState('');
  const [newResContact, setNewResContact] = useState('+91 80 2500 0000');

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.organisationName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || res.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStartEdit = (res: ResourceItem) => {
    setEditingResourceId(res.id);
    setEditCapacityVal(res.availableCapacity);
  };

  const handleSaveEdit = (resId: string) => {
    updateResourceCapacity(resId, editCapacityVal);
    setEditingResourceId(null);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    const org = organisations.find(o => o.id === newResOrgId) || organisations[0];

    addResource({
      organisationId: org.id,
      organisationName: org.name,
      category: newResCategory,
      name: newResName,
      description: newResDesc || 'Verified humanitarian support facility.',
      location: {
        lat: 12.9778,
        lng: 77.5713,
        zone: newResZone,
        address: `${newResZone}, Bengaluru`
      },
      totalCapacity: newResCapacity,
      availableCapacity: newResCapacity,
      unit: newResUnit,
      verifiedStatus: 'verified',
      verifiedAt: new Date().toISOString(),
      operatingHours: '24/7 Operations',
      accessibilityFeatures: ['Wheelchair accessible', 'Doctor on call'],
      eligibilityCriteria: ['Individuals in need of assistance'],
      emergencyContact: newResContact
    });

    setIsAddModalOpen(false);
    setNewResName('');
    setNewResDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-udaan-navy">
            Resource Network & Live Capacity
          </h1>
          <p className="text-xs text-slate-500">
            Publish and manage verified shelter beds, food distribution quantities, and hospital desks.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-udaan-teal" />
          <span>Add New Resource Facility</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 flex flex-col md:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources by facility name or partner..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="all">All Resource Types</option>
          <option value="emergency_shelter">Emergency Shelter</option>
          <option value="food_water">Food & Water</option>
          <option value="medical_support">Medical Support</option>
          <option value="identity_docs">Legal Documentation</option>
          <option value="child_protection">Child Protection</option>
          <option value="skill_development">Skills & Livelihood</option>
        </select>
      </div>

      {/* Resource Cards Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Facility Name</th>
                <th className="p-3.5">Partner Organisation</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Zone</th>
                <th className="p-3.5">Capacity (Available / Total)</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5 text-right">Update Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((res) => {
                const isEditing = editingResourceId === res.id;
                return (
                  <tr key={res.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5">
                      <strong className="text-slate-900 block font-semibold">{res.name}</strong>
                      <span className="text-[10px] text-slate-500 font-mono">{res.emergencyContact}</span>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{res.organisationName}</td>
                    <td className="p-3.5 capitalize text-slate-600">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {res.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600">{res.location.zone.split('/')[0]}</td>
                    <td className="p-3.5 font-bold">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={res.totalCapacity}
                            value={editCapacityVal}
                            onChange={(e) => setEditCapacityVal(Number(e.target.value))}
                            className="w-16 p-1 border border-udaan-blue rounded text-xs font-bold text-center"
                          />
                          <span className="text-slate-500 text-[11px]">/ {res.totalCapacity} {res.unit}</span>
                        </div>
                      ) : (
                        <span className="text-udaan-teal text-sm">
                          {res.availableCapacity} / {res.totalCapacity} <span className="text-xs text-slate-500 font-normal">{res.unit}</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleSaveEdit(res.id)}
                            className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingResourceId(null)}
                            className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(res)}
                          className="px-2.5 py-1 text-xs font-semibold text-udaan-blue hover:bg-udaan-blue-soft rounded-lg transition"
                        >
                          Edit Capacity
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Resource Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-udaan-navy">Publish New Resource Facility</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Partner Organisation:</label>
                <select
                  value={newResOrgId}
                  onChange={(e) => setNewResOrgId(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl bg-white font-medium focus:outline-none"
                >
                  {organisations.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Facility / Service Name:</label>
                <input
                  type="text"
                  required
                  value={newResName}
                  onChange={(e) => setNewResName(e.target.value)}
                  placeholder="e.g. Yeshwanthpur Transit Night Shelter"
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category:</label>
                  <select
                    value={newResCategory}
                    onChange={(e) => setNewResCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="emergency_shelter">Emergency Shelter</option>
                    <option value="food_water">Food & Water</option>
                    <option value="medical_support">Medical Support</option>
                    <option value="identity_docs">Legal Documentation</option>
                    <option value="child_protection">Child Protection</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Zone:</label>
                  <select
                    value={newResZone}
                    onChange={(e) => setNewResZone(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white focus:outline-none"
                  >
                    <option value="Majestic / KSR Hub">Majestic / KSR Hub</option>
                    <option value="Kalasipalya / KR Market">Kalasipalya / KR Market</option>
                    <option value="Shivajinagar / Cantonment">Shivajinagar / Cantonment</option>
                    <option value="Yeshwanthpur Junction">Yeshwanthpur Junction</option>
                    <option value="Peenya Industrial Area">Peenya Industrial Area</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Total Capacity:</label>
                  <input
                    type="number"
                    min={1}
                    value={newResCapacity}
                    onChange={(e) => setNewResCapacity(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Capacity Unit:</label>
                  <input
                    type="text"
                    value={newResUnit}
                    onChange={(e) => setNewResUnit(e.target.value)}
                    placeholder="beds / meals per day"
                    className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Helpline / Emergency Phone:</label>
                <input
                  type="text"
                  value={newResContact}
                  onChange={(e) => setNewResContact(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition"
                >
                  Publish Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
