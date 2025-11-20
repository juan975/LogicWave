import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useResponsiveLayout } from '@/hooks/useResponsive';
import { EmployerProfileScreen } from './EmployerProfileScreen';
import { OffersManagementScreen } from './OffersManagementScreen';
import ReceivedApplicationsScreen from './ReceivedApplicationsScreen';
import { EmployerUserData } from '@/types';

const logo = require('@/assets/0198b872f16fe45d3593d066ae15f05331a33cf2.png');

type EmployerTab = 'offers' | 'applications' | 'profile';

interface EmployerShellProps {
  userData: EmployerUserData;
  onLogout: () => void;
}

export function EmployerShell({ userData, onLogout }: EmployerShellProps) {
  const [tab, setTab] = useState<EmployerTab>('offers');
  const { contentWidth, horizontalGutter } = useResponsiveLayout();

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
      <View style={[styles.container, { paddingHorizontal: horizontalGutter }]}>
        {/* Header simple */}
        <View style={[styles.maxWidth, { maxWidth: contentWidth }]}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={logo} style={styles.logo} />
              <View>
                <Text style={styles.headerLabel}>Empleador</Text>
                <Text style={styles.headerCompany}>{userData.company}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
              <Feather name="log-out" color="#374151" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido */}
        <View style={[styles.contentWrapper, styles.maxWidth, { maxWidth: contentWidth }]}>
          <View style={styles.content}>{renderScreen()}</View>
        </View>

        {/* Navbar inferior */}
        <View style={[styles.navbar, styles.maxWidth, { maxWidth: contentWidth }]}>
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
    <TouchableOpacity onPress={onPress} style={styles.navItem}>
      <Feather 
        name={icon} 
        size={24} 
        color={active ? '#F59E0B' : '#9CA3AF'} 
      />
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  maxWidth: {
    width: '100%',
    alignSelf: 'center',
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  headerLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  logoutBtn: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#F59E0B',
    fontWeight: '600',
  },
});
