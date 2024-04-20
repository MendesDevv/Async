import React, { useState, useEffect } from 'react';
import { Text, FlatList, Button, TextInput, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

_storeData = async (userParaSalvar, listaParaSalvar) => {
  try {
    await AsyncStorage.setItem(userParaSalvar, listaParaSalvar);
  } catch (error) {
    alert(error)
  }
};

_retrieveData = async (userParaPegar) => {
  try {
    const value = await AsyncStorage.getItem(userParaPegar);
    if (value !== null) {
      alert(value);
    }
  } catch (error) {
    alert(error)
  }
};

_retrieveAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    return values.map(([key, value]) => JSON.parse(value));
  } catch (error) {
    alert(error)
  }
};

const RegistrarProduto = () => {
  const [matVal, setMat] = useState('');
  const [nomeVal, setNome] = useState('');
  const [emailVal, setEmail] = useState('');

  return (
    <View>
      <TextInput placeholder='Matrícula' value={matVal} onChangeText={setMat} />
      <TextInput placeholder='Nome' value={nomeVal} onChangeText={setNome} />
      <TextInput placeholder='E-mail' value={emailVal} onChangeText={setEmail} />
      <Button onPress={() => _storeData(matVal, JSON.stringify({ "Nome": nomeVal, "E-mail": emailVal }))} title="Concluir Cadastro" />
      <Button onPress={() => _retrieveData(matVal)} title="Consultar Cadastro" />
    </View>
  )
}

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await _retrieveAllData();
      setUserData(data);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Button onPress={() => navigation.navigate("Registrar")} title="Entre em contato conosco" />
      <FlatList
        data={userData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Nome} - {item['E-mail']}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Registrar" component={RegistrarProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
