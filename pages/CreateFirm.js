
import { TicketHat } from '../components/tickets/TicketHat';
import { TicketSearch } from '../components/tickets/TicketSearch';

import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../context/AuthContext';
import * as FileSystem from 'expo-file-system'
import {Asset} from 'expo-asset';
import { StorageAccessFramework } from 'expo-file-system'

const CreateFirm = () => {



    const {state, signin} = useContext(AuthContext)

    const [img64default,setImg64default] = useState('')
  
  
    
    const routeUserPage = () =>{
      navigation.navigate('UserPage')
    }
  
    const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
    const [showMenuModal, setShowMenuModal] = useState(false)
    const [img64, setImg64] = useState(null);
    const [image, setImage] = useState(null);
    const [form, setForm] = useState(
      {
        email:'', 
        username: '',
        password: '',
        profession: '',
        desc: ''
  
      }
    )
  
    const myFunction = async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted'){
          alert('Permission denied!')
        }
      }
  }
  
      useEffect(()=>{
        myFunction()
      },[])
  
  
      const PickImageGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect:[4,3],
          quality: 1,
          base64: true
        })
        if(!result.cancelled){
          setImg64(result)
        }
      }
  
  
      const storehandler = async () => {
        let result = await SecureStore.getItemAsync('token')
        
    }    
  
  
      const PickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect:[3,3],
          quality: 1,
          base64: true
        })
        if(!result.cancelled){
          setImg64(result)
        }
      }
  
      const menuModal = () =>{
        setShowMenuModal(true)
      }
  
      const hideMenuModal = () => {
        setShowMenuModal(false)
      }

      const showModalOne = () =>{
        setShowAddPhotoModal(true)
      }
  
      const hideModalOne = () => {
        setShowAddPhotoModal(false)
      }
      
  
      const registerHandler = async (result) => {
        try {
         const response = await axios.post("http://192.168.0.108:8800/api/auth/register",{...form, data: `data:image/png;base64,${img64.base64}`})
           
         
          .then(async (response) => {
              const userId = response.data.user._id;
              const userToken = response.data.token;
              const userDump = response.data.user
              // Store the credentials
              await SecureStore.setItemAsync('token', JSON.stringify(userToken))
  
                return (response, userDump)
                }). then( (userDump)=>{
                  signin({userDump})
                  
                    if (userDump) {
                      Alert.alert(
                        "Поздравляем!",
                        "Вы успешно зарегестрировались, мы переместили вас на вашу домашнюю страницу, или вы можете перейти на главную",
                        [
                          {
                            text: "Главная страница",
                            onPress: () => console.log("Перейти на главную"),
                            style: "cancel"
                          },
                          { text: "Профиль", onPress: () => console.log("Остаться в профиле") }
                        ]
                      );
                    } else {
                      alert('No values stored under that key.');
                    }
                  
                }).then(() => {
            // redirect home
                      navigation.navigate('UserPage')
                    })
              
        }  catch (error) {
          console.log("Keychain couldn't be accessed!", error);
        }
      }





  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>





    <Modal 
        visible={showMenuModal}  
        transparent
        onRequestClose = {()=>
          setShowMenuModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideMenuModal}>
          <View style={styles.menuInnerOne}>
            <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}> 
                 Меню
              </Text>
            </View>

            <View style={{height: 50, flexDirection: 'row'}}>
            <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>
            </View>

            <View style={{height: 50, flexDirection: 'row'}}>
            <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>

              <View style={{width: '25%', }}>
                <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                width: 64,
                                height: 64,
                                borderRadius: 5,
                }}/>

                <Text style={{fontSize: 20}}>
                База 
                </Text>

                <Text style={{fontSize: 20}}>
                Знаний 
                </Text>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    </Modal>















    <Modal 
        visible={showAddPhotoModal}  
        transparent
        onRequestClose = {()=>
          setShowAddPhotoModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModalOne}>
          <View style={styles.modalInner}>
          <TouchableOpacity style={styles.cam} onPress={PickImageCamera}>
          
            <Image source ={require('../../assets/src/useCamera.png')} style={{
                               width: '70%',
                               height: '41%',
                              borderRadius: 5,
                              marginBottom: 15
            }}/>

            <Text style={{fontSize: 20}}>
              Камера
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity style={styles.gal} onPress={PickImageGalery}>

            <Image source ={require('../../assets/src/useGal.png')} style={{
                              width: '70%',
                              height: '41%',
                              marginBottom: 15,
                              borderRadius:5
            }}/>

            <Text style={{fontSize: 20}}>
              Галерея
            </Text>

          </TouchableOpacity>
          </View>
        </TouchableOpacity>
    </Modal>















        <TicketSearch />

        <Text style={{fontSize: 25,paddingVertical: 5,alignSelf: 'center',fontWeight:'bold'}}>
            Регистрация Юр.Лица
        </Text>

        <Text style={{fontSize: 15,padding: 10}}>
            *   Зарегистрировать Юридические Лицо в нашей экосистеме может только зарегистрированоое Физические лицо с подтвержденным профилем.
        </Text>
        

        <Text style={{fontSize: 15,paddingHorizontal: 10,}}>
           *   Вы вправе не предоставлять о вашей фирме каких-либо данных, но в таком случае сможете лишь публиковать объявления и участвовать в аукционах 
        </Text>

      


        <View style={styles.containerForms}>
            
            <TextInput 
                onChangeText={(name) => setForm({...form, username: name})}
                placeholder="Название"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />
            <TextInput
            onChangeText={(pass) => setForm({...form, password: pass})}
            placeholder="Правовая форма"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
            />
            
            <TextInput
                onChangeText={(userEmail) => setForm({...form, email: userEmail})}
                placeholder="Направление"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />
            <TextInput
                onChangeText={(userEmail) => setForm({...form, email: userEmail})}
                placeholder="ИНН"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />

            <TextInput
                onChangeText={(userEmail) => setForm({...form, email: userEmail})}
                placeholder="Расскажите о вас"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />
            <TextInput
                onChangeText={(userEmail) => setForm({...form, email: userEmail})}
                placeholder="+ Добавить учредителя"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />
              



        
            
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: '25%'}}
            onPress={menuModal} >

              
                    { img64 
                        ? 
                        <Image source={{uri: img64.uri}} style={{
                            width: 150,
                            height:150,
                            borderRadius: 5,
                            borderWidth: 3,
                            borderColor: '#006b76'
                        }}/> 
                        : <>
                            <Image source ={require('../../assets/users/addPhoto.png')} style={{
                                            width: 125,
                                            height: 100,
                                            borderRadius: 10,
                                            marginRight: "12%"
                                            }}/>
                            
                            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#006b76'}}>
                            Добавить фото
                            </Text>
                        </>
                    }

            </TouchableOpacity>
        </View>

        <View style={styles.yourPhoto}>
            <View style={styles.yourPhotoBack}>
              <TouchableOpacity onPress={{menuModal}}>
                <Image source ={require('../../assets/categories/other.png')} style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 5,
                }}/>
                <Text style={{fontSize: 16, fontWeight: 'bold', position: 'absolute', color : '#006b76'}}>
                  МЕНЮ
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.yourPhotoCall}>
                <Image source ={require('../../assets/categories/tele.png')} style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 5,
                }}/>
            </View>
            
            <View style={styles.yourPhotoBot}>
                <Image source ={require('../../assets/rab1.jpg')} style={{
                                      width: 116,
                                      height: 116,
                                      borderRadius: 5,
                                      borderWidth: 3,
                                      borderColor: '#006b76'
                }}/>
            </View>

            <Text style={{color:'white', left: '35%',bottom: '70%', position: 'absolute', fontSize: 12, fontWeight: 'bold'}}>
                Вы: Калиниченко А.М.
            </Text>
          
            <Text style={{color:'white', left: '35%',bottom: '50%', position: 'absolute', fontSize: 12, fontWeight: 'bold'}}>
                Ваш рейтинг: 1275
            </Text>

            <View style={{borderWidth: 2, borderColor: 'white',backgroundColor:'#006b76',alignItems: 'center', justifyContent: 'center', left: '35.5%',bottom: '8%', position: 'absolute',width: '32%'}}>
                <Text style={{fontSize: 13, fontWeight: 'bold',paddingVertical:3,color:'white'}}>
                    Ваш профиль
                </Text>
            </View>

            <Text style={{color:'black', left: '1%',top: '-30%', position: 'absolute', fontSize: 13, fontWeight: 'bold'}}>
            </Text>
        </View>  













    </View>
  );
};

export default CreateFirm;

const styles = StyleSheet.create({
    containerForms:{
        alignItems: 'center',
    },
    input: {
        width: 350,
        margin: 10,
        padding: 8,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 1
        
      },
    yourPhoto:{
        position: 'absolute',
        flex:1,
        backgroundColor: '#765043',
        bottom:0,
        left: 0,
        right: 0,
        height: '11%',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 5,
        borderColor: '#006b76',
        
      },
      yourPhotoBot:{
        position: 'absolute',
        backgroundColor: 'white',
        width: 116,
        height: 116,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        right: 7,
        marginLeft: 7
        
      },
      yourPhotoBack: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 64,
        height: 64,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        left: 3,
      },
      yourPhotoCall:{
        position: 'absolute',
        backgroundColor: 'white',
        width: 64,
        height: 64,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        left: '18%',
      },
      menuInnerOne:{
        height: 150,
        borderRadius: 10

      }

});
