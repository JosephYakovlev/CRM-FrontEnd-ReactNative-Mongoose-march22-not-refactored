import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../context/AuthContext';
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';
import { getStatusBarHeight } from 'react-native-status-bar-height'



export default function LoginPage({navigation}) {

  const {state, signin} = useContext(AuthContext)
  
  const data = 2

  const headerHeight = getStatusBarHeight() 
  
  const routeCRMMainPage = () =>{
    navigation.navigate('CRMMainPage')
  }

  const [form1, setForm1] = useState(
    {
      email:'v5@mail.ru', 
      password: '12345',
    }
  )

  const [form2, setForm2] = useState(
    {
      email:'v12@mail.ru', 
      password: '1345',
    }
  )


    const registerHandler1 = async (result) => {
      try {
       const response = await axios.post("http://62.113.97.220:8800/api/auth/login", form1)
         
       
        .then(async (response) => {
          if(response.status == 400) {
            Alert.alert(
              "Неудача!",
              "Данные не совпадают",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            )
          }

          const userId = response.data.user._id;
          const userToken = response.data.token;
          const userDump = {...response.data.user, concludingContracts: response.data.conContrs, runningContracts: response.data.fullRunContrs}
          console.log("RESPONSEEES")
          
            // Store the credentials
            await SecureStore.setItemAsync('token', JSON.stringify(userToken))

              return (response, userDump)
              }). then( (userDump)=>{

                socket.emit('join-room', userDump._id)

                socket.on('hey', message => {
                  console.log(message)
                })

                socket.on('reload', async (room) => {
                  console.log('CONCONTR 1')
                  const response = await axios.get(`http://62.113.97.220:8800/api/auth/reload/${room}`).then((response)=>{


                    const userDump = {...response.data.user, concludingContracts: response.data.conContrs, runningContracts: response.data.fullRunContrs}
                    
                    

                    signin({userDump})
                    console.log("SDTsadt")
                  })
                })
                
                const conclContractsRooms = userDump.concludingContracts.map((contr)=> {
                  if(!contr?._id) {
                    return 
                    } else {
                      return contr._id
                    }
                })
                
                
                signin({userDump})
                
                  if (userDump) {
                    console.log('вход выполнен успешно')
                  } else {
                    alert('No values stored under that key.');
                  }
                
              }).then(() => {
          // redirect home
                    navigation.navigate('Main')
                  })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }

    const registerHandler2 = async (result) => {
      try {
        console.log("HELLO")
       const response = await axios.post("http://62.113.97.220:8800/api/auth/login", form2)
         
       
        .then(async (response) => {
          console.log(response.data)
          if(response.data.message == 400) {
            Alert.alert(
              "Неудача!",
              "Данные не совпадают",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            )
          }
          const userId = response.data.user._id;
          const userToken = response.data.token;
          const userDump = {...response.data.user, concludingContracts: response.data.conContrs, runningContracts: response.data.fullRunContrs}
          console.log("RESPONSEEES")
            // Store the credentials
            await SecureStore.setItemAsync('token', JSON.stringify(userToken))

              return (response, userDump)
              }). then( (userDump)=>{
                
                
                socket.emit('join-room', userDump._id)

                socket.on('hey', message => {
                  console.log(message)
                })

                socket.on('reload', async (room) => {
                  console.log('CONCONTR 2')
                  console.log(room)
                  const response = await axios.get(`http://62.113.97.220:8800/api/auth/reload/${room}`).then((response)=>{
                    console.log("RESPONSE RELOAD 2")
                    console.log(response.data.fullRunContrs)
                    const userDump = {...response.data.user, concludingContracts: response.data.conContrs, runningContracts: response.data.fullRunContrs}
                    
                    signin({userDump})
                    console.log("SDTsadt")
                  })
                })
                
                const conclContractsRooms = userDump.concludingContracts.map((contr)=> {
                  if(!contr?._id) {
                  return 
                  } else {
                    return contr._id
                  }
                })

                
                
                signin({userDump})
                
                  if (userDump) {
                    console.log('вход выполнен успешно')
                  } else {
                    alert('No values stored under that key.');
                  }
                
              }).then(() => {
          // redirect home
                    navigation.navigate('Main')
                  })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    


  return (
    <View style={styles.container}>

      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: headerHeight}}>
                
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#31383e'}}>
                    В Х О Д
                </Text>

                <Image source ={require('../../assets/crm/logo.png')} style={{
                    marginTop: 15,
                    width: 50,
                    height: 66
                }} />
            </View>

          <TextInput
            onChangeText={(userEmail) => setForm({...form, email: userEmail})}
            placeholder="Электронная почта"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />

          <TextInput
          onChangeText={(pass) => setForm({...form, password: pass})}
          placeholder="Пароль"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
          />



          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#00000099'}}>

          </View>
          
          <TouchableOpacity onPress={registerHandler1} style={styles.LogInButton}>

                <Text style={{fontSize: 20,color: 'black'}}>
                    Пользователь 1
                </Text>

          </TouchableOpacity>

          <TouchableOpacity onPress={registerHandler2} style={styles.LogInButton}>

                <Text style={{fontSize: 20,color: 'black'}}>
                    Пользователь 2
                </Text>

          </TouchableOpacity>


    </View>
  )
}



const styles = StyleSheet.create({
input: {
  width: 350,
  margin: 10,
  padding: 8,
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
  borderBottomWidth: 1
  
},
container: {
  alignItems: 'center',
  backgroundColor: 'white',
  minHeight: "100%",
},
 logo:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#006b76',
  borderRadius: 3,
  height: '10%',
  width: '97%'
 },
 modalOne:{
  flex: 1,
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor: '#00000099'
 },
 modalInner:{
  height: '40%',
  flexDirection: 'row',
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 10
 },
 cam:{
  width: '50%',
  alignItems:'center',
  justifyContent: 'center',
  flexDirection: 'column'
  
 },
 gal:{
  width: '50%',
  alignItems:'center',
  justifyContent: 'center',
  flexDirection: 'column'
 },
 LogInButton:{
     alignSelf: 'center', 
     alignItems: 'center', 
     justifyContent: 'center', 
     width:'80%',
     borderWidth: 1,
     borderRadius: 10,
     minHeight: 70,
     backgroundColor: 'white', 
    //  #31383e
     marginTop: 25
 }
 
 
})
