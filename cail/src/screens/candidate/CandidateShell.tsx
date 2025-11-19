import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/theme/colors';
import { CandidateProfileScreen } from './CandidateProfileScreen';
import { JobDiscoveryScreen } from './JobDiscoveryScreen';
import { MyApplicationsScreen } from './MyApplicationsScreen';
import { NotificationsScreen } from './NotificationsScreen';
import { CandidateUserData } from '@/types';

const logo = require('@/assets/0198b872f16fe45d3593d066ae15f05331a33cf2.png');

type CandidateTab = 'discovery' | 'applications' | 'notifications' | 'profile';

interface CandidateShellProps {
  userData: CandidateUserData;
  onLogout: () => void;
}

export function CandidateShell({ userData, onLogout }: CandidateShellProps) {
  const [tab, setTab] = useState<CandidateTab>('discovery');

  const renderScreen = () => {
    switch (tab) {
      case 'profile':
        return <CandidateProfileScreen />;
      case 'applications':
        return <MyApplicationsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      default:
        return <JobDiscoveryScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <LinearGradient colors={gradients.candidate} style={styles.hero}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Image source={logo} style={styles.logo} />
              <View>
                <Text style={styles.headerEyebrow}>Candidato</Text>
                <Text style={styles.headerTitle}>Hola, {userData.name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
              <Feather name="log-out" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Avance del perfil</Text>
              <Text style={styles.statValue}>{Math.round((userData.progress ?? 0.78) * 100)}%</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Alertas activas</Text>
              <Text style={styles.statValue}>4</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.content}>{renderScreen()}</View>
        <View style={styles.navbar}>
          <NavItem icon="search" label="Descubrir" active={tab === 'discovery'} onPress={() => setTab('discovery')} />
          <NavItem
            icon="file-text"
            label="Postulaciones"
            active={tab === 'applications'}
            onPress={() => setTab('applications')}
          />
          <NavItem
            icon="bell"
            label="Alertas"
            active={tab === 'notifications'}
            onPress={() => setTab('notifications')}
          />
          <NavItem icon="user" label="Perfil" active={tab === 'profile'} onPress={() => setTab('profile')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.navItem, active && styles.navItemActive]}>
      <Feather name={icon} size={20} color={active ? colors.candidate : colors.muted} />
      <Text style={[styles.navLabel, active && { color: colors.candidate }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 6,
  },
  headerEyebrow: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  logoutBtn: {
    padding: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 12,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navItemActive: {
    borderRadius: 18,
    backgroundColor: colors.candidateSurface,
  },
  navLabel: {
    fontSize: 12,
    color: colors.muted,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },
});
