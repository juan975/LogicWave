import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { UserRole } from '@/types';

interface LoginFormProps {
  role: UserRole;
  onSuccess: (data: any) => void;
  onBack: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ role, onSuccess, onBack, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'candidate') {
        onSuccess({
          id: 'candidate-1',
          name: 'María Fernanda Calle',
          email,
          progress: 0.82,
        });
      } else {
        onSuccess({
          id: 'employer-1',
          company: 'Industrias ABC',
          contactName: 'Patricia Ludeña',
          email,
          needsPasswordChange: true,
          isEmailVerified: false,
        });
      }
    }, 700);
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.kicker}>Bolsa de Empleo CAIL</Text>
        <Text style={styles.title}>Accede como {role === 'candidate' ? 'Candidato' : 'Empleador'}</Text>
        <Text style={styles.subtitle}>
          Administra tus procesos, recibe alertas y continúa donde te quedaste.
        </Text>
      </View>
      <InputField
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      <Button
        label="Ingresar"
        onPress={handleSubmit}
        loading={loading}
        fullWidth
        style={styles.primaryBtn}
        tone={role === 'candidate' ? 'candidate' : 'employer'}
      />
      <Button
        label="Registrarme"
        variant="ghost"
        onPress={onSwitchToRegister}
        fullWidth
        style={styles.ghostBtn}
        tone="neutral"
      />
      <Button label="Volver" variant="ghost" onPress={onBack} fullWidth tone="neutral" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  kicker: {
    fontSize: 13,
    color: '#E0F2E9',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 6,
  },
  primaryBtn: {
    marginTop: 4,
  },
  ghostBtn: {
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'transparent',
  },
});
