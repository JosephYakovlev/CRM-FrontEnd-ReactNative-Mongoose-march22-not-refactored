import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../context/AuthContext';
import ProfileBar from '../components/profilebar/ProfileBar';


export default function AddMoneyPage({navigation}) {
    

  const {state, signin} = useContext(AuthContext)
  const currentUserId = state.user.user.userDump._id


  
  const routeCRMMainPage = () =>{
    navigation.navigate('CRMMainPage')
  }

  const [form, setForm] = useState(
    {
        _id: `${currentUserId}`,
        wallet: '',
    }
  )


    const registerHandler = async (result) => {
      try {
       const response = await axios.put("http://192.168.0.108:8800/api/users/addmoney", form)
         
       
        .then(async (response) => {
            const userDump = {...response.data.user, wallet: form.wallet}
            console.log('moneyLog')
            console.log(response.data)
                if (userDump) {
                    Alert.alert(
                      "Поздравляем!",
                      "Вы успешно внесли средства на счет",
                      [
                        {
                          text: "Ок",
                          style: "cancel"
                        },
                      ]
                    )
                    navigation.navigate('YourRunningContractsPage')
                    signin({userDump})
                    ;
                  } else {
                    alert('No values stored under that key.');
                  }
                
              })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    


  return (
    <View style={styles.container}>

      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                
                <Text style={{fontSize: 25, fontWeight: '600', color: '#31383e'}}>
                    Пополнить счет
                </Text>
                
                <Image source ={require('../../assets/crm/logo.png')} style={{
                    marginTop: 15,
                    width: 50,
                    height: 66
                }} />
            </View>

          

          <TextInput
            onChangeText={(summ) => setForm({...form, wallet: summ})}
            placeholder="Сумма"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />
          
          
          <TouchableOpacity onPress={registerHandler} style={styles.LogInButton}>

                <Text style={{fontSize: 20,color: 'white'}}>
                    Пополнить
                </Text>

            </TouchableOpacity>

            <View style={{position:'absolute',bottom: 80 }}>
                <ProfileBar />
            </View>
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
     minHeight: 50,
     backgroundColor: '#31383e',
     marginTop: 25
 }
 
 
})
