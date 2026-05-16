import React from 'react';

function ReservationCard({ res, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <span className="inline-block text-xs bg-indigo-50 text-indigo-600 font-semibold px-2.5 py-1 rounded-md mb-3">
          {res.areaName}
        </span>
        <h3 className="text-base font-bold text-slate-900 mb-1">{res.studentName}</h3>
        <p className="text-xs text-slate-500">🕒 Saat: {res.timeSlot}</p>
      </div>
      
      {     }
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-2">
        <button 
          onClick={() => onEdit(res)} 
          className="px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-md transition"
        >
          ✏️ Düzenle
        </button>
        <button 
          onClick={() => onDelete(res.id)} 
          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;