import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { InputField } from '@/components/ui/InputField';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { useResponsiveLayout } from '@/hooks/useResponsive';
import { CandidateProfileForm } from '@/types';
import { initialCandidateProfile } from '@/data/mockData';
import { colors } from '@/theme/colors';

export function CandidateProfileScreen() {
  const { contentWidth, horizontalGutter } = useResponsiveLayout();
  const [form, setForm] = useState<CandidateProfileForm>(initialCandidateProfile);
  const [newSkill, setNewSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newCompetency, setNewCompetency] = useState('');
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'experience'>('personal');

  const completion = useMemo(() => {
    const fields = [
      form.fullName,
      form.email,
      form.phone,
      form.city,
      form.address,
      form.professionalSummary,
      form.technicalSkills.length ? '1' : '',
      form.softSkills.length ? '1' : '',
      form.competencies.length ? '1' : '',
    ];
    return fields.filter(Boolean).length / fields.length;
  }, [form]);

  const updateField = (key: keyof CandidateProfileForm, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = (key: 'technicalSkills' | 'softSkills' | 'competencies', value: string) => {
    if (!value.trim()) return;
    updateField(key, [...form[key], value.trim()]);
  };

  const removeItem = (key: 'technicalSkills' | 'softSkills' | 'competencies', index: number) => {
    updateField(
      key,
      form[key].filter((_, i) => i !== index),
    );
  };

  const handleSave = () => {
    Alert.alert('Perfil actualizado', 'Tus cambios se guardaron correctamente.');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingHorizontal: horizontalGutter }]}>
      <Card tone="accent" spacing="lg" style={[styles.fullWidth, { maxWidth: contentWidth }]}>
        <SectionHeader title="Mi perfil profesional" subtitle="Administra tus datos personales, profesionales y experiencia" />
        <View style={styles.tabs}>
          <ProfileTab label="Personal" active={activeTab === 'personal'} onPress={() => setActiveTab('personal')} />
          <ProfileTab label="Profesional" active={activeTab === 'professional'} onPress={() => setActiveTab('professional')} />
          <ProfileTab label="Experiencia" active={activeTab === 'experience'} onPress={() => setActiveTab('experience')} />
        </View>
      </Card>

      {activeTab === 'personal' && (
        <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
          <SectionHeader title="Información personal" subtitle="Esta información es visible para los empleadores" />
          <InputField label="Nombre completo" value={form.fullName} onChangeText={(text) => updateField('fullName', text)} />
          <InputField label="Correo" value={form.email} onChangeText={(text) => updateField('email', text)} autoCapitalize="none" />
          <InputField label="Teléfono" value={form.phone} onChangeText={(text) => updateField('phone', text)} keyboardType="phone-pad" />
          <InputField label="Ciudad" value={form.city} onChangeText={(text) => updateField('city', text)} />
          <InputField label="Dirección" value={form.address} onChangeText={(text) => updateField('address', text)} />
        </Card>
      )}

      {activeTab === 'professional' && (
        <>
          <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
            <SectionHeader title="Resumen profesional" subtitle="Describe tu perfil y rol objetivo" />
            <InputField
              label="Resumen"
              value={form.professionalSummary}
              onChangeText={(text) => updateField('professionalSummary', text)}
              multiline
            />
          </Card>
          <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
            <SectionHeader title="Habilidades técnicas" subtitle="Agrega tecnologías o certificaciones clave" />
            <View style={styles.tagList}>
              {form.technicalSkills.map((skill, index) => (
                <Chip key={skill + index} label={skill} onPress={() => removeItem('technicalSkills', index)} active />
              ))}
            </View>
            <InputField label="Agregar habilidad" value={newSkill} onChangeText={setNewSkill} placeholder="Ej. React Native" />
            <Button
              label="Añadir habilidad"
              variant="ghost"
              onPress={() => {
                addItem('technicalSkills', newSkill);
                setNewSkill('');
              }}
            />
          </Card>
          <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
            <SectionHeader title="Habilidades blandas" subtitle="Fortalezas personales y sociales" />
            <View style={styles.tagList}>
              {form.softSkills.map((skill, index) => (
                <Chip key={skill + index} label={skill} onPress={() => removeItem('softSkills', index)} active color={colors.info} />
              ))}
            </View>
            <InputField label="Agregar habilidad blanda" value={newSoftSkill} onChangeText={setNewSoftSkill} placeholder="Ej. Liderazgo" />
            <Button
              label="Añadir habilidad blanda"
              variant="ghost"
              onPress={() => {
                addItem('softSkills', newSoftSkill);
                setNewSoftSkill('');
              }}
            />
          </Card>
        </>
      )}

      {activeTab === 'experience' && (
        <>
          <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
            <SectionHeader title="Competencias" subtitle="Selecciona tus competencias clave" />
            <View style={styles.tagList}>
              {form.competencies.map((skill, index) => (
                <Chip key={skill + index} label={skill} onPress={() => removeItem('competencies', index)} active color={colors.employer} />
              ))}
            </View>
            <InputField label="Agregar competencia" value={newCompetency} onChangeText={setNewCompetency} placeholder="Ej. Gestión de proyectos" />
            <Button
              label="Añadir competencia"
              variant="ghost"
              onPress={() => {
                addItem('competencies', newCompetency);
                setNewCompetency('');
              }}
            />
          </Card>
          <Card style={[styles.sectionCard, styles.fullWidth, { maxWidth: contentWidth }]}>
            <SectionHeader title="Experiencia laboral" subtitle="Registra tus últimos cargos o prácticas" />
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Aún no registras experiencia</Text>
              <Text style={styles.emptySubtitle}>Agrega tus experiencias para mejorar tus coincidencias.</Text>
            </View>
            <Button label="Agregar experiencia" variant="ghost" tone="candidate" />
          </Card>
        </>
      )}

      <Button
        label="Guardar cambios"
        onPress={handleSave}
        fullWidth
        style={[styles.saveBtn, styles.fullWidth, { maxWidth: contentWidth, alignSelf: 'center' }]}
      />
    </ScrollView>
  );
}

function ProfileTab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Button
      label={label}
      onPress={onPress}
      variant="ghost"
      tone={active ? 'candidate' : 'neutral'}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingHorizontal: 0,
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tabButton: {
    flex: 1,
  },
  tabButtonActive: {
    backgroundColor: colors.candidateSurface,
  },
  sectionCard: {
    marginTop: 12,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  saveBtn: {
    marginVertical: 24,
  },
  emptyState: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  emptyTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});
