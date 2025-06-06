import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import DataInputScreen from '../screens/DataInputScreen';
import RiskOverviewScreen from '../screens/RiskOverviewScreen';
import MonitoringHistoryScreen from '../screens/MonitoringHistoryScreen';
import MitigationActionsScreen from '../screens/MitigationActionsScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="DataInput" component={DataInputScreen} />
      <Stack.Screen name="RiskOverview" component={RiskOverviewScreen} />
      <Stack.Screen name="MonitoringHistory" component={MonitoringHistoryScreen} />
      <Stack.Screen name="MitigationActions" component={MitigationActionsScreen} />
    </Stack.Navigator>
  );
}