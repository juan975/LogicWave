import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthScreen } from '@/screens/auth/AuthScreen';
import { ChangePasswordScreen } from '@/screens/auth/ChangePasswordScreen';
import { CandidateShell } from '@/screens/candidate/CandidateShell';
import { EmployerShell } from '@/screens/employer/EmployerShell';
import { CandidateUserData, EmployerUserData, UserRole, UserSession } from '@/types';
import { colors } from '@/theme/colors';

function RootApp() {
  const [session, setSession] = useState<UserSession | null>(null);

  const handleAuthSuccess = (role: UserRole, userData: any) => {
    setSession({
      role,
      userData,
      needsPasswordChange: role === 'employer' ? userData?.needsPasswordChange ?? false : false,
      isEmailVerified: userData?.isEmailVerified ?? true,
    });
  };

  const handleLogout = () => {
    setSession(null);
  };

  const handlePasswordChanged = () => {
    if (session) {
      setSession({ ...session, needsPasswordChange: false });
    }
  };

  if (!session) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  if (session.role === 'employer' && session.needsPasswordChange) {
    return (
      <ChangePasswordScreen
        userData={session.userData}
        onPasswordChanged={handlePasswordChanged}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <View style={styles.appBackground}>
      {session.role === 'candidate' ? (
        <CandidateShell userData={session.userData as CandidateUserData} onLogout={handleLogout} />
      ) : (
        <EmployerShell userData={session.userData as EmployerUserData} onLogout={handleLogout} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
