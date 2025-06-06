import styled from 'styled-components/native';
import theme from './theme'; // já está em src/styles, então pode ser importado diretamente

export const HeaderContainer = styled.View`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.medium}px;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

export const HeaderTitle = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
`;
