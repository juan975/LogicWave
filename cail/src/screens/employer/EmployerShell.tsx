import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/theme/colors';
import { EmployerProfileScreen } from './EmployerProfileScreen';
import { OffersManagementScreen } from './OffersManagementScreen';
import { ReceivedApplicationsScreen } from './ReceivedApplicationsScreen';
import { EmployerUserData } from '@/types';

const logo = require('@/assets/0198b872f16fe45d3593d066ae15f05331a33cf2.png');

type EmployerTab = 'offers' | 'applications' | 'profile';

interface EmployerShellProps {
  userData: EmployerUserData;
  onLogout: () => void;
}

export function EmployerShell({ userData, onLogout }: EmployerShellProps) {
  const [tab, setTab] = useState<EmployerTab>('offers');

  const renderScreen = () => {
    switch (tab) {
      case 'profile':
        return <EmployerProfileScreen />;
      case 'applications':
        return <ReceivedApplicationsScreen />;
      default:
        return <OffersManagementScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#FFF3E2', '#FFE8D7']} style={styles.backdrop} pointerEvents="none" />
      <View style={styles.container}>
        <LinearGradient colors={gradients.employer} style={styles.hero}>
          <LinearGradient
            colors={['rgba(255,255,255,0.18)', 'transparent']}
            style={styles.heroOverlay}
            pointerEvents="none"
          />
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Image source={logo} style={styles.logo} />
              <View>
                <Text style={styles.headerEyebrow}>Empleador</Text>
                <Text style={styles.headerTitle}>{userData.company}</Text>
                <Text style={styles.headerSubtitle}>{userData.contactName}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
              <Feather name="log-out" color="#fff" size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIcon}>
                  <Feather name="briefcase" size={16} color="#fff" />
                </View>
                <Text style={styles.statLabel}>Ofertas activas</Text>
              </View>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statHint}>Última publicación hace 2 días.</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={styles.statIcon}>
                  <Feather name="users" size={16} color="#fff" />
                </View>
                <Text style={styles.statLabel}>Postulaciones hoy</Text>
              </View>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statHint}>+3 respecto a la media.</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.content}>{renderScreen()}</View>
        <View style={styles.navbar}>
          <EmployerNavItem
            icon="briefcase"
            label="Ofertas"
            active={tab === 'offers'}
            onPress={() => setTab('offers')}
          />
          <EmployerNavItem
            icon="users"
            label="Postulaciones"
            active={tab === 'applications'}
            onPress={() => setTab('applications')}
          />
          <EmployerNavItem
            icon="home"
            label="Empresa"
            active={tab === 'profile'}
            onPress={() => setTab('profile')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function EmployerNavItem({
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
        <Feather name={icon} size={18} color={active ? colors.employerDark : colors.muted} />
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
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
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
  },
  logoutBtn: {
    padding: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  statHint: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    fontSize: 12,
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 26,
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
    borderRadius: 20,
  },
  navItemActive: {
    backgroundColor: colors.employerSurface,
  },
  navLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  navLabelActive: {
    color: colors.employerDark,
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
    backgroundColor: colors.employerSurface,
  },
});
