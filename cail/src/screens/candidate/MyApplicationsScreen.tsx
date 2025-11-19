import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { colors } from '@/theme/colors';
import { CANDIDATE_APPLICATIONS } from '@/data/mockData';

const statusTone: Record<
  string,
  {
    label: string;
    tone: 'info' | 'warning' | 'success' | 'danger' | 'neutral';
    accent: string;
    background: string;
    note?: string;
  }
> = {
  postulado: {
    label: 'Postulado',
    tone: 'neutral',
    accent: colors.accent,
    background: colors.accentSoft,
    note: 'Tu postulación ha sido recibida y está pendiente de revisión.',
  },
  revision: {
    label: 'En revisión',
    tone: 'warning',
    accent: colors.warning,
    background: '#FFF7E6',
    note: 'El empleador está revisando tu perfil.',
  },
  entrevista: {
    label: 'Entrevista',
    tone: 'info',
    accent: colors.info,
    background: '#E8F1FF',
    note: 'Tienes una entrevista en agenda.',
  },
  oferta: {
    label: 'Oferta',
    tone: 'success',
    accent: colors.success,
    background: '#E6F9ED',
    note: 'Recibiste una oferta. Revísala a la brevedad.',
  },
  finalizado: {
    label: 'Finalizado',
    tone: 'neutral',
    accent: colors.muted,
    background: colors.surfaceMuted,
  },
};

export function MyApplicationsScreen() {
  const summary = CANDIDATE_APPLICATIONS.reduce(
    (acc, app) => {
      acc.total += 1;
      acc[app.status] = (acc[app.status] ?? 0) + 1;
      return acc;
    },
    { total: 0, postulado: 0, revision: 0, entrevista: 0, oferta: 0, finalizado: 0 } as Record<string, number>,
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card tone="accent" spacing="lg">
        <Text style={styles.summaryEyebrow}>Gestión de Postulaciones</Text>
        <Text style={styles.summaryTitle}>Seguimiento en tiempo real</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryValue}>{summary.total}</Text>
            <Text style={styles.summaryLabel}>Total postulaciones</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryValue}>{summary.revision}</Text>
            <Text style={styles.summaryLabel}>En revisión</Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={styles.summaryValue}>{summary.oferta}</Text>
            <Text style={styles.summaryLabel}>Ofertas</Text>
          </View>
        </View>
      </Card>

      <SectionHeader title="Mis postulaciones" subtitle="Estados, recordatorios y próximos pasos" />
      {CANDIDATE_APPLICATIONS.map((application) => {
        const tone = statusTone[application.status];
        return (
          <Card
            key={application.id}
            style={[
              styles.card,
              { borderColor: tone.accent + '33', backgroundColor: tone.background },
            ]}
          >
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.title}>{application.title}</Text>
                <Text style={styles.subtitle}>{application.company}</Text>
              </View>
              <StatusBadge label={tone.label} tone={tone.tone} />
            </View>
            <View style={styles.metaRow}>
              <Meta icon="calendar" label={`Postulado: ${application.submittedAt}`} />
              <Meta icon="clipboard" label={application.stage} />
            </View>
            <View style={styles.metaRow}>
              <Meta icon="flag" label={`Prioridad ${application.priority}`} />
              <Meta icon="file-text" label={`CV: ${application.title.replace(/\s+/g, '_')}.pdf`} />
            </View>
            {tone.note && <Text style={[styles.note, { color: tone.accent }]}>{tone.note}</Text>}
          </Card>
        );
      })}
    </ScrollView>
  );
}

function Meta({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  return (
    <View style={styles.metaRowItem}>
      <Feather name={icon} size={14} color={colors.muted} />
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 120,
  },
  summaryEyebrow: {
    color: colors.muted,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  summaryStat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryLabel: {
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    gap: 12,
    borderWidth: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  metaRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  note: {
    marginTop: 8,
    fontWeight: '600',
  },
});
