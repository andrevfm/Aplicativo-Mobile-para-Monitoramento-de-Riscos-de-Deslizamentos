import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button } from 'react-native-elements';
import { View, Alert } from 'react-native';
import theme from '../styles/theme';

type SensorFormProps = {
  onSubmit: (data: {
    soilMoisture: number;
    slopeAngle: number;
    observation?: string;
  }) => void;
};

const DataInputForm: React.FC<SensorFormProps> = ({ onSubmit }) => {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [slopeAngle, setSlopeAngle] = useState('');
  const [observation, setObservation] = useState('');

  const handleSubmit = () => {
    const moisture = parseFloat(soilMoisture);
    const angle = parseFloat(slopeAngle);

    if (isNaN(moisture) || isNaN(angle)) {
      Alert.alert('Erro', 'Insira valores válidos para umidade e inclinação');
      return;
    }

    if (moisture < 0 || moisture > 100) {
      Alert.alert('Erro', 'A umidade do solo deve estar entre 0% e 100%');
      return;
    }

    if (angle < 0 || angle > 90) {
      Alert.alert('Erro', 'A inclinação deve estar entre 0° e 90°');
      return;
    }

    onSubmit({
      soilMoisture: moisture,
      slopeAngle: angle,
      observation,
    });
  };

  return (
    <Container>
      <Title>Inserir Dados Ambientais</Title>

      <StyledInput
        placeholder="Umidade do solo (%)"
        keyboardType="numeric"
        value={soilMoisture}
        onChangeText={setSoilMoisture}
      />

      <StyledInput
        placeholder="Inclinação do terreno (°)"
        keyboardType="numeric"
        value={slopeAngle}
        onChangeText={setSlopeAngle}
      />

      <StyledInput
        placeholder="Observações (opcional)"
        multiline
        numberOfLines={4}
        value={observation}
        onChangeText={setObservation}
      />

      <StyledButton
        title="Salvar leitura"
        onPress={handleSubmit}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
          borderRadius: 8,
          padding: 12,
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
`;

const StyledInput = styled(Input).attrs({
  containerStyle: {
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.medium,
  },
})``;

const StyledButton = styled(Button)`
  margin-top: ${theme.spacing.large}px;
`;

export default DataInputForm;
