
import { Doctor, Appointment, AppointmentStatus } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Ananya Sharma',
    specialty: 'Cardiologist',
    experience: 12,
    rating: 4.8,
    consultationFee: 800,
    location: 'Fortis Hospital, Gurugram',
    image: 'https://picsum.photos/seed/doc1/200/200',
    availability: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: '2',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Dermatologist',
    experience: 8,
    rating: 4.5,
    consultationFee: 600,
    location: 'Max Healthcare, Saket',
    image: 'https://picsum.photos/seed/doc2/200/200',
    availability: ['10:00 AM', '12:00 PM', '03:00 PM', '05:00 PM']
  },
  {
    id: '3',
    name: 'Dr. Priya Iyer',
    specialty: 'Pediatrician',
    experience: 15,
    rating: 4.9,
    consultationFee: 750,
    location: 'Apollo Hospitals, Chennai',
    image: 'https://picsum.photos/seed/doc3/200/200',
    availability: ['08:30 AM', '10:30 AM', '01:30 PM', '03:30 PM']
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'A1',
    patientName: 'Rahul Verma',
    patientEmail: 'rahul.v@example.com',
    patientPhone: '+91 98765 43210',
    patientAbhaId: '12-3456-7890-1234',
    doctorName: 'Dr. Ananya Sharma',
    specialty: 'Cardiologist',
    date: '2024-05-20',
    time: '09:00 AM',
    status: AppointmentStatus.SCHEDULED,
    reminderSent: false
  },
  {
    id: 'A2',
    patientName: 'Sita Gupta',
    patientEmail: 'sita.g@example.com',
    patientPhone: '+91 91234 56789',
    doctorName: 'Dr. Vikram Malhotra',
    specialty: 'Dermatologist',
    date: '2024-05-19',
    time: '12:00 PM',
    status: AppointmentStatus.COMPLETED,
    reminderSent: true,
    reminderType: 'Both'
  },
  {
    id: 'A3',
    patientName: 'Amit Shah',
    patientEmail: 'amit.s@example.com',
    patientPhone: '+91 88888 77777',
    doctorName: 'Dr. Priya Iyer',
    specialty: 'Pediatrician',
    date: '2024-05-21',
    time: '10:30 AM',
    status: AppointmentStatus.SCHEDULED,
    reminderSent: false
  }
];
