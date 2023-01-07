import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, Dimensions,SafeAreaView,ScrollView} from 'react-native'
import {Context as AuthContext} from '../../../context/AuthContext';
import CRMProfileBar from '../components/CRMProfileBar';


export default function ConnectToProcess({navigation}) {

  const {state, signin} = useContext(AuthContext)

  const routeUserPage = () =>{
    navigation.navigate('UserPage')
  }

  const [form, setForm] = useState(
    {
      mainTitle: '',
      title: '',
      price:'',
      profession: '2',
      category: '4',
      otherImg:[{}]
    }
  )

    const registerHandler = async (result) => {
      try {
       const response = await axios.post("http://192.168.0.108:8800/api/ticket/register",{...form, data: `data:image/png;base64,${img64.base64}`})
       
       
        .then((response) => {
          // redirect TicketPage
                    const ticket = response.data
                    console.log(ticket)
                    navigation.navigate('TicketPage',ticket);
                    
                  })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    
  
  return (
    <SafeAreaView style={{flex: 1}}>
      
    
      <View style={styles.container}>

      <View style={styles.logo}>
        <Text style={{fontSize: 28,fontWeight: 'bold',color: 'white'}}>
            B U I L D E R
        </Text>
        <Text style={{color:'white', fontSize: 15}}>
          Регистрация объекта 
        </Text>
      </View>

        <TextInput 
          onChangeText={(name) => setForm({...form, mainTitle: name})}
          placeholder="ID"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
          onChangeText={(desc) => setForm({...form, title: desc})}
          placeholder="Пароль"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />

        <TouchableOpacity 
          style={{borderWidth: 1, width: "90%",alignItems: 'center', justifyContent: 'center', borderRadius: 10, margin: 5,backgroundColor: '#31383e',borderWidth: 1}}
          onPress={() => setOpen(true)}
        >
          
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            Присоединиться 
          </Text>

        </TouchableOpacity>
        </View>
      <View style={{position:'absolute',bottom: 0 }}>
        <CRMProfileBar />
      </View>
      
  </SafeAreaView>
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
  borderBottomWidth: 1,
  
},
container: {
  backgroundColor: 'white',
  alignItems:'center',
},
 logo:{
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  width: '100%',
  backgroundColor: '#31383e',
  paddingVertical: 5
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
 }
 
 
})
