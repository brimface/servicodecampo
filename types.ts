
export enum ServiceOrderStatus {
  Pending = 'Pendente',
  ForQuote = 'Para Orçamento',
  QuoteSent = 'Orçamento Enviado',
  AwaitingParts = 'Aguardando Peças',
  Started = 'Iniciada',
  Completed = 'Concluída',
  ForStart = 'Por Iniciar',
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  serial: string;
  model: string;
  status: 'Ativo' | 'Inativo';
  location: string;
  installDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  attachments: Attachment[];
  serviceHistory: ServiceRecord[];
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'doc';
}

export interface ServiceRecord {
  id: string;
  title: string;
  technician: string;
  date: string;
  observations: string;
}

export interface ServiceOrder {
  id: string;
  osNumber: string;
  client: Client;
  status: ServiceOrderStatus;
  serviceType: string;
  date: string;
  time: string;
  description: string;
  scheduled: string;
  equipment: Equipment[];
  history: ServiceOrderHistory[];
}

export interface ServiceOrderHistory {
  id: string;
  action: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
