export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'installer' | 'manager';
};

export type InstallerRole = 'Lead' | 'Installer' | 'Trainee';

export type Installer = {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: InstallerRole;
  joinedDate: string;
};

export type InstallerStats = {
  averageInstallTime: number;
  trainingProgress: number;
};

export type ServiceType = 'Full Body' | 'Partial Body' | 'Custom';

export type Appointment = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  vehicleInfo: string;
  date: string;
  time: string;
  estimatedDuration: number;
  installerId: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  serviceType: ServiceType;
  estimatedSquareFeet: number;
  quotedPrice: number;
  deposit?: number;
  notes?: string;
};

export type TimelineViewProps = {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onAppointmentUpdate?: (appointment: Appointment) => void;
  selectedInstallerId?: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
};

export type Sku = {
  id: string;
  sku: string;
  brandId: string;
  name: string;
  widthInches: number;
  lengthFeet: number;
  cost: number;
};

export type PPFRoll = {
  id: string;
  sku: string;
  rollId: string;
  name: string;
  lengthFeet: number;
  widthInches: number;
  price: number;
  category: string;
  manufacturer: string;
};

export * from './quality';
export * from './training';