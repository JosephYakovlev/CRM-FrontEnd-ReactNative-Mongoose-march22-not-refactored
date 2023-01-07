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


export default function CreateTicket({navigation}) {

  const {state, signin} = useContext(AuthContext)

  const [img64default,setImg64default] = useState('')


  
  const routeUserPage = () =>{
    navigation.navigate('UserPage')
  }

  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
  const [img64, setImg64] = useState(null);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(
    {
      mainTitle: '',
      title: '',
      price:'',
      profession: '2',
      category: '4',
      otherImg:[{
        imgUri: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1643823021/svark1_m7lc9h.jpg',
        imgTitle: 'Снести стену слева',
        imgSroki: '12.01.2022'
      },
        {
        imgUri: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1643823021/hydr6_ef2dcg.jpg',
        imgTitle: 'Подварить ступени',
        imgSroki: '14.01.2022'
      },
      {
        imgUri: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1643823021/hydr6_ef2dcg.jpg',
        imgTitle: 'Зашпаклевать трещины',
        imgSroki: '16.01.2022'
      }]
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
      console.log(result)
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

    const showModalOne = () =>{
      setShowAddPhotoModal(true)
    }

    const hideModalOne = () => {
      setShowAddPhotoModal(false)
    }
    

    const registerHandler = async (result) => {
      try {
       const response = await axios.post("http://62.113.97.220:8800/api/ticket/register",{...form, data: `data:image/png;base64,${img64.base64}`})
       
       
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
    <View >

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


     
    <View style={styles.container}>

      <View style={styles.logo}>
        <Text style={{fontSize: 24,color: 'white', margin: 10}}>
            Стройка.рф
        </Text>
      </View>

        <TextInput 
          onChangeText={(name) => setForm({...form, mainTitle: name})}
          placeholder="Имя объявления"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
        onChangeText={(desc) => setForm({...form, title: desc})}
        placeholder="Описание"
        iconType="user"
        autoCapitalize="none"
        autoCorrect={false} 
        style={styles.input}
        />
        
        <TextInput
          onChangeText={(money) => setForm({...form, price: money})}
          placeholder="Цена"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />

    
        
         <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: '25%'}}
        onPress={showModalOne} >
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

        <TouchableOpacity 
          style={{backgroundColor: '#006b76', width: "97%",alignItems: 'center', justifyContent: 'center', height: '13%', borderRadius: 3, margin: 5, borderRadius: 3,}}
          onPress={registerHandler}
        >
          
          
          <Text style={{fontSize: 28, fontWeight: 'bold', color: 'white'}}>
            Зарегистрироваться
          </Text>

        </TouchableOpacity>
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
  justifyContent: 'center',
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
 }
 
 
})
