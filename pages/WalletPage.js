import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, ScrollView, Keyboard} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {Context as AuthContext} from '../../context/AuthContext';
import ProfileBar from '../components/profilebar/ProfileBar';
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';


export default function WalletPage({navigation}) {

    const [keyboardStatus, setKeyboardStatus] = useState("KeyboardHidden");

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus("KeyboardShown");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus("KeyboardHidden");
        });

        return () => {
        showSubscription.remove();
        hideSubscription.remove();
        };
    }, []);


    
  const headerHeight = getStatusBarHeight()

  const {state, signin} = useContext(AuthContext)

  const currentUser = state.user.user.userDump
  const currentUserId = currentUser._id


  
  const routeCRMMainPage = () =>{
    navigation.navigate('CRMMainPage')
  }

  const [form, setForm] = useState(
    {
        _id: `${currentUserId}`,
        wallet: '',
    }
  )

  const [depositState, setDepositState] = useState({
    Sender: currentUser._id,
    Reciever: currentUser._id,
    Summ: 0,
    Context: 'DEPOSIT',
    BelongsTo: currentUser._id,
    PayFor: currentUser._id 
})
 
    console.log("SHOWED SUMM")
    console.log(NormalizeNumHook(currentUser.wallet))

    const registerHandler = async (result) => {
        try {
            const response = await axios.post("http://62.113.97.220:8800/api/users/addmoney", depositState).then((res)=>{
                
                console.log(res.data)
                socket.emit("reload", res.data)

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
            })     
        }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    


  return (
    <View style={styles.container}>
        <ScrollView style={{position: 'absolute', top: headerHeight, left: 0, right: 0, bottom: keyboardStatus == "KeyboardHidden" ? 90 : 0}}>

                <Image source ={require('../../assets/crm/logo.png')} style={{
                    marginTop: 5,
                    width: 50,
                    height: 66,
                    alignSelf: 'center',
                    marginVertical: 20
                }} />

        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                    Номер счета:
                </Text>

                <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                    {currentUserId}
                </Text>

        </View>

        <View style={{flexDirection: 'row', marginLeft: 10 }}>
                <Text style={{fontSize: 20, fontWeight: '600', color: '#31383e'}}>
                    На вашем счету:
                </Text>

                <Text style={{fontSize: 22, fontWeight: '700', color: 'green', marginLeft: 10}}>
                    {NormalizeNumHook(currentUser.wallet)}.00 руб.
                </Text>

        </View>

        <View style={{width: '100%', minHeight: 2, backgroundColor: 'black', marginVertical: 10}}>

        </View>

      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                
                <Text style={{fontSize: 25, fontWeight: '700', color: '#31383e'}}>
                    Пополнить счет:
                </Text>
       
       </View>

          

          <TextInput
            onChangeText={(summ) => setDepositState({...depositState, Summ: summ})}
            placeholder="Сумма"
            iconType="user"
            keyboardType='numeric'
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />
          
          
          <TouchableOpacity onPress={registerHandler} style={styles.LogInButton}>

                <Text style={{fontSize: 20,color: 'white'}}>
                    Пополнить
                </Text>

            </TouchableOpacity>


            <View style={{width: '100%', minHeight: 2, backgroundColor: 'black', marginVertical: 10}}>

            </View>

            <Text style={{fontSize: 25, fontWeight: '600', color: '#31383e', alignSelf: 'center'}}>
                    Транзакции:
            </Text>

            {currentUser.transactions.map((i, index) => 

                i.Reciever == currentUser._id ?

                    <View style={{width: '100%', marginTop: 10,minHeight: 80, backgroundColor: '#00FF1040', marginBottom: index === 0 ? 10 : 0, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1}} key={i._id} >
                        {i.Context === "DEPOSIT"   ?
                            <>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                        <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                            Номер Транзакции:
                                        </Text>

                                        <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                            {i._id}
                                        </Text>
                                </View>


                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                        Тип:
                                    </Text>

                                    <Text style={{fontSize: 18, fontWeight: '700', color: 'green', marginLeft: 10}}>
                                        Пополнение счета
                                    </Text>
                            </View>
                                
                                
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                        <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                            Сумма:
                                        </Text>

                                        <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                            {NormalizeNumHook(i.Summ)}.00 руб.
                                        </Text>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    
                                        <Text style={{fontSize: 14, fontWeight: '600', color: 'black'}}>
                                            {i.datec?.substring(0,10)} {i.datec?.substring(12,16)}
                                        </Text>
                                </View>
                            </>

                        :

                            <>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Номер Транзакции:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {i._id}
                                </Text>
                        </View>
                        
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Сумма:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {NormalizeNumHook(i.Summ)}.00 руб.
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Тип:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {i.Context === "WORK PAY DEPOSIT" ? 'Оплата с депозита' : 'Оплата с расс. счета'}
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Относится к сделке  #
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue'}}>
                                    {i.BelongsTo}
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    За работу  #
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue'}}>
                                    {i.PayFor}
                                </Text>
                        </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    
                                        <Text style={{fontSize: 14, fontWeight: '600', color: 'black'}}>
                                            {i.datec?.substring(0,10)} {i.datec?.substring(12,16)}
                                        </Text>
                                </View>
                            </>
                        }

                    </View>

                :

                <View style={{width: '100%', marginTop: 10,minHeight: 80, backgroundColor: i.Context === "WORK PAY DEPOSIT" ? '#FFE90080' : '#f8020630', marginBottom: index === 0 ? 10 : 0, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1}} key={i._id} >
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Номер Транзакции:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {i._id}
                                </Text>
                        </View>
                        
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Сумма:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {NormalizeNumHook(i.Summ)}.00 руб.
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Тип:
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                    {i.Context === "WORK PAY DEPOSIT" ? 'Оплата с депозита' : 'Оплата с расс. счета'}
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    Относится к сделке  #
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue'}}>
                                    {i.BelongsTo}
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                    За работу  #
                                </Text>

                                <Text style={{fontSize: 14, fontWeight: '700', color: 'blue'}}>
                                    {i.PayFor}
                                </Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                    
                            <Text style={{fontSize: 14, fontWeight: '600', color: 'black'}}>
                                {i.datec?.substring(0,10)} {i.datec?.substring(12,16)}
                            </Text>
                        </View>
                    </View>

                ).reverse()
            }
            </ScrollView>

            {keyboardStatus == "KeyboardHidden" && <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
            </View>}
    </View>
  )
}



const styles = StyleSheet.create({
input: {
  width: 350,
  marginHorizontal: 10,
  padding: 8,
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
  borderBottomWidth: 1
  
},
container: {
  backgroundColor: 'white',
  flex: 1
},
 cam:{
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
