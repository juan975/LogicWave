import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

interface RegisterEmployerFormProps {
  onSuccess: (data: any) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterEmployerForm({ onSuccess, onBack, onSwitchToLogin }: RegisterEmployerFormProps) {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!company || !contact || !email || !password) {
      Alert.alert('Campos incompletos', 'Completa los datos de la empresa.');
      return;
    }

    onSuccess({
      id: 'employer-2',
      company,
      contactName: contact,
      email,
      needsPasswordChange: false,
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Registrar empresa</Text>
        <Text style={styles.subtitle}>Publica vacantes, revisa postulaciones y gestiona entrevistas.</Text>
      </View>
      <InputField label="Razón social" value={company} onChangeText={setCompany} placeholder="Nombre de la empresa" />
      <InputField label="Persona de contacto" value={contact} onChangeText={setContact} placeholder="Nombre" />
      <InputField label="Correo corporativo" value={email} onChangeText={setEmail} placeholder="talento@empresa.com" />
      <InputField label="Contraseña" value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />
      <Button label="Crear cuenta" onPress={handleSubmit} fullWidth style={styles.primaryBtn} tone="employer" />
      <Button label="Ya tengo acceso" variant="ghost" onPress={onSwitchToLogin} fullWidth tone="neutral" />
      <Button label="Volver" variant="ghost" onPress={onBack} fullWidth tone="neutral" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  primaryBtn: {
    marginTop: 8,
  },
});
