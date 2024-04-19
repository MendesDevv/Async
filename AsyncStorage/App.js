import { Text, FlatList, Button, TextInput, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

_storeData = async (userParaSalvar, listaParaSalvar) => {
  try {
    await AsyncStorage.setItem(userParaSalvar, listaParaSalvar);
  } catch (error) {alert(error)}};

_retrieveData = async (userParaPegar) => {
  try {
    const value = await AsyncStorage.getItem(userParaPegar);
    if (value !== null) {alert(value);}
  } catch (error) {alert(error)}};

_retrieveAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys)
    values.forEach(element => {
         alert(element);
       })
  } catch (error) {alert(error)}};


const registrarProduto = ()=>{
  const[matVal, setMat] = useState('');
  const[nomeVal, setNome] = useState('');
  const[emailVal, setEmail] = useState('');
  return(
  <View>
    <TextInput placeholder='Matrícula' value={matVal} onChangeText={setMat}/>
    <TextInput placeholder='Nome' value={nomeVal} onChangeText={setNome}/>
    <TextInput placeholder='E-mail' value={emailVal} onChangeText={setEmail}/>
    <Button onPress={()=>_storeData(matVal, '{"Nome":"'+nomeVal+'", "E-mail":"' + emailVal+'"}')} title="Concluir Cadastro"/> 
    <Button onPress={()=>_retrieveData(matVal)} title="Consultar Cadastro"/>
  </View>
)}


const home = ({navigation})=>{return(
  <View>
  <Button onPress={()=>navigation.navigate("Registrar")} title="Entre em contato conosco"/>
  <FlatList
        data
        renderItem={({item}) => (
        <View>
          <Text>{}</Text>
        </View>
      )}
      />

  </View>)}


export default function App() {
  return (
      <NavigationContainer>	 		
        <Stack.Navigator>
          <Stack.Screen name="Home" component={home}/>
          <Stack.Screen name="Registrar" component={registrarProduto}/>      	
        </Stack.Navigator>    
    </NavigationContainer>
  );}
