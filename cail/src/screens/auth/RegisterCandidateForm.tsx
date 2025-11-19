import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

interface RegisterCandidateFormProps {
  onSuccess: (data: any) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterCandidateForm({ onSuccess, onBack, onSwitchToLogin }: RegisterCandidateFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Loja');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!fullName || !email || !password) {
      Alert.alert('Campos incompletos', 'Completa los datos para continuar.');
      return;
    }

    onSuccess({
      id: 'candidate-2',
      name: fullName,
      email,
      progress: 0.4,
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Crear cuenta candidato</Text>
        <Text style={styles.subtitle}>Accede a ofertas filtradas por tu perfil y sector.</Text>
      </View>
      <InputField label="Nombre completo" value={fullName} onChangeText={setFullName} placeholder="Tu nombre" />
      <InputField label="Correo" value={email} onChangeText={setEmail} placeholder="correo@ejemplo.com" />
      <InputField label="Ciudad" value={city} onChangeText={setCity} placeholder="Loja" />
      <InputField label="Contraseña" value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />
      <Button label="Registrarme" onPress={handleSubmit} fullWidth style={styles.primaryBtn} tone="candidate" />
      <Button label="Ya tengo cuenta" variant="ghost" onPress={onSwitchToLogin} fullWidth tone="neutral" />
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
