import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EMPLOYER_OFFERS } from '@/data/mockData';
import { EmployerOffer } from '@/types';
import { colors } from '@/theme/colors';

export function OffersManagementScreen() {
  const [offers, setOffers] = useState<EmployerOffer[]>(EMPLOYER_OFFERS);

  const totals = useMemo(() => {
    const activeOffers = offers.filter((offer) => offer.active).length;
    const totalApplicants = offers.reduce((acc, offer) => acc + offer.applicants, 0);
    return { activeOffers, totalApplicants };
  }, [offers]);

  const toggleOffer = (id: string) => {
    setOffers((prev) => prev.map((offer) => (offer.id === id ? { ...offer, active: !offer.active } : offer)));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Ofertas activas" subtitle="Controla visibilidad y desempeño" />
      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{totals.activeOffers}</Text>
          <Text style={styles.statLabel}>Ofertas activas</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statValue}>{totals.totalApplicants}</Text>
          <Text style={styles.statLabel}>Postulaciones</Text>
        </Card>
      </View>
      <Button
        label="Publicar nueva oferta"
        onPress={() => Alert.alert('Publicar oferta', 'Integra tu API de publicación aquí.')}
        fullWidth
        style={styles.publishBtn}
        tone="employer"
      />

      {offers.map((offer) => (
        <Card key={offer.id} style={styles.offerCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerMeta}>{offer.location} · {offer.modality}</Text>
            </View>
            <StatusBadge label={offer.active ? 'Activa' : 'Pausada'} tone={offer.active ? 'success' : 'danger'} />
          </View>
          <Text style={styles.offerDescription}>{offer.description}</Text>
          <View style={styles.metricsRow}>
            <View>
              <Text style={styles.metricLabel}>Postulaciones</Text>
              <Text style={styles.metricValue}>{offer.applicants}</Text>
            </View>
            <View>
              <Text style={styles.metricLabel}>Vistas</Text>
              <Text style={styles.metricValue}>{offer.views}</Text>
            </View>
            <View>
              <Text style={styles.metricLabel}>Cierre</Text>
              <Text style={styles.metricValue}>{offer.deadline}</Text>
            </View>
          </View>
          <View style={styles.tagList}>
            {offer.tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </View>
          <Button
            label={offer.active ? 'Pausar' : 'Reactivar'}
            variant="ghost"
            onPress={() => toggleOffer(offer.id)}
            tone="employer"
          />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 120,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  publishBtn: {
    marginBottom: 12,
  },
  offerCard: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  offerMeta: {
    color: colors.textSecondary,
  },
  offerDescription: {
    color: colors.textSecondary,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  metricValue: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
