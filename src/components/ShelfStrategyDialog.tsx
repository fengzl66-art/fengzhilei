import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ChevronDown, Plus } from 'lucide-react';
import { Product, Constraint } from '../types';
import ConstraintDialog from './ConstraintDialog';

interface ShelfStrategyDialogProps {
  onClose: () => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    pu: '餐资源(90437)',
    sku: '火车联程首选(9049037378)(12.0)',
    skuQuantity: '',
    priority: 1,
    diversion: '',
    interaction: '普通购票外-销...',
    group: '分组',
    algoRecommended: true,
    selectedConstraints: [],
  },
  {
    id: '2',
    pu: '餐资源(90437)',
    sku: '惠享票权益(9049037307)(12.0)',
    skuQuantity: '',
    priority: 2,
    diversion: '',
    interaction: '普通购票外-销...',
    group: '分组',
    algoRecommended: true,
    selectedConstraints: [],
  },
  {
    id: '3',
    pu: '价购票资源(N002)',
    sku: '无保障订票(TWXN002012)(5.0)',
    skuQuantity: '',
    priority: 3,
    diversion: '',
    interaction: '普通购票外-销...',
    group: '分组',
    algoRecommended: true,
    selectedConstraints: [],
  }
];

export default function ShelfStrategyDialog({ onClose }: ShelfStrategyDialogProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isConstraintOpen, setIsConstraintOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const handleOpenConstraint = (productId: string) => {
    setActiveProductId(productId);
    setIsConstraintOpen(true);
  };

  const handleSaveConstraints = (constraints: Constraint[]) => {
    if (!activeProductId) return;
    
    setProducts(products.map(p => 
      p.id === activeProductId 
        ? { ...p, selectedConstraints: constraints } 
        : p
    ));
    setIsConstraintOpen(false);
  };

  const getConstraintDisplay = (product: Product) => {
    if (product.selectedConstraints.length === 0) return '请选择限制条件';
    const values = product.selectedConstraints
      .map(c => c.attributeValue)
      .filter(val => val && val.trim() !== '');
    
    if (values.length === 0) {
      const attributes = product.selectedConstraints
        .map(c => c.attribute)
        .filter(attr => attr !== '请选择');
      if (attributes.length > 0) return attributes.join(' / ');
      return '请选择限制条件';
    }
    return values.join(' / ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded shadow-2xl w-full max-w-[1280px] min-h-[640px] flex flex-col overflow-hidden relative border border-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 shrink-0 bg-white">
          <h2 className="text-sm font-semibold text-slate-800">货架调控策略</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded transition text-slate-400">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-slate-100 bg-white p-4 flex flex-col items-center">
             <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-tight">售卖位</div>
             <div className="bg-white border border-slate-100 rounded p-3 w-full text-center mb-6">
                <p className="text-[11px] text-slate-700 leading-normal mb-2">
                  2217- QCP-WS-TC-boo2-RevenueTab1 (营收tab)
                </p>
                <div className="mt-2 flex justify-center">
                  <button className="text-slate-300 hover:text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
             </div>

             <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                   <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-[11px] text-slate-600">算法推荐</span>
             </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-100 bg-white flex justify-center">
              <span className="text-xs font-bold text-slate-600">产品列表 (选择货架位投放的产品)</span>
            </div>
            
            <div className="p-4 flex-1 flex flex-col overflow-hidden">
              {/* Product Token Display Area */}
              <div className="mb-4 p-3 border border-slate-200 rounded-md bg-white">
                <div className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                  备注: 优选服务 (组合包)、黑鲸卡 (黑鲸卡、黑鲸兑换码)、极速出票、原价购票, 交通意外险、退票险: 注意添加原价购票产品
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="bg-slate-100 text-[11px] px-2 py-1 rounded flex items-center gap-2 text-slate-600 group">
                    <span>组合包(9049) / 汽车票套餐资源(9049037) / 惠享票权益(9049037307)(12.0)</span>
                    <X size={12} className="cursor-pointer text-slate-400 group-hover:text-red-500" />
                  </div>
                  <div className="bg-slate-100 text-[11px] px-2 py-1 rounded flex items-center gap-2 text-slate-600 group">
                    <span>组合包(9049) / 汽车票套餐资源(9049037) / 火车联程首选(9049037378)(12.0)</span>
                    <X size={12} className="cursor-pointer text-slate-400 group-hover:text-red-500" />
                  </div>
                   <div className="bg-slate-100 text-[11px] px-2 py-1 rounded flex items-center gap-2 text-slate-600 group">
                    <span>图文虚拟产品(TWXN) / 汽车票原价购票资源(TWXN002) / 无保障订票(TWXN002012)(5.0)</span>
                    <X size={12} className="cursor-pointer text-slate-400 group-hover:text-red-500" />
                  </div>
                  <ChevronDown size={14} className="ml-auto text-slate-300" />
                </div>
              </div>

              {/* Table with horizontal scroll */}
              <div className="border border-slate-200 flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                  <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold">
                    <tr>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-32">PU</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-48">SKU</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-24">SKU数量</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-16">优先级</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-28">产品分流</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-32">产品交互</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-20 text-center">分组</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-20 text-center">算法推荐</th>
                      <th className="px-2 py-2 border-r border-b border-slate-200 w-32 text-blue-600 font-extrabold text-center">限制条件</th>
                      <th className="px-2 py-2 border-b border-slate-200 w-20 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 divide-y divide-slate-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50 transition h-14">
                        <td className="px-2 py-1 border-r border-slate-200 text-[11px] leading-tight">{product.pu}</td>
                        <td className="px-2 py-1 border-r border-slate-200 text-[11px] leading-tight break-all">{product.sku}</td>
                        <td className="px-2 py-1 border-r border-slate-200">
                           <div className="border border-slate-200 h-8 rounded bg-white"></div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200 text-center">
                           <div className="border border-slate-200 h-8 flex items-center justify-center font-mono text-[11px]">{product.priority}</div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200">
                          <div className="border border-slate-200 h-8 px-2 flex items-center text-[10px] text-slate-300">请输入关键词</div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200">
                          <div className="border border-slate-200 h-8 px-2 flex items-center justify-between text-[11px]">
                            <span className="truncate">{product.interaction}</span>
                            <div className="flex gap-1 items-center">
                              <X size={10} className="text-slate-300" />
                              <ChevronDown size={12} className="text-slate-300" />
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200 text-center">
                          <div className="border border-slate-200 h-8 flex items-center justify-center text-[11px] text-slate-400">{product.group}</div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200 flex items-center justify-center h-14">
                           <div className={`w-8 h-4 rounded-full relative cursor-pointer p-0.5 ${product.algoRecommended ? 'bg-blue-600' : 'bg-slate-200'}`}>
                             <div className={`w-3 h-3 bg-white rounded-full transition-all ${product.algoRecommended ? 'ml-auto' : ''}`}></div>
                           </div>
                        </td>
                        <td className="px-2 py-1 border-r border-slate-200">
                           <div 
                             onClick={() => handleOpenConstraint(product.id)}
                             className="border border-slate-200 h-8 px-2 flex items-center justify-center text-[10px] text-slate-400 cursor-pointer overflow-hidden truncate whitespace-nowrap bg-white hover:border-blue-300 active:bg-slate-50 transition-colors"
                           >
                             {getConstraintDisplay(product)}
                           </div>
                        </td>
                        <td className="px-2 py-1 text-center">
                          <button className="text-blue-500 text-[11px] font-medium hover:underline">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar Layout Info */}
          <div className="w-40 border-l border-slate-100 bg-white p-4 flex flex-col">
             <div className="text-[11px] font-bold text-slate-400 mb-4 text-center uppercase tracking-tight shrink-0">货架交互</div>
             <div className="flex-1 flex items-center">
                <div className="w-full border border-slate-200 rounded p-1 shadow-sm">
                   <div className="aspect-[3/4] bg-slate-50 rounded flex items-end p-2 mb-2">
                       <div className="w-full h-8 bg-white border border-slate-100 rounded shadow-sm"></div>
                   </div>
                   <div className="flex items-center justify-between px-1.5 py-1.5 bg-white border border-slate-200 rounded">
                      <span className="text-[9px] text-slate-500 truncate">2.5页面平铺-中普通常购</span>
                      <ChevronDown size={12} className="text-slate-300" />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-50 flex justify-end gap-3 shrink-0">
          <button className="px-4 py-1.5 border border-slate-200 text-xs font-semibold rounded hover:bg-slate-50 transition">取消</button>
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition">保存</button>
        </div>

        {/* Constraint Pop-up */}
        <AnimatePresence>
          {isConstraintOpen && (
            <ConstraintDialog 
              onClose={() => setIsConstraintOpen(false)} 
              onSave={handleSaveConstraints}
              initialConstraints={products.find(p => p.id === activeProductId)?.selectedConstraints || []}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
