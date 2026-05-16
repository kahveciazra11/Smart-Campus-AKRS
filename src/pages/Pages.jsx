import { useState } from 'react';
import ReservationCard from '../components/Components';
import { createReservationObject } from '../interfaces/Interfaces';

function SmartCampus() {
  
  const [reservations, setReservations] = useState([
    { id: 1, studentName: 'Azra Yılmaz', areaName: 'Mühendislik Lab-1', timeSlot: '10:00 - 12:00' },
    { id: 2, studentName: 'Ezgi Demir', areaName: 'Merkezi Kütüphane Oda-3', timeSlot: '14:00 - 16:00' },
  ]);

  const [studentName, setStudentName] = useState('');
  const [areaName, setAreaName] = useState('Mühendislik Lab-1');
  

  const [startHour, setStartHour] = useState('09:00');
  const [endHour, setEndHour] = useState('10:00');
  
 
  const [errorMessage, setErrorMessage] = useState('');

  const hoursList = [];
  for (let i = 0; i <= 24; i++) {
    const formattedHour = i < 10 ? `0${i}:00` : `${i}:00`;
    hoursList.push(formattedHour);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentName) {
      setErrorMessage('❌ Lütfen öğrenci adı soyadı alanını doldurun!');
      return;
    }

   
    const startNum = parseInt(startHour.split(':')[0]);
    const endNum = parseInt(endHour.split(':')[0]);

    if (startNum >= endNum) {
      setErrorMessage('❌ Bitiş saati, başlangıç saatinden sonra olmalıdır!');
      return;
    }

    const newTimeSlot = `${startHour} - ${endHour}`;


    const isConflicting = reservations.some(res => {
      if (res.id === editingId || res.areaName !== areaName) return false;

      
      const [resStartStr, resEndStr] = res.timeSlot.split(' - ');
      const resStart = parseInt(resStartStr.split(':')[0]);
      const resEnd = parseInt(resEndStr.split(':')[0]);

      
      return startNum < resEnd && endNum > resStart;
    });

    if (isConflicting) {
      setErrorMessage(`⚠️ Çakışma Tespit Edildi! "${areaName}" alanında seçtiğiniz saat aralığında zaten başka bir rezervasyon var.`);
      return;
    }

    if (editingId) {
      setReservations(reservations.map(res => 
        res.id === editingId ? createReservationObject(editingId, studentName, areaName, newTimeSlot) : res
      ));
      setEditingId(null);
    } else {
      const newRes = createReservationObject(null, studentName, areaName, newTimeSlot);
      setReservations([...reservations, newRes]);
    }

    setStudentName('');
    setStartHour('09:00');
    setEndHour('10:00');
  };

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (res) => {
    setEditingId(res.id);
    setStudentName(res.studentName);
    setAreaName(res.areaName);
    
    
    const [start, end] = res.timeSlot.split(' - ');
    setStartHour(start);
    setEndHour(end);
    setErrorMessage('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Rezervasyonu iptal etmek istediğinize emin misiniz?')) {
      setReservations(reservations.filter(res => res.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 font-sans antialiased text-slate-800 transition-colors duration-300">
      
      {   }
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg py-6 px-8 mb-10 rounded-b-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight m-0 p-0">🏢 Smart Campus (AKRS)</h1>
            <p className="text-indigo-100 text-xs mt-1">Geleceğin Kampüs Yönetim ve Rezervasyon Sistemi</p>
          </div>
          <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            Aktif Panel
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {  }
        <section className="bg-white p-6 rounded-2xl shadow-md shadow-sky-100/50 border border-slate-100 h-fit transition hover:shadow-lg">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            {editingId ? '🔄 Rezervasyonu Düzenle' : '✨ Yeni Rezervasyon Oluştur'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Öğrenci Adı Soyadı</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Örn: Rabia Kaya"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Kampüs Alanı</label>
              <select
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-700"
              >
                <option value="Mühendislik Lab-1">Mühendislik Lab-1</option>
                <option value="Merkezi Kütüphane Oda-3">Merkezi Kütüphane Oda-3</option>
                <option value="Yapay Zeka Araştırma Merkezi">Yapay Zeka Araştırma Merkezi</option>
                <option value="Teknokent Toplantı Salonu">Teknokent Toplantı Salonu</option>
              </select>
            </div>

            { }
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Başlangıç</label>
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  {hoursList.slice(0, 24).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Bitiş</label>
                <select
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                >
                  {hoursList.slice(1).map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </select>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl text-xs font-medium bg-rose-50 text-rose-600 border border-rose-100 shadow-sm animate-pulse">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-[0.98] ${
                editingId 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-100 hover:opacity-95' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-100 hover:opacity-95'
              }`}
            >
              {editingId ? 'Değişiklikleri Uygula' : 'Güvenli Rezervasyon Yap'}
            </button>
          </form>
        </section>

        { }
        <section className="md:col-span-2 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">📜 Canlı Rezervasyon Listesi</h2>
            <span className="text-xs bg-sky-200/70 text-indigo-700 px-3 py-1 rounded-full font-bold">
              {reservations.length} Aktif Slot
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reservations.map((res) => (
              <ReservationCard 
                key={res.id} 
                res={res} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SmartCampus;