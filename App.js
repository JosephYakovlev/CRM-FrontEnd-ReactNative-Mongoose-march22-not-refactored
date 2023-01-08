import React ,{useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigate';
import {Provider as AuthProvider} from './context/AuthContext.js';

export default function App() {
  return (
      <AuthProvider>
          <MainStack />
      </AuthProvider>
  );
}

const styles = StyleSheet.create({
});