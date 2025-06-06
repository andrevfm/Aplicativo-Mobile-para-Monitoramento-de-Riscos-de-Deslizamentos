import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, RefreshControl, ListRenderItem } from 'react-native';
import Header from '../components/Header';
import theme from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Reading = {
  id: string;
  timestamp: string;
  soilMoisture: number;
  slopeAngle: number;
  observation?: string;
};

type RiskLevel = 'Baixo' | 'Moderado' | 'Alto';

const MonitoringHistoryScreen: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const loadReadings = async () => {
    try {
      const stored = await AsyncStorage.getItem('readings');
      if (stored) {
        setReadings(JSON.parse(stored));
      } else {
        setReadings([]);
      }
    } catch (error) {
      console.error('Erro ao carregar leituras:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadReadings();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadReadings();
    setRefreshing(false);
  };

  const renderItem: ListRenderItem<Reading> = ({ item }) => {
    const date = new Date(item.timestamp).toLocaleString();
    const riskLevel = calculateRisk(item.soilMoisture, item.slopeAngle);

    return (
      <ReadingCard>
        <Label>Data:</Label>
        <Value>{date}</Value>

        <Label>Umidade do Solo:</Label>
        <Value>{item.soilMoisture}%</Value>

        <Label>Inclinação:</Label>
        <Value>{item.slopeAngle}°</Value>

        {item.observation && (
          <>
            <Label>Observações:</Label>
            <Value>{item.observation}</Value>
          </>
        )}

        <RiskLabel risk={riskLevel}>Risco: {riskLevel}</RiskLabel>
      </ReadingCard>
    );
  };

  const calculateRisk = (moisture: number, angle: number): RiskLevel => {
    if (moisture > 80 || angle > 45) return 'Alto';
    if (moisture > 30 || angle > 30) return 'Moderado';
    return 'Baixo';
  };

  return (
    <Container>
      <Header title="Histórico de Monitoramento" />

      <Content>
        <ReadingList
          data={readings}
          keyExtractor={(item: Reading) => item.id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<EmptyText>Nenhuma leitura registrada</EmptyText>}
        />

        <Button
          title="Voltar ao Início"
          buttonStyle={{
            backgroundColor: theme.colors.secondary,
            borderRadius: 8,
            marginTop: theme.spacing.medium,
            padding: 12,
          }}
          onPress={() => navigation.navigate('Welcome')}
        />
      </Content>
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

const ReadingList = styled(FlatList)`flex: 1;`;

const ReadingCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
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

const RiskLabel = styled.Text<{ risk: RiskLevel }>`
  font-weight: bold;
  margin-top: ${theme.spacing.small}px;
  color: ${(props: { risk: RiskLevel }) =>
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

export default MonitoringHistoryScreen;
