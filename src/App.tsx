/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ShelfStrategyDialog from './components/ShelfStrategyDialog';

export default function App() {
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col font-sans overflow-hidden relative">
      {/* Top Navigation from theme */}
      <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs italic">AI</span>
          </div>
          <span className="font-semibold text-slate-800">智选货架管理系统 (Smart Shelf Management)</span>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-xs text-slate-400 font-medium">Operational</div>
           <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {/* Decorative background grid and content (blurred as in theme) */}
        <div className="absolute inset-0 p-6 grid grid-cols-4 gap-6 opacity-30 pointer-events-none">
          <div className="col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="h-10 w-48 bg-slate-100 rounded mb-4"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200"></div>
              <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200"></div>
              <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200"></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-100 rounded"></div>
              <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
              <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>

        <button
          id="open-strategy-btn"
          onClick={() => setIsMainDialogOpen(true)}
          className="z-20 px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center gap-2"
        >
          <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
          打开货架策略弹框
        </button>
      </div>

      {/* Footer from theme */}
      <footer className="h-8 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[10px] text-slate-400 shrink-0 uppercase tracking-wider">
        <div>Engine Status: Operational</div>
        <div className="flex gap-4">
          <span>Version 2.4.1</span>
          <span>Cloud Sync Active</span>
        </div>
      </footer>

      <AnimatePresence>
        {isMainDialogOpen && (
          <ShelfStrategyDialog onClose={() => setIsMainDialogOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

