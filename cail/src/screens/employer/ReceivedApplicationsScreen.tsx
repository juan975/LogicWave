import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type ApplicationStatus = "pending" | "review" | "accepted" | "rejected";

interface Application {
  id: string;
  candidateName: string;
  initials: string;
  department: string;
  position: string;
  education: string;
  experience: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  receivedDate: string;
  status: ApplicationStatus;
  cvFile?: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    candidateName: "María Fernanda González",
    initials: "MF",
    department: "Manufactura",
    position: "Ingeniero de Producción",
    education: "Ingeniería Industrial",
    experience: "3 años de exp.",
    email: "mf.gonzalez@email.com",
    phone: "0998765432",
    location: "Loja",
    skills: ["Control de Calidad", "ISO 9001", "Lean Manufacturing"],
    receivedDate: "27/10/2025",
    status: "pending",
    cvFile: "CV_Maria_Fernanda_Gonzalez.pdf",
  },
  {
    id: "2",
    candidateName: "Carlos Alberto Moreno",
    initials: "CA",
    department: "Administración",
    position: "Analista de Recursos Humanos",
    education: "Administración de Empresas",
    experience: "5 años de exp.",
    email: "ca.moreno@email.com",
    phone: "0987654321",
    location: "Loja",
    skills: ["Gestión de Personal", "Recursos Humanos", "Nómina"],
    receivedDate: "26/10/2025",
    status: "pending",
  },
  {
    id: "3",
    candidateName: "Roberto Miguel Sánchez",
    initials: "RM",
    department: "Ingeniería",
    position: "Ingeniero de Proyectos",
    education: "Ingeniería Civil",
    experience: "6 años de exp.",
    email: "rm.sanchez@email.com",
    phone: "0995432109",
    location: "Loja",
    skills: ["AutoCAD", "Gestión de Proyectos", "Presupuestos"],
    receivedDate: "24/10/2025",
    status: "pending",
  },
  {
    id: "4",
    candidateName: "Patricia Elizabeth Jiménez",
    initials: "PE",
    department: "Ingeniería",
    position: "Ingeniero de Proyectos",
    education: "Ingeniería Industrial",
    experience: "4 años de exp.",
    email: "pe.jimenez@email.com",
    phone: "0994321098",
    location: "Loja",
    skills: ["Project Management", "Six Sigma", "Gestión de Riesgos"],
    receivedDate: "23/10/2025",
    status: "review",
  },
  {
    id: "5",
    candidateName: "Fernando José Castillo",
    initials: "FJ",
    department: "Calidad",
    position: "Analista de Calidad",
    education: "Ingeniería Química",
    experience: "3 años de exp.",
    email: "fj.castillo@email.com",
    phone: "0993210987",
    location: "Loja",
    skills: ["Control de Calidad", "ISO 9001", "Auditorías"],
    receivedDate: "22/10/2025",
    status: "accepted",
  },
];

