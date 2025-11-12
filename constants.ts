
import type { Client, Equipment, ServiceOrder, User } from './types';
import { ServiceOrderStatus } from './types';

export const userProfile: User = {
  id: '123456',
  name: 'João da Silva',
  email: 'joao.silva@empresa.com',
  phone: '(11) 98765-4321',
  avatar: 'https://picsum.photos/id/237/200/200',
};

const clients: Client[] = [
  { id: 'c1', name: 'Ana Silva', phone: '(11) 98765-4321', email: 'ana.silva@email.com', address: 'Av. Paulista, 1578 - Bela Vista, São Paulo, SP - 01310-200' },
  { id: 'c2', name: 'Condomínio Central', phone: '(11) 1234-5678', email: 'adm@central.com', address: 'Rua das Flores, 123' },
  { id: 'c3', name: 'Loja do Zé', phone: '(11) 2345-6789', email: 'contato@lojadoze.com', address: 'Av. Principal, 500' },
  { id: 'c4', name: 'Hospital Central', phone: '(11) 3456-7890', email: 'manutencao@hcentral.com', address: 'Rua das Emergências, 789' },
];

export const equipments: Equipment[] = [
  {
    id: 'e1',
    name: 'Ar Condicionado Central',
    type: 'Ar Condicionado',
    serial: 'XZ-12345',
    model: 'AC-5000',
    status: 'Ativo',
    location: 'Bloco A, Sala 101',
    installDate: '15/01/2022',
    lastMaintenance: '10/06/2024',
    nextMaintenance: '10/12/2024',
    attachments: [
      { id: 'a1', name: 'manual_AC-5000.pdf', size: '1.2 MB', date: '15/01/2022', type: 'pdf' },
      { id: 'a2', name: 'garantia_xz12345.pdf', size: '350 KB', date: '15/01/2022', type: 'pdf' },
    ],
    serviceHistory: [
      { id: 'sr1', title: 'Manutenção Preventiva', technician: 'Carlos Silva', date: '10/06/2024', observations: 'Limpeza dos filtros e verificação do gás refrigerante. Equipamento operando normalmente.' },
      { id: 'sr2', title: 'Reparo no Compressor', technician: 'Ana Pereira', date: '22/02/2024', observations: 'Substituição do capacitor do compressor. Realizados testes de pressão e temperatura, tudo OK.' },
      { id: 'sr3', title: 'Verificação de Ruído', technician: 'Carlos Silva', date: '15/11/2023', observations: 'Foi identificado um ruído na unidade externa. Realizado o reaperto dos parafusos da carcaça, problema resolvido.' },
    ],
  },
  { id: 'e2', name: 'Bomba Hidráulica P-50', type: 'Bomba', serial: 'BH-98765', model: 'P-50', status: 'Ativo', location: 'Casa de Máquinas 1', installDate: '20/03/2023', lastMaintenance: '01/07/2024', nextMaintenance: '01/01/2025', attachments: [], serviceHistory: [] },
  { id: 'e3', name: 'Gerador de Energia G-200', type: 'Gerador', serial: 'GE-54321', model: 'G-200', status: 'Inativo', location: 'Subsolo', installDate: '10/10/2020', lastMaintenance: '15/05/2024', nextMaintenance: '15/11/2024', attachments: [], serviceHistory: [] },
  { id: 'e4', name: 'Ar Condicionado Split', type: 'Ar Condicionado', serial: 'SS-WIND12', model: 'Samsung WindFree 12000 BTU', status: 'Ativo', location: 'Sala da Diretoria', installDate: '05/02/2023', lastMaintenance: '05/06/2024', nextMaintenance: '05/12/2024', attachments: [], serviceHistory: [] },
  { id: 'e5', name: 'Geladeira Frost Free', type: 'Refrigeração', serial: 'BF-INV540L', model: 'Brastemp Inverse 540L', status: 'Ativo', location: 'Copa', installDate: '12/11/2022', lastMaintenance: 'N/A', nextMaintenance: 'N/A', attachments: [], serviceHistory: [] },
];

export const serviceOrders: ServiceOrder[] = [
  { id: 'so1', osNumber: '2024-1138', client: clients[1], status: ServiceOrderStatus.ForStart, serviceType: 'Manutenção preventiva ar condicionado', date: 'Hoje', time: '14:00h', description: 'Ar condicionado não gela', scheduled: '24/07/2024', equipment: [equipments[3]], history: [] },
  { id: 'so2', osNumber: '2024-1139', client: clients[2], status: ServiceOrderStatus.Started, serviceType: 'Reparo de vazamento', date: 'Hoje', time: '16:30h', description: 'Ar condicionado não gela', scheduled: '24/07/2024', equipment: [], history: [] },
  { id: 'so3', osNumber: '2024-1137', client: clients[3], status: ServiceOrderStatus.ForQuote, serviceType: 'Reparo em gerador de emergência', date: 'Hoje', time: '11:00h', description: 'Ar condicionado não gela', scheduled: '24/07/2024', equipment: [equipments[2]], history: [] },
  { id: 'so4', osNumber: '2024-1140', client: { ...clients[0], name: 'Padaria Pão Quente', address: 'Rua do Comércio, 321' }, status: ServiceOrderStatus.QuoteSent, serviceType: 'Conserto de forno industrial', date: '', time: 'Aguardando aprovação', description: 'Ar condicionado não gela', scheduled: '25/07/2024 de manhã (09:00 - 12:00)', equipment: [], history: [] },
  { id: 'so5', osNumber: '2024-1141', client: { ...clients[0], name: 'Academia Corpo em Forma', address: 'Avenida de Esportes, 999' }, status: ServiceOrderStatus.AwaitingParts, serviceType: 'Troca de motor de esteira', date: 'Peças pedidas em 20/07', time: '', description: 'Ar condicionado não gela', scheduled: '25/07/2024', equipment: [], history: [] },
  { id: 'so6', osNumber: '2024-1135', client: { ...clients[0], name: 'Escritório Advogados', address: 'Praça da Sé, 45' }, status: ServiceOrderStatus.Completed, serviceType: 'Instalação de novas luminárias', date: 'Ontem', time: '10:00h', description: 'Ar condicionado não gela', scheduled: '23/07/2024', equipment: [], history: [] },
  { 
    id: 'so7', 
    osNumber: '2024-152', 
    client: clients[0], 
    status: ServiceOrderStatus.Pending, 
    serviceType: 'Manutenção Preventiva', 
    date: '', 
    time: '', 
    description: 'O aparelho liga, mas o ar não sai frio. Foi feita a limpeza do filtro recentemente, mas o problema persiste.', 
    scheduled: 'Período da manhã (09:00 - 12:00)',
    equipment: [equipments[3], equipments[4]],
    history: [
        {id: 'h1', action: 'Técnico atribuído', date: '24/07/2024 às 14:30'},
        {id: 'h2', action: 'Ordem de Serviço criada', date: '24/07/2024 às 11:15'},
    ]
  },
];
