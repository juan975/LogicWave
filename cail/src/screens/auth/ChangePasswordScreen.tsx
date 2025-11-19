import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

interface ChangePasswordScreenProps {
  userData: any;
  onPasswordChanged: () => void;
  onLogout: () => void;
}

export function ChangePasswordScreen({ userData, onPasswordChanged, onLogout }: ChangePasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (password.length < 8) {
      Alert.alert('Contraseña débil', 'Usa al menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validación', 'Las contraseñas no coinciden.');
      return;
    }
    onPasswordChanged();
  };

  return (
    <LinearGradient colors={['#003366', '#007a3d']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Text style={styles.kicker}>Actualizar contraseña</Text>
            <Text style={styles.title}>{userData?.company ?? 'Tu cuenta'}</Text>
            <Text style={styles.subtitle}>
              Por seguridad debes definir una contraseña definitiva antes de continuar.
            </Text>
            <InputField
              label="Nueva contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            <InputField
              label="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            <Button label="Guardar y continuar" onPress={handleSubmit} fullWidth style={styles.primaryBtn} tone="employer" />
            <Button label="Cerrar sesión" variant="ghost" onPress={onLogout} fullWidth tone="neutral" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 20,
  },
  kicker: {
    color: '#E0F2E9',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.75)',
    marginVertical: 12,
  },
  primaryBtn: {
    marginTop: 6,
  },
});
