import React from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Logo source={{ uri: 'https://img.icons8.com/ios-filled/100/228B22/earth-planet.png' }} />

      <AppTitle>Sentinela da Terra</AppTitle>

      <ButtonGroup>
        <StyledButton
          title="Inserir Dados"
          onPress={() => navigation.navigate('DataInput')}
          buttonStyle={primaryButton}
        />

        <StyledButton
          title="Ver Risco Atual"
          onPress={() => navigation.navigate('RiskOverview')}
          buttonStyle={secondaryButton}
        />

        <StyledButton
          title="Histórico de Monitoramento"
          onPress={() => navigation.navigate('MonitoringHistory')}
          buttonStyle={secondaryButton}
        />

        <StyledButton
          title="Ações de Mitigação"
          onPress={() => navigation.navigate('MitigationActions')}
          buttonStyle={secondaryButton}
        />
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.medium}px;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: ${theme.spacing.large}px;
`;

const AppTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.large}px;
`;

const ButtonGroup = styled.View`
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-bottom: ${theme.spacing.medium}px;
`;

const primaryButton = {
  backgroundColor: theme.colors.primary,
  borderRadius: 8,
  padding: 12,
};

const secondaryButton = {
  backgroundColor: theme.colors.secondary,
  borderRadius: 8,
  padding: 12,
};

export default WelcomeScreen;
