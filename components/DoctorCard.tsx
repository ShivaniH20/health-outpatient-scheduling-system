
import React from 'react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6">
      <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-xl object-cover" />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-900">{doctor.name}</h3>
            <p className="text-indigo-600 font-medium">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 text-sm font-bold">
            ⭐ {doctor.rating}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-slate-500">
            <p className="font-semibold text-slate-700">{doctor.experience} Years Exp</p>
            <p>{doctor.location}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500">Consultation Fee</p>
            <p className="text-lg font-bold text-slate-900">₹{doctor.consultationFee}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {doctor.availability.map(time => (
            <span key={time} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 border border-slate-200">
              {time}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <button 
          onClick={() => onBook(doctor)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-100"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
