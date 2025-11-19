import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
          needsPasswordChange: false,
          isEmailVerified: true,
        });
      }
    }, 700);
  };

  const iconBgColor = role === 'candidate' ? '#D1FAE5' : '#FEF3C7';
  const iconColor = role === 'candidate' ? '#0F8154' : '#F59E0B';
  const buttonColor = role === 'candidate' ? '#0F8154' : '#F59E0B';

  return (
    <View style={styles.container}>
      {/* Header con botón volver y logo */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="chevron-left" size={20} color="#0F8154" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.logoSmall}>
          <Text style={styles.logoText}>CAIL</Text>
        </View>
      </View>

      {/* Card de login */}
      <View style={styles.card}>
        {/* Icono de usuario/empleador */}
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
          <Feather 
            name={role === 'candidate' ? 'user' : 'briefcase'} 
            size={32} 
            color={iconColor} 
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>
          {role === 'candidate' 
            ? 'Candidato - Administración de Candidatos' 
            : 'Empleador - Administración de Empleadores'}
        </Text>

        {/* Campos de formulario */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {role === 'candidate' ? 'Email' : 'Email Corporativo'}
            </Text>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder={role === 'candidate' ? 'tu@email.com' : 'empresa@dominio.com'}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              style={styles.input}
            />
          </View>

          {/* Link olvidaste contraseña */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Botón Iniciar Sesión */}
          <TouchableOpacity 
            onPress={handleSubmit}
            style={[styles.submitButton, { backgroundColor: buttonColor }]}
            disabled={loading}
          >
            <Text style={styles.submitText}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

          {/* Separador */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Link registro */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Al continuar, aceptas los términos y condiciones de CAIL
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#0F8154',
    fontSize: 16,
    fontWeight: '500',
  },
  logoSmall: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    color: '#0F8154',
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 0,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#0F8154',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#9CA3AF',
    fontSize: 14,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#0F8154',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
});
