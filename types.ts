
export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending'
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  consultationFee: number;
  location: string;
  image: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAbhaId?: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reminderSent?: boolean;
  reminderType?: 'SMS' | 'Email' | 'Both';
}

export interface AppConfig {
  backendStack: 'EffectTS' | 'SpringBoot';
  isMonorepo: boolean;
}
