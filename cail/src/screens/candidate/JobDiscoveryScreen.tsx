import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { InputField } from '@/components/ui/InputField';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { JobOffer } from '@/types';
import { JOB_OFFERS } from '@/data/mockData';
import { colors } from '@/theme/colors';

interface FilterState {
  search: string;
  modality: 'Todos' | JobOffer['modality'];
  industry: 'Todos' | string;
}

export function JobDiscoveryScreen() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    modality: 'Todos',
    industry: 'Todos',
  });
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [cvLink, setCvLink] = useState('');
  const [notes, setNotes] = useState('');

  const summary = useMemo(() => {
    const industryMap = new Map<string, number>();
    const locationMap = new Map<string, number>();
    JOB_OFFERS.forEach((offer) => {
      industryMap.set(offer.industry, (industryMap.get(offer.industry) ?? 0) + 1);
      locationMap.set(offer.location, (locationMap.get(offer.location) ?? 0) + 1);
    });
    return {
      totalVacancies: JOB_OFFERS.length,
      industries: industryMap.size,
      sectorBreakdown: Array.from(industryMap.entries()),
      locationBreakdown: Array.from(locationMap.entries()),
    };
  }, []);

  const filteredOffers = useMemo(() => {
    return JOB_OFFERS.filter((offer) => {
      const matchesSearch =
        filters.search.length === 0 ||
        offer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        offer.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesModality = filters.modality === 'Todos' || offer.modality === filters.modality;
      const matchesIndustry = filters.industry === 'Todos' || offer.industry === filters.industry;
      return matchesSearch && matchesModality && matchesIndustry;
    });
  }, [filters]);

  const resetModal = () => {
    setCvLink('');
    setNotes('');
    setSelectedOffer(null);
  };

  const handleApply = () => {
    if (!cvLink.trim()) {
      Alert.alert('Falta tu CV', 'Agrega el enlace de tu CV para continuar.');
      return;
    }
    Alert.alert('Postulación enviada', 'El empleador recibirá tu perfil y CV.');
    resetModal();
  };

  const renderOffer = ({ item }: { item: JobOffer }) => (
    <Card style={styles.offerCard}>
      <View style={styles.offerHeader}>
        <View>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerCompany}>{item.company}</Text>
        </View>
        <StatusBadge label={item.hierarchyLevel} tone="success" />
      </View>
      <Text style={styles.offerDescription} numberOfLines={3}>
        {item.description}
      </Text>
      <View style={styles.offerMeta}>
        <Meta icon="map-pin" label={`${item.location} · ${item.modality}`} />
        <Meta icon="dollar-sign" label={item.salaryRange} />
        <Meta icon="briefcase" label={item.employmentType} />
      </View>
      <View style={styles.tagList}>
        <Chip label={item.professionalArea} />
        {item.requiredCompetencies.slice(0, 3).map((competency) => (
          <Chip key={competency} label={competency} />
        ))}
      </View>
      <View style={styles.offerDetails}>
        <Meta icon="award" label={item.requiredEducation} />
        <Meta icon="trending-up" label={item.requiredExperience} />
      </View>
      <View style={styles.offerFooter}>
        <Button label="Postular a oferta" onPress={() => setSelectedOffer(item)} style={styles.offerButton} />
        <TouchableOpacity style={styles.alertButton}>
          <Feather name="bell" size={18} color={colors.candidate} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredOffers}
        keyExtractor={(item) => item.id}
        renderItem={renderOffer}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <Card spacing="lg" style={styles.indicatorsCard}>
              <Text style={styles.indicatorTitle}>Indicadores - monitorea la demanda</Text>
              <View style={styles.indicatorRow}>
                <View style={styles.indicatorPill}>
                  <Text style={styles.indicatorValue}>{summary.totalVacancies}</Text>
                  <Text style={styles.indicatorLabel}>Vacantes activas</Text>
                </View>
                <View style={styles.indicatorPill}>
                  <Text style={styles.indicatorValue}>{summary.industries}</Text>
                  <Text style={styles.indicatorLabel}>Industrias</Text>
                </View>
              </View>
              <View style={styles.breakdownBox}>
                <Text style={styles.breakdownTitle}>Demanda por sector</Text>
                <View style={styles.breakdownRow}>
                  {summary.sectorBreakdown.slice(0, 3).map(([sector, count]) => (
                    <Chip key={sector} label={`${sector}: ${count}`} active />
                  ))}
                </View>
              </View>
              <View style={styles.breakdownBox}>
                <Text style={styles.breakdownTitle}>Demanda por ubicación</Text>
                <View style={styles.breakdownRow}>
                  {summary.locationBreakdown.slice(0, 3).map(([city, count]) => (
                    <Chip key={city} label={`${city}: ${count}`} color={colors.info} active />
                  ))}
                </View>
              </View>
            </Card>

            <Card spacing="lg" style={styles.filtersCard}>
              <SectionHeader title="Filtrar ofertas" subtitle="Busca por título, empresa, experiencia o sector" />
              <InputField
                label="Buscar"
                value={filters.search}
                onChangeText={(text) => setFilters((prev) => ({ ...prev, search: text }))}
                placeholder="Ej. Ingeniero de producción, Analista de calidad..."
              />
              <View style={styles.filterRow}>
                {(['Todos', 'Presencial', 'Híbrido', 'Remoto'] as FilterState['modality'][]).map((modality) => (
                  <Chip
                    key={modality}
                    label={modality}
                    active={filters.modality === modality}
                    onPress={() => setFilters((prev) => ({ ...prev, modality }))}
                  />
                ))}
              </View>
              <View style={styles.filterRow}>
                {['Todos', 'Tecnología', 'Manufactura', 'Servicios', 'Comercio'].map((industry) => (
                  <Chip
                    key={industry}
                    label={industry}
                    active={filters.industry === industry}
                    onPress={() =>
                      setFilters((prev) => ({
                        ...prev,
                        industry: industry as FilterState['industry'],
                      }))
                    }
                  />
                ))}
              </View>
            </Card>
          </View>
        }
      />

      <Modal visible={!!selectedOffer} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Postular a {selectedOffer?.title}</Text>
            <InputField label="Enlace a tu CV" value={cvLink} onChangeText={setCvLink} placeholder="https://mi-cv.com" />
            <Text style={styles.modalHelper}>Formatos sugeridos: PDF, DOC, DOCX</Text>
            <InputField
              label="Carta de presentación (opcional)"
              value={notes}
              onChangeText={setNotes}
              placeholder="Describe brevemente tu motivación"
              multiline
            />
            {selectedOffer && (
              <View style={styles.requirementsBox}>
                <Text style={styles.requirementsTitle}>Requisitos de la oferta</Text>
                <View style={styles.requirementsItem}>
                  <Feather name="award" size={14} color={colors.info} />
                  <Text style={styles.requirementsText}>{selectedOffer.requiredEducation}</Text>
                </View>
                <View style={styles.requirementsItem}>
                  <Feather name="clock" size={14} color={colors.info} />
                  <Text style={styles.requirementsText}>{selectedOffer.requiredExperience}</Text>
                </View>
                <View style={styles.requirementsItem}>
                  <Feather name="aperture" size={14} color={colors.info} />
                  <Text style={styles.requirementsText}>
                    Competencias: {selectedOffer.requiredCompetencies.join(', ')}
                  </Text>
                </View>
              </View>
            )}
            <Button label="Enviar postulación" onPress={handleApply} />
            <Button label="Cancelar" variant="ghost" onPress={resetModal} style={styles.modalCancel} tone="neutral" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

