import { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type OfferStatus = 'active' | 'archived' | 'draft';

interface JobOffer {
  id: string;
  title: string;
  department: string;
  description: string;
  location: string;
  salary: string;
  modality: string;
  priority: string;
  publishedDate: string;
  status: OfferStatus;
  applications: number;
  views: number;
  requiredCompetencies: string[];
  requiredEducation: string[];
  requiredExperience: string;
}

const mockOffers: JobOffer[] = [
  {
    id: '1',
    title: 'Ingeniero de Producción',
    department: 'Producción',
    description: 'Responsable de supervisar procesos de manufactura y optimización de líneas de producción.',
    location: 'Loja',
    salary: '$1200 - $1800',
    modality: 'Presencial',
    priority: 'Alta',
    publishedDate: '10/10/2025',
    status: 'active',
    applications: 12,
    views: 45,
    requiredCompetencies: ['Gestión de procesos', 'Liderazgo'],
    requiredEducation: ['Ingeniería Industrial'],
    requiredExperience: '3 años en producción'
  }
];

export function OffersManagementScreen() {
  const [selectedTab, setSelectedTab] = useState<OfferStatus>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [offers, setOffers] = useState<JobOffer[]>(mockOffers);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('Media');
  const [salary, setSalary] = useState('');
  const [modality, setModality] = useState('Presencial');
  const [location, setLocation] = useState('Loja');
  const [competencies, setCompetencies] = useState<string[]>([]);
  const [newCompetency, setNewCompetency] = useState('');
  const [education, setEducation] = useState<string[]>([]);
  const [newEducation, setNewEducation] = useState('');

  const filteredOffers = offers.filter(offer => offer.status === selectedTab);
  const activeCount = offers.filter(o => o.status === 'active').length;
  const archivedCount = offers.filter(o => o.status === 'archived').length;
  const draftCount = offers.filter(o => o.status === 'draft').length;

  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const openEditModal = (offer: JobOffer) => {
    setSelectedOffer(offer);
    setTitle(offer.title);
    setDescription(offer.description);
    setDepartment(offer.department);
    setSalary(offer.salary);
    setModality(offer.modality);
    setLocation(offer.location);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDepartment('');
    setPriority('Media');
    setSalary('');
    setModality('Presencial');
    setLocation('Loja');
    setCompetencies([]);
    setEducation([]);
    setNewCompetency('');
    setNewEducation('');
  };

  const handleCreateOffer = () => {
    const newOffer: JobOffer = {
      id: Date.now().toString(),
      title,
      department,
      description,
      location,
      salary,
      modality,
      priority,
      publishedDate: new Date().toLocaleDateString('es-EC'),
      status: 'active',
      applications: 0,
      views: 0,
      requiredCompetencies: competencies,
      requiredEducation: education,
      requiredExperience: ''
    };
    setOffers([...offers, newOffer]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleUpdateOffer = () => {
    if (!selectedOffer) return;
    
    const updatedOffers = offers.map(offer => 
      offer.id === selectedOffer.id 
        ? { ...offer, title, description, salary, modality, location }
        : offer
    );
    setOffers(updatedOffers);
    setShowEditModal(false);
    setSelectedOffer(null);
  };

  const handleArchiveOffer = (offerId: string) => {
    const updatedOffers = offers.map(offer =>
      offer.id === offerId ? { ...offer, status: 'archived' as OfferStatus } : offer
    );
    setOffers(updatedOffers);
  };

  const addCompetency = () => {
    if (newCompetency.trim()) {
      setCompetencies([...competencies, newCompetency.trim()]);
      setNewCompetency('');
    }
  };

  const removeCompetency = (index: number) => {
    setCompetencies(competencies.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    if (newEducation.trim()) {
      setEducation([...education, newEducation.trim()]);
      setNewEducation('');
    }
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* Header con título y botón */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconBadge}>
            <Feather name="briefcase" size={20} color="#F59E0B" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Gestión de Ofertas Laborales</Text>
            <Text style={styles.headerSubtitle}>Define vacantes y administra su ciclo de vida</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.newOfferButton} onPress={openCreateModal}>
          <Feather name="plus" size={18} color="#fff" />
          <Text style={styles.newOfferText}>Nueva Oferta</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.tabActive]}
          onPress={() => setSelectedTab('active')}
        >
          <Text style={[styles.tabText, selectedTab === 'active' && styles.tabTextActive]}>
            Activas ({activeCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'archived' && styles.tabActive]}
          onPress={() => setSelectedTab('archived')}
        >
          <Text style={[styles.tabText, selectedTab === 'archived' && styles.tabTextActive]}>
            Archivadas ({archivedCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'draft' && styles.tabActive]}
          onPress={() => setSelectedTab('draft')}
        >
          <Text style={[styles.tabText, selectedTab === 'draft' && styles.tabTextActive]}>
            Borradores ({draftCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de ofertas */}
      <ScrollView style={styles.offersList}>
        <Text style={styles.sectionLabel}>Publicadas y Vigentes</Text>
        
        {filteredOffers.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="inbox" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>No hay ofertas en esta categoría</Text>
          </View>
        ) : (
          filteredOffers.map(offer => (
            <OfferCard 
              key={offer.id} 
              offer={offer} 
              onEdit={() => openEditModal(offer)}
              onArchive={() => handleArchiveOffer(offer.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Modal Crear Oferta */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <Feather name="briefcase" size={20} color="#F59E0B" />
                <Text style={styles.modalTitle}>Ingresar Oferta Laboral</Text>
              </View>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Completa la descripción de la oferta y los perfiles requeridos
            </Text>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Título del Puesto *</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ej: Ingeniero de Sistemas"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción de la Oferta *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe las responsabilidades, funciones y requisitos del puesto..."
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Departamento</Text>
                <TextInput
                  style={styles.input}
                  value={department}
                  onChangeText={setDepartment}
                  placeholder="Ej: Producción, Administración"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prioridad</Text>
                <View style={styles.selectContainer}>
                  <Text style={styles.selectText}>{priority}</Text>
                  <Feather name="chevron-down" size={20} color="#6B7280" />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Rango Salarial</Text>
                <TextInput
                  style={styles.input}
                  value={salary}
                  onChangeText={setSalary}
                  placeholder="$1000 - $1500"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modalidad</Text>
                <View style={styles.selectContainer}>
                  <Text style={styles.selectText}>{modality}</Text>
                  <Feather name="chevron-down" size={20} color="#6B7280" />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ubicación</Text>
                <TextInput
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Loja"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <Text style={styles.sectionTitle}>Perfiles Requeridos</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Competencias Requeridas</Text>
                <View style={styles.addInputRow}>
                  <TextInput
                    style={[styles.input, styles.flex1]}
                    value={newCompetency}
                    onChangeText={setNewCompetency}
                    placeholder="Ej: Trabajo en equipo, Liderazgo..."
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity style={styles.addButton} onPress={addCompetency}>
                    <Feather name="plus" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.chipContainer}>
                  {competencies.map((comp, index) => (
                    <View key={index} style={styles.chip}>
                      <Text style={styles.chipText}>{comp}</Text>
                      <TouchableOpacity onPress={() => removeCompetency(index)}>
                        <Feather name="x" size={14} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Formación Requerida</Text>
                <View style={styles.addInputRow}>
                  <TextInput
                    style={[styles.input, styles.flex1]}
                    value={newEducation}
                    onChangeText={setNewEducation}
                    placeholder="Ej: Ingeniería en Sistemas, Licenciatura en Administración..."
                    placeholderTextColor="#9CA3AF"
                  />
                  <TouchableOpacity style={styles.addButton} onPress={addEducation}>
                    <Feather name="plus" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.chipContainer}>
                  {education.map((edu, index) => (
                    <View key={index} style={styles.chip}>
                      <Text style={styles.chipText}>{edu}</Text>
                      <TouchableOpacity onPress={() => removeEducation(index)}>
                        <Feather name="x" size={14} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.submitButton} onPress={handleCreateOffer}>
              <Text style={styles.submitText}>Publicar Oferta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Editar Oferta */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Actualizar Oferta</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Edita los detalles de la oferta "{selectedOffer?.title}"
            </Text>

            <ScrollView style={styles.modalForm} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Título del Puesto</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Título del puesto"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Descripción del puesto"
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Salario</Text>
                  <TextInput
                    style={styles.input}
                    value={salary}
                    onChangeText={setSalary}
                    placeholder="$1200 - $1800"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Modalidad</Text>
                  <View style={styles.selectContainer}>
                    <Text style={styles.selectText}>{modality}</Text>
                    <Feather name="chevron-down" size={20} color="#6B7280" />
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdateOffer}>
                <Text style={styles.saveText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function OfferCard({ 
  offer, 
  onEdit, 
  onArchive 
}: { 
  offer: JobOffer; 
  onEdit: () => void;
  onArchive: () => void;
}) {
  return (
    <View style={styles.offerCard}>
      <View style={styles.offerHeader}>
        <Text style={styles.offerTitle}>{offer.title}</Text>
        <View style={styles.badges}>
          <View style={styles.badgeActive}>
            <Text style={styles.badgeActiveText}>Activa</Text>
          </View>
          <View style={styles.badgeHigh}>
            <Text style={styles.badgeHighText}>Alta</Text>
          </View>
        </View>
      </View>

      <Text style={styles.offerDepartment}>{offer.department}</Text>
      <Text style={styles.offerDescription} numberOfLines={2}>
        {offer.description}
      </Text>

      <View style={styles.offerDetails}>
        <View style={styles.detail}>
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text style={styles.detailText}>{offer.location}</Text>
        </View>
        <View style={styles.detail}>
          <Feather name="dollar-sign" size={14} color="#6B7280" />
          <Text style={styles.detailText}>{offer.salary}</Text>
        </View>
        <View style={styles.detail}>
          <Feather name="home" size={14} color="#6B7280" />
          <Text style={styles.detailText}>{offer.modality}</Text>
        </View>
        <View style={styles.detail}>
          <Feather name="calendar" size={14} color="#6B7280" />
          <Text style={styles.detailText}>Publicado: {offer.publishedDate}</Text>
        </View>
      </View>

      <View style={styles.skillTags}>
        {offer.requiredCompetencies.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillTagText}>{skill}</Text>
          </View>
        ))}
      </View>

      <View style={styles.requirementTags}>
        {offer.requiredEducation.map((edu, index) => (
          <View key={index} style={styles.requirementTag}>
            <Feather name="award" size={12} color="#92400E" />
            <Text style={styles.requirementText}>Formación: {edu}</Text>
          </View>
        ))}
        <View style={styles.requirementTag}>
          <Feather name="briefcase" size={12} color="#92400E" />
          <Text style={styles.requirementText}>Experiencia: {offer.requiredExperience}</Text>
        </View>
      </View>

      <View style={styles.offerStats}>
        <View style={styles.stat}>
          <Feather name="users" size={16} color="#10B981" />
          <Text style={styles.statText}>{offer.applications} postulaciones</Text>
        </View>
        <View style={styles.stat}>
          <Feather name="eye" size={16} color="#3B82F6" />
          <Text style={styles.statText}>{offer.views} vistas</Text>
        </View>
      </View>

      <View style={styles.offerActions}>
        <TouchableOpacity style={styles.updateButton} onPress={onEdit}>
          <Feather name="edit-2" size={16} color="#10B981" />
          <Text style={styles.updateButtonText}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.archiveButton} onPress={onArchive}>
          <Feather name="archive" size={16} color="#F59E0B" />
          <Text style={styles.archiveButtonText}>Archivar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  newOfferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  newOfferText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },
  offersList: {
    flex: 1,
    padding: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    flex: 1,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  badgeActive: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeActiveText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
  },
  badgeHigh: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeHighText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
  },
  offerDepartment: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  offerDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  skillTagText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  requirementTags: {
    gap: 6,
    marginBottom: 12,
  },
  requirementTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  requirementText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  offerStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  offerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  updateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  updateButtonText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14,
  },
  archiveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  archiveButtonText: {
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
});

// TODO: Implementar la funcionalidad de editar y archivar ofertas