import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, Dimensions,SafeAreaView,ScrollView, Keyboard} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker'
import CRMProfileBar from '../components/CRMProfileBar';
import { useNavigation } from '@react-navigation/native';
import ProfileBar from '../../components/profilebar/ProfileBar';




export default function RegisterProcessPage(object) {

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

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
  }, [])

  const navigation = useNavigation();
  


  const currentObject = object.route.params 

  const {state, signin} = useContext(AuthContext)

  const userId =  state.user.user.userDump._id

  const [img64default,setImg64default] = useState('')

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event,selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = JSON.stringify(tempDate)
    let formatedDate = fDate.substring(1,11)
    setForm({...form, start: formatedDate})

  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }













  const [date1, setDate1] = useState(new Date())
  const [mode1, setMode1] = useState('date')
  const [show1, setShow1] = useState(false)

  const onChange1 = (event,selectedDate) => {
    const currentDate1 = selectedDate || date
    setShow1(Platform.OS === 'ios')
    setDate1(currentDate1)

    let tempDate = new Date(currentDate1)
    let fDate = JSON.stringify(tempDate)
    let formatedDate = fDate.substring(1,11)
    setForm({...form, end: formatedDate})
   

  }

  const showMode1 = (currentMode) => {
    setShow1(true)
    setMode1(currentMode)
  }
  
  const routeUserPage = () =>{
    navigation.navigate('UserPage')
  }

  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
  const [img64, setImg64] = useState(null);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(
    {
      relatesToObject:  `${currentObject._id}` ,
      ownerId: `${userId}`,
      mainTitle: '',
      leader: '',
      password: '',
      start: '00:00:0000',
      end: '00:00:0000',
      desc: '',
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

    const showModalOne = () =>{
      setShowAddPhotoModal(true)
    }

    const hideModalOne = () => {
      setShowAddPhotoModal(false)
    }

   
    

    const registerHandler = async (result) => {
      
      try {
       const response = await axios.post("http://192.168.0.108:8800/api/buildingprocesses/registerprocess",form)
       
       
        .then((response) => {
          // redirect TicketPage
                    const updatedUser = response
                    navigation.navigate('ObjectPage',currentObject);
                    
                  })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    


    




  
  return (
    <SafeAreaView style={{flex: 1}}>

      <ScrollView style={keyboardStatus == "KeyboardShown" ? styles.KeyboardShown : styles.KeyboardHidden}>
      
      

      {show && (
        <DateTimePicker 
          testID='dateTimePicker'
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}

      {show1 && (
        <DateTimePicker 
          testID='dateTimePicker'
          value={date1}
          mode={mode1}
          is24Hour={true}
          display='default'
          onChange={onChange1}
        />
      )}


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
          
            <Image source ={require('../../../assets/src/useCamera.png')} style={{
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

            <Image source ={require('../../../assets/src/useGal.png')} style={{
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
        <Text style={{fontSize: 28,fontWeight: 'bold',color: 'white'}}>
            B U I L D E R
        </Text>
        <Text style={{color:'white', fontSize: 15}}>
          Регистрация процесса
        </Text>
      </View>

        <TextInput 
          onChangeText={(name) => setForm({...form, mainTitle: name})}
          placeholder="Имя процесса"
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

        <TextInput
          onChangeText={(lead) => setForm({...form, leader: lead})}
          placeholder="Ответственный"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />

        <TextInput
          onChangeText={(descr) => setForm({...form, desc: descr})}
          placeholder="Комментарий"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        
        <View style={{flexDirection: 'row', width: '90%',marginVertical: 3}}>
          <TouchableOpacity style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center' ,justifyContent: 'center'}} 
          onPress={()=> showMode('date')}> 
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
              Начало работ
            </Text>
          </TouchableOpacity>
          <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 22}}>
              {form.start}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '90%',marginVertical: 3}}>
          <TouchableOpacity style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center',justifyContent: 'center'}} 
          onPress={()=> showMode1('date')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
              Финал работ
            </Text>
          </TouchableOpacity>
          <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 22}}>
              {form.end}
            </Text>
          </View>
        </View>

        
        
         <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', height: 110}}
          >
                { img64 
                  ? 
                    <Image source={{uri: img64.uri}} style={{
                        width: 110,
                        height:110,
                        borderRadius: 5,
                        borderWidth: 3,
                        borderColor: '#006b76'
                    }}/> 
                  : <>
                      <Image source ={require('../../../assets/users/addPhoto.png')} style={{
                                        width: 125,
                                        height: 100,
                                        borderRadius: 10,
                                        marginRight: "12%"
                                        }}/>
                      
                      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#31383e'}}>
                        Добавить фото
                      </Text>
                    </>
                }

        </TouchableOpacity>

        <TouchableOpacity 
          style={{borderWidth: 1, width: "90%",alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10, margin: 5,backgroundColor: '#31383e',borderWidth: 1}}
          onPress={registerHandler}
        >
          
          
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            Зарегистрировать объект
          </Text>

        </TouchableOpacity>
        </View>
        </ScrollView>

        {keyboardStatus !== "KeyboardShown" && 
          <View style={{position:'absolute',bottom: 0 }}>
            <ProfileBar />
          </View>
          }
      
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
 },
 KeyboardHidden:{
    marginBottom: 90,
 },
 KeyboardShown:{
     marginBottom: 0
 }
 
 
})
