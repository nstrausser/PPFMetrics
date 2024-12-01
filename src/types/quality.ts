export type QualityCheck = {
  id: string;
  installationId: string;
  date: string;
  inspector: string;
  vehicle: string;
  customer: string;
  status: 'passed' | 'needs-improvement' | 'failed';
  notes: string;
  score: number;
  criteria?: Array<{
    id: string;
    name: string;
    score: number;
    notes?: string;
  }>;
}

export type DefectReport = {
  id: string;
  installationId: string;
  reportedBy: string;
  reportedAt: string;
  type: 'bubble' | 'debris' | 'edge_lift' | 'scratch' | 'alignment' | 'other';
  severity: 'low' | 'medium' | 'high';
  location: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  images: string[];
}

export type InstallationStandard = {
  id: string;
  name: string;
  version: string;
  categories: Array<{
    name: string;
    requirements: Array<{
      id: string;
      description: string;
      criticalityLevel: 'low' | 'medium' | 'high';
    }>;
  }>;
  updatedAt: string;
}