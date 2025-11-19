import { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { InputField } from '@/components/ui/InputField';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { EmployerProfileForm } from '@/types';
import { initialEmployerProfile } from '@/data/mockData';

export function EmployerProfileScreen() {
  const [form, setForm] = useState<EmployerProfileForm>(initialEmployerProfile);

  const updateField = (key: keyof EmployerProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <SectionHeader title="Perfil empresarial" subtitle="Esta información será visible para los candidatos" />
        <InputField label="Razón social" value={form.companyName} onChangeText={(text) => updateField('companyName', text)} />
        <InputField label="Persona de contacto" value={form.contactName} onChangeText={(text) => updateField('contactName', text)} />
        <InputField label="Correo" value={form.email} onChangeText={(text) => updateField('email', text)} autoCapitalize="none" />
        <InputField label="Teléfono" value={form.phone} onChangeText={(text) => updateField('phone', text)} />
        <InputField label="Industria" value={form.industry} onChangeText={(text) => updateField('industry', text)} />
        <InputField label="Número de colaboradores" value={form.numberOfEmployees} onChangeText={(text) => updateField('numberOfEmployees', text)} />
        <InputField label="Dirección" value={form.address} onChangeText={(text) => updateField('address', text)} />
        <InputField label="Sitio web" value={form.website} onChangeText={(text) => updateField('website', text)} autoCapitalize="none" />
        <InputField
          label="Descripción"
          value={form.description}
          onChangeText={(text) => updateField('description', text)}
          multiline
        />
        <Button label="Guardar perfil" onPress={() => Alert.alert('Perfil actualizado')} fullWidth tone="employer" />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 120,
  },
});
