import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { useResponsiveLayout } from '@/hooks/useResponsive';
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
  const { contentWidth, horizontalGutter } = useResponsiveLayout();

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
      <View style={[styles.container, { paddingHorizontal: horizontalGutter }]}>
        <View style={[styles.maxWidth, styles.flexFill, { maxWidth: contentWidth }]}>
          <View style={styles.headerCard}>
            <View style={styles.headerLeft}>
              <View style={styles.logoBadge}>
                <Image source={logo} style={styles.logo} />
              </View>
              <View>
                <Text style={styles.headerEyebrow}>Candidato</Text>
                <Text style={styles.headerTitle}>Bolsa de Empleo CAIL</Text>
                <Text style={styles.headerSubtitle}>Hola, {userData.name}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
              <Feather name="log-out" color={colors.candidateDark} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>{renderScreen()}</View>
        </View>
        <View style={[styles.navbar, styles.maxWidth, { maxWidth: contentWidth }]}>
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
      <View style={[styles.navIcon, active && styles.navIconActive]}>
        <Feather name={icon} size={18} color={active ? colors.candidateDark : colors.muted} />
      </View>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  maxWidth: {
    width: '100%',
    alignSelf: 'center',
  },
  flexFill: {
    flex: 1,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.candidateSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  headerEyebrow: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    padding: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceMuted,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    borderRadius: 22,
  },
  navItemActive: {
    backgroundColor: colors.candidateSurface,
  },
  navLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  navLabelActive: {
    color: colors.candidateDark,
  },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  navIconActive: {
    backgroundColor: colors.candidateSurface,
  },
});
