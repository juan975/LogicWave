import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { InputField } from '@/components/ui/InputField';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CandidateProfileForm } from '@/types';
import { initialCandidateProfile } from '@/data/mockData';
import { colors } from '@/theme/colors';

export function CandidateProfileScreen() {
  const [form, setForm] = useState<CandidateProfileForm>(initialCandidateProfile);
  const [newSkill, setNewSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newCompetency, setNewCompetency] = useState('');

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
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <SectionHeader title="Mi perfil profesional" subtitle="Completa tu información para mejorar tus coincidencias" />
        <ProgressBar progress={completion} label={`Avance ${Math.round(completion * 100)}%`} />
        <InputField label="Nombre completo" value={form.fullName} onChangeText={(text) => updateField('fullName', text)} />
        <InputField label="Correo" value={form.email} onChangeText={(text) => updateField('email', text)} autoCapitalize="none" />
        <InputField label="Teléfono" value={form.phone} onChangeText={(text) => updateField('phone', text)} keyboardType="phone-pad" />
        <InputField label="Ciudad" value={form.city} onChangeText={(text) => updateField('city', text)} />
        <InputField label="Dirección" value={form.address} onChangeText={(text) => updateField('address', text)} />
        <InputField
          label="Resumen profesional"
          value={form.professionalSummary}
          onChangeText={(text) => updateField('professionalSummary', text)}
          multiline
        />
      </Card>

      <Card style={styles.cardSpacing}>
        <SectionHeader title="Habilidades técnicas" subtitle="Agrega tecnologías o certificaciones clave" />
        <View style={styles.tagList}>
          {form.technicalSkills.map((skill, index) => (
            <Chip key={skill + index} label={skill} onPress={() => removeItem('technicalSkills', index)} active />
          ))}
        </View>
        <InputField label="Agregar habilidad" value={newSkill} onChangeText={setNewSkill} placeholder="Ej. React Native" />
        <Button
          label="Añadir"
          variant="ghost"
          onPress={() => {
            addItem('technicalSkills', newSkill);
            setNewSkill('');
          }}
        />
      </Card>

      <Card style={styles.cardSpacing}>
        <SectionHeader title="Habilidades blandas" subtitle="Describe fortalezas personales" />
        <View style={styles.tagList}>
          {form.softSkills.map((skill, index) => (
            <Chip key={skill + index} label={skill} onPress={() => removeItem('softSkills', index)} active color={colors.info} />
          ))}
        </View>
        <InputField label="Agregar habilidad blanda" value={newSoftSkill} onChangeText={setNewSoftSkill} placeholder="Ej. Liderazgo" />
        <Button
          label="Añadir"
          variant="ghost"
          onPress={() => {
            addItem('softSkills', newSoftSkill);
            setNewSoftSkill('');
          }}
        />
      </Card>

      <Card style={styles.cardSpacing}>
        <SectionHeader title="Competencias" subtitle="Selecciona tus competencias clave" />
        <View style={styles.tagList}>
          {form.competencies.map((skill, index) => (
            <Chip key={skill + index} label={skill} onPress={() => removeItem('competencies', index)} active color={colors.employer} />
          ))}
        </View>
        <InputField label="Agregar competencia" value={newCompetency} onChangeText={setNewCompetency} placeholder="Ej. Gestión de proyectos" />
        <Button
          label="Añadir"
          variant="ghost"
          onPress={() => {
            addItem('competencies', newCompetency);
            setNewCompetency('');
          }}
        />
      </Card>

      <Button label="Guardar cambios" onPress={handleSave} fullWidth style={styles.saveBtn} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  cardSpacing: {
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
});
