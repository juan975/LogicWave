import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { InputField } from '@/components/ui/InputField';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { JobOffer } from '@/types';
import { JOB_OFFERS } from '@/data/mockData';
import { colors, gradients } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

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
        <Chip label={item.modality} active color={colors.candidate} />
      </View>
      <Text style={styles.offerDescription}>{item.description}</Text>
      <View style={styles.offerMeta}>
        <View style={styles.metaRow}>
          <Feather name="map-pin" color={colors.muted} />
          <Text style={styles.metaText}>{item.location}</Text>
        </View>
        <View style={styles.metaRow}>
          <Feather name="dollar-sign" color={colors.muted} />
          <Text style={styles.metaText}>{item.salaryRange}</Text>
        </View>
      </View>
      <View style={styles.tagList}>
        {item.requiredCompetencies.slice(0, 3).map((competency) => (
          <Chip key={competency} label={competency} />
        ))}
      </View>
      <Button label="Postular" onPress={() => setSelectedOffer(item)} />
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
            <LinearGradient colors={gradients.candidate} style={styles.heroCard}>
              <Text style={styles.heroEyebrow}>Explora perfiles afines</Text>
              <Text style={styles.heroTitle}>Descubre oportunidades según tu perfil</Text>
              <Text style={styles.heroSubtitle}>Filtra por modalidad, sector y competencias clave.</Text>
              <Button label="Activar alertas" variant="secondary" tone="candidate" style={styles.heroButton} />
            </LinearGradient>
            <SectionHeader title="Descubrir oportunidades" subtitle="Filtra por sector, modalidad y ubicación" />
            <InputField
              label="Buscar"
              value={filters.search}
              onChangeText={(text) => setFilters((prev) => ({ ...prev, search: text }))}
              placeholder="Cargo, empresa, palabra clave"
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
          </View>
        }
      />

      <Modal visible={!!selectedOffer} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Postular a {selectedOffer?.title}</Text>
            <InputField label="Enlace a tu CV" value={cvLink} onChangeText={setCvLink} placeholder="https://mi-cv.com" />
            <InputField
              label="Mensaje para el empleador"
              value={notes}
              onChangeText={setNotes}
              placeholder="Destaca tus fortalezas"
              multiline
            />
            <Button label="Enviar" onPress={handleApply} />
            <Button label="Cancelar" variant="ghost" onPress={resetModal} style={styles.modalCancel} tone="neutral" />
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  offerCard: {
    gap: 10,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    justifyContent: 'space-between',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: colors.textSecondary,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  headerArea: {
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  heroEyebrow: {
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
  },
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalCancel: {
    marginTop: 8,
  },
});
