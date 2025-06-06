import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, Input } from 'react-native-elements';
import Header from '../components/Header';
import theme from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { v4 as uuidv4 } from 'uuid';

type DataInputScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DataInput'>;
};

const DataInputScreen: React.FC<DataInputScreenProps> = ({ navigation }) => {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [slopeAngle, setSlopeAngle] = useState('');
  const [observation, setObservation] = useState('');

  const handleSubmit = async () => {
    const moisture = parseFloat(soilMoisture);
    const angle = parseFloat(slopeAngle);

    if (isNaN(moisture) || isNaN(angle)) {
      alert('Preencha valores válidos de umidade e inclinação');
      return;
    }

    const newReading = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      soilMoisture: moisture,
      slopeAngle: angle,
      observation,
    };

    try {
      const stored = await AsyncStorage.getItem('readings');
      const readings = stored ? JSON.parse(stored) : [];
      readings.push(newReading);
      await AsyncStorage.setItem('readings', JSON.stringify(readings));
      alert('Dados inseridos com sucesso!');
      setSoilMoisture('');
      setSlopeAngle('');
      setObservation('');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    }
  };

  return (
    <Container>
      <Header title="Inserir Dados Ambientais" />

      <Content>
        <Input
          placeholder="Umidade do Solo (%)"
          keyboardType="numeric"
          value={soilMoisture}
          onChangeText={setSoilMoisture}
          containerStyle={inputStyle}
        />

        <Input
          placeholder="Inclinação do Terreno (°)"
          keyboardType="numeric"
          value={slopeAngle}
          onChangeText={setSlopeAngle}
          containerStyle={inputStyle}
        />

        <Input
          placeholder="Observações (opcional)"
          value={observation}
          onChangeText={setObservation}
          containerStyle={inputStyle}
          multiline
        />

        <Button
          title="Salvar Dados"
          onPress={handleSubmit}
          buttonStyle={submitButtonStyle}
        />

        <Button
          title="Voltar ao Início"
          onPress={() => navigation.navigate('Welcome')}
          buttonStyle={backButtonStyle}
        />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

const inputStyle = {
  marginBottom: theme.spacing.medium,
  backgroundColor: theme.colors.white,
  borderRadius: 8,
  paddingHorizontal: theme.spacing.medium,
};

const submitButtonStyle = {
  backgroundColor: theme.colors.primary,
  borderRadius: 8,
  padding: 12,
  marginTop: 16,
};

const backButtonStyle = {
  backgroundColor: theme.colors.secondary,
  borderRadius: 8,
  padding: 12,
  marginTop: 12,
};

export default DataInputScreen;