import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import theme from '../styles/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type RiskOverviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RiskOverview'>;
};

type Reading = {
  id: string;
  timestamp: string;
  soilMoisture: number;
  slopeAngle: number;
  observation?: string;
};

type RiskLevel = 'Baixo' | 'Moderado' | 'Alto';

const RiskOverviewScreen: React.FC<RiskOverviewScreenProps> = ({ navigation }) => {
  const [latestReading, setLatestReading] = useState<Reading | null>(null);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Baixo');

  useEffect(() => {
    const loadLastReading = async () => {
      try {
        const stored = await AsyncStorage.getItem('readings');
        const allReadings: Reading[] = stored ? JSON.parse(stored) : [];
        if (allReadings.length > 0) {
          const last = allReadings[allReadings.length - 1];
          setLatestReading(last);
          setRiskLevel(evaluateRisk(last.soilMoisture, last.slopeAngle));
        }
      } catch (error) {
        console.error('Erro ao carregar leitura:', error);
      }
    };

    loadLastReading();
  }, []);

  /**
   * Avalia o nível de risco com base na umidade do solo e na inclinação do terreno.
   *
   * Fontes consultadas:
   * - CPRM (Serviço Geológico do Brasil)
   * - Defesa Civil de SP
   * - Trabalhos acadêmicos como Cerri et al. (2012)
   *
   * Regras usadas:
   * - Risco Alto: umidade do solo > 70% OU inclinação > 45°
   * - Risco Moderado: umidade > 50% OU inclinação > 30°
   * - Risco Baixo: abaixo desses valores
   */
  const evaluateRisk = (moisture: number, angle: number): RiskLevel => {
    if (moisture > 70 || angle > 45) return 'Alto';
    if (moisture > 50 || angle > 30) return 'Moderado';
    return 'Baixo';
  };

  return (
    <Container>
      <Header title="Visão de Risco" />

      {latestReading ? (
        <Content>
          <Label>Última leitura em:</Label>
          <Value>{new Date(latestReading.timestamp).toLocaleString()}</Value>

          <Label>Umidade do Solo:</Label>
          <Value>{latestReading.soilMoisture}%</Value>

          <Label>Inclinação:</Label>
          <Value>{latestReading.slopeAngle}°</Value>

          <RiskBox risk={riskLevel}>Risco: {riskLevel}</RiskBox>

          {(riskLevel === 'Moderado' || riskLevel === 'Alto') && (
            <Button
              title="Ver Ações de Mitigação"
              onPress={() => navigation.navigate('MitigationActions')}
              buttonStyle={primaryButton}
            />
          )}

          <Button
            title="Ver Histórico"
            onPress={() => navigation.navigate('MonitoringHistory')}
            buttonStyle={secondaryButton}
          />

          <Button
            title="Voltar ao Início"
            onPress={() => navigation.navigate('Welcome')}
            buttonStyle={secondaryButton}
          />
        </Content>
      ) : (
        <EmptyText>Nenhuma leitura disponível</EmptyText>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

const Label = styled.Text`
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.small}px;
`;

const Value = styled.Text`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body.fontSize}px;
`;

const RiskBox = styled.Text<{ risk: RiskLevel }>`
  font-weight: bold;
  margin-top: ${theme.spacing.medium}px;
  font-size: 20px;
  text-align: center;
  padding: ${theme.spacing.medium}px;
  border-radius: 8px;
  color: white;
  background-color: ${(props: { risk: RiskLevel }) =>
    props.risk === 'Alto'
      ? theme.colors.error
      : props.risk === 'Moderado'
      ? theme.colors.secondary
      : theme.colors.primary};
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
`;

const primaryButton = {
  backgroundColor: theme.colors.primary,
  borderRadius: 8,
  padding: 12,
  marginTop: 20,
};

const secondaryButton = {
  backgroundColor: theme.colors.secondary,
  borderRadius: 8,
  padding: 12,
  marginTop: 12,
};

export default RiskOverviewScreen;