import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native'
import Main from './src/components/Main';
import MovieProvider from './src/context/MovieProvider';

export default function App() {
  return (
    <NativeRouter>
      <MovieProvider>
        <StatusBar style='auto'></StatusBar>
        <Main />
      </MovieProvider>
    </NativeRouter>
  );
}