export default function ApplicationsScreen() {
  const [applications, setApplications] =
    useState<Application[]>(mockApplications);
  const [selectedView, setSelectedView] = useState<"cvs" | "offers">("cvs");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("Toda exp.");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    review: applications.filter((a) => a.status === "review").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
  };

  const openEvaluationModal = (app: Application) => {
    setSelectedApplication(app);
    setShowEvaluationModal(true);
  };

  const handleSelectCandidate = () => {
    if (selectedApplication) {
      const updated = applications.map((app) =>
        app.id === selectedApplication.id
          ? { ...app, status: "accepted" as ApplicationStatus }
          : app
      );
      setApplications(updated);
      setShowEvaluationModal(false);
      setSelectedApplication(null);
    }
  };

  const handleReject = () => {
    if (selectedApplication) {
      const updated = applications.map((app) =>
        app.id === selectedApplication.id
          ? { ...app, status: "rejected" as ApplicationStatus }
          : app
      );
      setApplications(updated);
      setShowEvaluationModal(false);
      setSelectedApplication(null);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const badges = {
      pending: { label: "Pend.", bg: "#FEF3C7", color: "#92400E" },
      review: { label: "Rev.", bg: "#DBEAFE", color: "#1E40AF" },
      accepted: { label: "Acept.", bg: "#D1FAE5", color: "#065F46" },
      rejected: { label: "Rech.", bg: "#FEE2E2", color: "#991B1B" },
    };
    return badges[status] || badges.pending;
  };

  // Group applications by position
  const groupedApplications = applications.reduce((acc, app) => {
    if (!acc[app.position]) {
      acc[app.position] = [];
    }
    acc[app.position].push(app);
    return acc;
  }, {} as Record<string, Application[]>);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconBadge}>
            <Feather name="users" size={20} color="#F59E0B" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Postulaciones</Text>
            <Text style={styles.headerSubtitle}>
              Gestión de candidatos y perfiles recibidos
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="external-link" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#F59E0B" }]}>
            {stats.pending}
          </Text>
          <Text style={styles.statLabel}>Pend.</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#3B82F6" }]}>
            {stats.review}
          </Text>
          <Text style={styles.statLabel}>Revisión</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: "#10B981" }]}>
            {stats.accepted}
          </Text>
          <Text style={styles.statLabel}>Acept.</Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchBox}>
          <Feather name="search" size={16} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nombre, habilidades..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>{experienceFilter}</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>{statusFilter}</Text>
          <Feather name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* View Tabs */}
      <View style={styles.viewTabs}>
        <TouchableOpacity
          style={[
            styles.viewTab,
            selectedView === "cvs" && styles.viewTabActive,
          ]}
          onPress={() => setSelectedView("cvs")}
        >
          <Feather
            name="file-text"
            size={16}
            color={selectedView === "cvs" ? "#1F2937" : "#6B7280"}
          />
          <Text
            style={[
              styles.viewTabText,
              selectedView === "cvs" && styles.viewTabTextActive,
            ]}
          >
            CVs ({applications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewTab,
            selectedView === "offers" && styles.viewTabActive,
          ]}
          onPress={() => setSelectedView("offers")}
        >
          <Feather
            name="briefcase"
            size={16}
            color={selectedView === "offers" ? "#1F2937" : "#6B7280"}
          />
          <Text
            style={[
              styles.viewTabText,
              selectedView === "offers" && styles.viewTabTextActive,
            ]}
          >
            Ofertas (3)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info Banner */}
      <View style={styles.infoBanner}>
        <Feather name="info" size={16} color="#1E40AF" />
        <Text style={styles.infoBannerText}>
          {selectedView === "cvs"
            ? "CVs Recibidos Espontáneamente: Candidatos que enviaron su hoja de vida sin aplicar a una oferta específica. Puedes revisar sus perfiles y contactarlos directamente."
            : "Postulaciones por Oferta: Candidatos que aplicaron específicamente a tus ofertas de trabajo publicadas. Puedes clasificarlos por experiencia, formación y compatibilidad."}
        </Text>
      </View>

      {/* Applications List */}
      <ScrollView style={styles.applicationsList}>
        {selectedView === "cvs"
          ? applications
              .filter(
                (app) => app.status === "pending" || app.status === "review"
              )
              .map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onPress={() => openEvaluationModal(app)}
                  getStatusBadge={getStatusBadge}
                />
              ))
          : Object.entries(groupedApplications).map(([position, apps]) => (
              <View key={position} style={styles.positionGroup}>
                <View style={styles.positionHeader}>
                  <Feather name="briefcase" size={16} color="#F59E0B" />
                  <Text style={styles.positionTitle}>{position}</Text>
                  <Text style={styles.positionCount}>
                    {apps.length} postulaciones
                  </Text>
                </View>
                {apps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onPress={() => openEvaluationModal(app)}
                    getStatusBadge={getStatusBadge}
                    compact
                  />
                ))}
              </View>
            ))}
      </ScrollView>

      {/* Evaluation Modal */}
      <Modal
        visible={showEvaluationModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowEvaluationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Evaluar Postulación</Text>
              <TouchableOpacity onPress={() => setShowEvaluationModal(false)}>
                <Feather name="x" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {selectedApplication && (
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.candidateHeader}>
                  <View style={styles.avatarLarge}>
                    <Text style={styles.avatarLargeText}>
                      {selectedApplication.initials}
                    </Text>
                  </View>
                  <View style={styles.candidateInfo}>
                    <Text style={styles.candidateName}>
                      {selectedApplication.candidateName}
                    </Text>
                    <Text style={styles.candidateDepartment}>
                      {selectedApplication.department}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>
                    Información de Contacto
                  </Text>
                  <View style={styles.contactRow}>
                    <Feather name="mail" size={14} color="#6B7280" />
                    <Text style={styles.contactText}>
                      {selectedApplication.email}
                    </Text>
                  </View>
                  <View style={styles.contactRow}>
                    <Feather name="phone" size={14} color="#6B7280" />
                    <Text style={styles.contactText}>
                      {selectedApplication.phone}
                    </Text>
                  </View>
                  <View style={styles.contactRow}>
                    <Feather name="map-pin" size={14} color="#6B7280" />
                    <Text style={styles.contactText}>
                      {selectedApplication.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Formación</Text>
                  <View style={styles.infoRow}>
                    <Feather name="award" size={14} color="#1F2937" />
                    <Text style={styles.infoText}>
                      {selectedApplication.education}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Experiencia</Text>
                  <View style={styles.infoRow}>
                    <Feather name="briefcase" size={14} color="#1F2937" />
                    <Text style={styles.infoText}>
                      {selectedApplication.experience}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Habilidades</Text>
                  <View style={styles.skillsContainer}>
                    {selectedApplication.skills.map((skill, index) => (
                      <View key={index} style={styles.skillChip}>
                        <Text style={styles.skillChipText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {selectedApplication.cvFile && (
                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Curriculum Vitae</Text>
                    <TouchableOpacity style={styles.cvDownload}>
                      <Feather name="file-text" size={16} color="#6B7280" />
                      <Text style={styles.cvFileName}>
                        {selectedApplication.cvFile}
                      </Text>
                      <Feather name="download" size={16} color="#F59E0B" />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={handleSelectCandidate}
              >
                <Feather name="check-circle" size={18} color="#fff" />
                <Text style={styles.selectButtonText}>
                  Seleccionar Candidato
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleReject}
              >
                <Feather name="x-circle" size={18} color="#6B7280" />
                <Text style={styles.rejectButtonText}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ApplicationCard({
  application,
  onPress,
  getStatusBadge,
  compact = false,
}: {
  application: Application;
  onPress: () => void;
  getStatusBadge: (status: ApplicationStatus) => {
    label: string;
    bg: string;
    color: string;
  };
  compact?: boolean;
}) {
  const statusBadge = getStatusBadge(application.status);

  return (
    <TouchableOpacity style={styles.applicationCard} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.cardLeft}>
          <View
            style={[
              styles.avatar,
              application.status === "pending" && {
                backgroundColor: "#10B981",
              },
              application.status === "review" && { backgroundColor: "#3B82F6" },
              application.status === "accepted" && {
                backgroundColor: "#10B981",
              },
            ]}
          >
            <Text style={styles.avatarText}>{application.initials}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{application.candidateName}</Text>
            <Text style={styles.cardDepartment}>{application.department}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBadge.bg }]}>
          <Text style={[styles.statusBadgeText, { color: statusBadge.color }]}>
            {statusBadge.label}
          </Text>
        </View>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <Feather name="award" size={12} color="#6B7280" />
          <Text style={styles.detailText}>{application.education}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="calendar" size={12} color="#6B7280" />
          <Text style={styles.detailText}>{application.experience}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="mail" size={12} color="#6B7280" />
          <Text style={styles.detailText}>{application.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="phone" size={12} color="#6B7280" />
          <Text style={styles.detailText}>{application.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Feather name="map-pin" size={12} color="#6B7280" />
          <Text style={styles.detailText}>{application.location}</Text>
        </View>
      </View>

      {!compact && (
        <>
          <View style={styles.skillsList}>
            <Text style={styles.skillsLabel}>Habilidades principales:</Text>
            <View style={styles.skillsRow}>
              {application.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillTagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.receivedDate}>
              Recibido: {application.receivedDate}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={onPress}
              >
                <Feather name="eye" size={14} color="#1F2937" />
                <Text style={styles.viewProfileText}>Ver Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statusButton}>
                <Text style={styles.statusButtonText}>Pendiente</Text>
                <Feather name="chevron-down" size={14} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  statsContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },
  filtersContainer: {
    backgroundColor: "#fff",
    padding: 20,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  viewTabs: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  viewTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewTabActive: {
    backgroundColor: "#F3F4F6",
  },
  viewTabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  viewTabTextActive: {
    color: "#1F2937",
    fontWeight: "600",
  },
  infoBanner: {
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    gap: 10,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  infoBannerText: {
    flex: 1,
    fontSize: 12,
    color: "#1E40AF",
    lineHeight: 18,
  },
  applicationsList: {
    flex: 1,
    padding: 20,
  },
  positionGroup: {
    marginBottom: 24,
  },
  positionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  positionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  positionCount: {
    fontSize: 13,
    color: "#6B7280",
  },
  applicationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  cardDepartment: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: "#6B7280",
  },
  skillsList: {
    marginBottom: 12,
  },
  skillsLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  skillTagText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  receivedDate: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
  },
  viewProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  viewProfileText: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "500",
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
  },
  statusButtonText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
  },
});
