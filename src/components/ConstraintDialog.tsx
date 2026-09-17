import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trash2, ChevronDown, Plus } from 'lucide-react';
import { Constraint } from '../types';

interface ConstraintDialogProps {
  onClose: () => void;
  onSave: (constraints: Constraint[]) => void;
  initialConstraints: Constraint[];
}

export default function ConstraintDialog({ onClose, onSave, initialConstraints }: ConstraintDialogProps) {
  const [constraints, setConstraints] = useState<Constraint[]>(
    initialConstraints.length > 0 
      ? initialConstraints 
      : [{
          id: '1',
          combination: '且',
          attribute: '请选择',
          condition: '请选择',
          attributeValue: '',
          dataType: '请选择'
        }]
  );

  const [activeDropdown, setActiveDropdown] = useState<{id: string, field: string} | null>(null);

  const updateConstraint = (id: string, field: keyof Constraint, value: string) => {
    setConstraints(constraints.map(c => c.id === id ? { ...c, [field]: value } : c));
    setActiveDropdown(null);
  };

  const ATTRIBUTE_OPTIONS = ['票面区间', '优惠券区间'];

  const addConstraint = () => {
    const newConstraint: Constraint = {
      id: Date.now().toString(),
      combination: '且',
      attribute: '请选择',
      condition: '请选择',
      attributeValue: '',
      dataType: '请选择'
    };
    setConstraints([...constraints, newConstraint]);
  };

  const removeConstraint = (id: string) => {
    setConstraints(constraints.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden border border-slate-200 animate-fade-in"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold text-slate-700">限制条件配置</h3>
            <span className="text-[10px] text-blue-600 font-bold px-1.5 py-0.5 bg-blue-50 rounded uppercase tracking-tight">Configuration</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-full transition text-slate-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100 italic">
                <tr>
                  <th className="px-4 py-3 border-r border-slate-100 w-28">且或组合</th>
                  <th className="px-4 py-3 border-r border-slate-100">限制属性</th>
                  <th className="px-4 py-3 border-r border-slate-100">限制条件</th>
                  <th className="px-4 py-3 border-r border-slate-100">限制属性值</th>
                  <th className="px-4 py-3 border-r border-slate-100">数据类型</th>
                  <th className="px-4 py-3 text-center w-14">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {constraints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="px-4 py-3 border-r border-slate-100">
                      <div className="border border-slate-200 rounded-lg px-2 py-2 flex items-center justify-between cursor-pointer bg-white hover:border-blue-400 transition shadow-sm">
                        <span className="text-[11px] font-bold text-slate-700">{c.combination}</span>
                        <ChevronDown size={14} className="text-slate-300" />
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-100">
                       <div 
                        onClick={() => setActiveDropdown({id: c.id, field: 'attribute'})}
                        className="border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-white hover:border-blue-400 transition shadow-sm relative"
                       >
                        <span className={`text-[11px] font-medium ${c.attribute === '请选择' ? 'text-gray-400' : 'text-slate-700'}`}>{c.attribute}</span>
                        <ChevronDown size={14} className="text-slate-300" />
                        
                        {activeDropdown?.id === c.id && activeDropdown.field === 'attribute' && (
                          <div className="absolute top-full left-0 w-full bg-white border border-slate-200 shadow-xl rounded-lg z-50 mt-1 overflow-hidden">
                            {ATTRIBUTE_OPTIONS.map(opt => (
                              <div 
                                key={opt}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateConstraint(c.id, 'attribute', opt);
                                }}
                                className="px-3 py-2 hover:bg-blue-50 text-[11px] text-slate-600 transition-colors"
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-100">
                       <div className="border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-white hover:border-blue-400 transition shadow-sm">
                        <span className="text-[11px] text-slate-400 font-medium">{c.condition}</span>
                        <ChevronDown size={14} className="text-slate-300" />
                      </div>
                    </td>
                    <td className="px-4 py-3 border-r border-slate-100">
                      <input 
                        type="text" 
                        placeholder="Value..." 
                        value={c.attributeValue}
                        onChange={(e) => updateConstraint(c.id, 'attributeValue', e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.05)] transition bg-white"
                      />
                    </td>
                    <td className="px-4 py-3 border-r border-slate-100">
                       <div className="border border-slate-200 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-white hover:border-blue-400 transition shadow-sm">
                        <span className="text-[11px] text-slate-400 font-medium">{c.dataType}</span>
                        <ChevronDown size={14} className="text-slate-300" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button 
                        onClick={() => removeConstraint(c.id)}
                        className="p-2 border border-slate-100 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button 
            onClick={addConstraint}
            className="mt-6 w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50/50 transition flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
          >
            <Plus size={18} />
            <span>添加限制条件 (Add Restriction)</span>
          </button>
        </div>

        <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition active:bg-slate-100">取消</button>
          <button onClick={() => onSave(constraints)} className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] active:scale-95">保存</button>
        </div>
      </motion.div>
    </div>
  );
}
