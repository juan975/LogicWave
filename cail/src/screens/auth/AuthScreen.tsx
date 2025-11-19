import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types';
import { LoginForm } from './LoginForm';
import { RegisterCandidateForm } from './RegisterCandidateForm';
import { RegisterEmployerForm } from './RegisterEmployerForm';

const logo = require('@/assets/0198b872f16fe45d3593d066ae15f05331a33cf2.png');

type AuthMode = 'select' | 'login' | 'register';

type AuthScreenProps = {
  onAuthSuccess: (role: UserRole, data: any) => void;
};

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('candidate');
  const [mode, setMode] = useState<AuthMode>('select');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode('login');
  };

  const handleSuccess = (data: any) => {
    onAuthSuccess(selectedRole, data);
  };

  return (
    <LinearGradient colors={['#003366', '#007a3d', '#00994C']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logoWrapper}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.headline}>Bolsa de Empleo CAIL</Text>
            <Text style={styles.subtitle}>Cámara de Industrias de Loja</Text>
          </View>

          {mode === 'select' ? (
            <View style={styles.options}>
              <RoleButton
                title="Soy Candidato"
                description="Busco oportunidades alineadas a mi perfil"
                icon="user"
                onPress={() => handleRoleSelect('candidate')}
              />
              <RoleButton
                title="Soy Empleador"
                description="Gestiono vacantes y talentos"
                icon="briefcase"
                accent="employer"
                onPress={() => handleRoleSelect('employer')}
              />
            </View>
          ) : (
            <View style={styles.formWrapper}>
              {mode === 'login' && (
                <LoginForm
                  role={selectedRole}
                  onSuccess={handleSuccess}
                  onBack={() => setMode('select')}
                  onSwitchToRegister={() => setMode('register')}
                />
              )}
              {mode === 'register' && selectedRole === 'candidate' && (
                <RegisterCandidateForm
                  onSuccess={handleSuccess}
                  onBack={() => setMode('select')}
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
              {mode === 'register' && selectedRole === 'employer' && (
                <RegisterEmployerForm
                  onSuccess={handleSuccess}
                  onBack={() => setMode('select')}
                  onSwitchToLogin={() => setMode('login')}
                />
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function RoleButton({
  title,
  description,
  icon,
  onPress,
  accent = 'candidate',
}: {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
  accent?: 'candidate' | 'employer';
}) {
  const accentColor = accent === 'candidate' ? '#00994C' : '#F39200';
  return (
    <View style={styles.roleCard}>
      <View style={styles.roleIcon}>
        <Feather name={icon} size={26} color="#fff" />
      </View>
      <View style={styles.roleContent}>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleDescription}>{description}</Text>
      </View>
      <Button
        label="Continuar"
        onPress={onPress}
        variant="ghost"
        style={[styles.roleButton, { borderColor: accentColor }]}
        tone={accent === 'candidate' ? 'candidate' : 'employer'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  options: {
    gap: 16,
  },
  roleCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  roleIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    padding: 14,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  roleDescription: {
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  roleButton: {
    borderRadius: 16,
  },
  formWrapper: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 20,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
});