function Meta({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View style={styles.metaRow}>
      <Feather name={icon} size={14} color={colors.muted} />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  headerArea: {
    marginBottom: 12,
    gap: 16,
  },
  heroCard: {
    gap: 8,
  },
  heroEyebrow: {
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
    color: colors.muted,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.candidateDark,
  },
  heroSubtitle: {
    color: colors.textSecondary,
  },
  heroButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  indicatorsCard: {
    gap: 14,
  },
  indicatorTitle: {
    fontWeight: '600',
    color: colors.textSecondary,
  },
  indicatorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  indicatorPill: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
    paddingVertical: 12,
    alignItems: 'center',
  },
  indicatorValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  indicatorLabel: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  breakdownBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  breakdownTitle: {
    fontWeight: '600',
    color: colors.textSecondary,
  },
  breakdownRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filtersCard: {
    gap: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  offerCard: {
    gap: 12,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  offerCompany: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  offerDescription: {
    color: colors.textSecondary,
  },
  offerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  offerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  offerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  offerButton: {
    flex: 1,
  },
  alertButton: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.candidate,
    backgroundColor: colors.candidateSurface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalHelper: {
    color: colors.muted,
    fontSize: 12,
    marginTop: -6,
  },
  modalCancel: {
    marginTop: 4,
  },
  requirementsBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  requirementsTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  requirementsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementsText: {
    color: colors.textSecondary,
    flex: 1,
  },
});
