import React from 'react';
import { SafeAreaView } from 'react-native';
import { HeaderContainer, HeaderTitle } from '../styles/HeaderStyles';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => (
  <SafeAreaView>
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  </SafeAreaView>
);

export default Header;
