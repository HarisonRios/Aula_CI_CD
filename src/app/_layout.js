import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1a73e8',
        headerStyle: { backgroundColor: '#1a73e8' },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agendamento"
        options={{
          title: 'Agendamento',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pagamento"
        options={{
          title: 'Pagamento',
          tabBarIcon: ({ color, size }) => <Ionicons name="cash" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
