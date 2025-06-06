import React from 'react';
import styled from 'styled-components/native';
import Header from '../components/Header';
import theme from '../styles/theme';
import { Button } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type MitigationActionsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MitigationActions'>;
};

const MitigationActionsScreen: React.FC<MitigationActionsScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Header title="Ações de Mitigação" />

      <Content>
        <Instruction>
          Aqui estão algumas ações recomendadas para reduzir o risco de deslizamentos em áreas
          vulneráveis:
        </Instruction>

        <Item>• Monitorar a umidade do solo com sensores adequados</Item>
        <Item>• Evitar desmatamento em áreas de encosta</Item>
        <Item>• Promover drenagem eficiente da água da chuva</Item>
        <Item>• Construir muros de contenção quando necessário</Item>
        <Item>• Implementar campanhas de educação e evacuação</Item>

        <Button
          title="Voltar ao Início"
          onPress={() => navigation.navigate('Welcome')}
          buttonStyle={buttonStyle}
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
  padding: ${theme.spacing.large}px;
`;

const Instruction = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const Item = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const buttonStyle = {
  backgroundColor: theme.colors.secondary,
  borderRadius: 8,
  padding: 12,
  marginTop: 24,
};

export default MitigationActionsScreen;