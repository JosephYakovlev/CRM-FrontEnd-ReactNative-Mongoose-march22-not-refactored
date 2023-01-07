import axios from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, Dimensions,SafeAreaView,ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker'
import CRMProfileBar from '../components/CRMProfileBar';


export default function AddContractorLeader({navigation}) {

  const {state, signin} = useContext(AuthContext)

  const [img64default,setImg64default] = useState('')

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [chosenData, setChosenData] = useState('00:00')
  const [chosenTime, setChosenTime] = useState('00:00')

  const onChange = (event,selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = JSON.stringify(tempDate)
    let formatedDate = fDate.substring(1,11)
    let formatedTime = fDate.substring(12,17)
    setChosenData(formatedDate)
    setChosenTime(formatedTime)

    

  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  
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
      otherImg:[{}]
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
       const response = await axios.post("http://192.168.0.108:8800/api/ticket/register",{...form, data: `data:image/png;base64,${img64.base64}`})
       
       
        .then((response) => {
          // redirect TicketPage
                    const ticket = response.data
                    
                    navigation.navigate('TicketPage',ticket);
                    
                  })
            
      }  catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    }
    


    




  
  return (
    <SafeAreaView style={{flex: 1}}>
      
      

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
          Добавление рабочего
        </Text>
      </View>

        <TextInput 
          onChangeText={(name) => setForm({...form, mainTitle: name})}
          placeholder="Имя"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
          onChangeText={(money) => setForm({...form, price: money})}
          placeholder="Фамилия"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />

        <TextInput
          onChangeText={(money) => setForm({...form, price: money})}
          placeholder="Отчество"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        
        <View style={{flexDirection: 'row', width: '90%',marginVertical: 3}}>
          <TouchableOpacity style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center' ,justifyContent: 'center'}} onPress={()=> showMode('date')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
              Приход
            </Text>
          </TouchableOpacity>
          <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 22}}>
              {chosenData}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', width: '90%',marginVertical: 3}}>
          <TouchableOpacity style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center',justifyContent: 'center'}} onPress={()=> showMode('time')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
              Уход
            </Text>
          </TouchableOpacity>
          <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 22}}>
              {chosenTime}
            </Text>
          </View>
        </View>

        <View style={{width:'90%', marginHorizontal: '5%'}}>
          
          <View style={{width: '100%', borderTopWidth: 1,borderLeftWidth: 1, borderRightWidth: 1}}>
            <Text style={{alignSelf: 'center', fontSize: 19, fontWeight: 'bold'}}>
              Выполнил работ
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width:'45%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>
              <Text>
                Наименование
              </Text>
            </View>
            <View style={{width:'20%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>  
              <Text>
                План
              </Text>
            </View>

            <View style={{width:'20%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>
              <Text>
                Факт
              </Text>
            </View>

            <View style={{width:'15%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1, borderRightWidth: 1}}>
              <Text>
                Ед.
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{width:'45%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>
              <Text>
                -------------
              </Text>
            </View>
            <View style={{width:'20%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>  
              <Text>
                ---
              </Text>
            </View>

            <View style={{width:'20%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1}}>
              <Text>
                ---
              </Text>
            </View>

            <View style={{width:'15%',paddingLeft: 10, justifyContent: 'center', borderTopWidth: 1,borderLeftWidth: 1, borderRightWidth: 1}}>
              <Text>
                --
              </Text>
            </View>
          </View>

          <View style={{width: '100%', borderWidth: 1,backgroundColor: '#31383e'}}>
            <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: '400', color: 'white'}}>
              Добавить
            </Text>
          </View>

        </View>

        <TextInput
          onChangeText={(desc) => setForm({...form, title: desc})}
          placeholder="Комментарии"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />

    
        
         

        <TouchableOpacity 
          style={{borderWidth: 1, width: "90%",alignItems: 'center', justifyContent: 'center', height: '7%', borderRadius: 10, margin: 5,backgroundColor: '#31383e',borderWidth: 1}}
          onPress={() => setOpen(true)}
        >
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            Отметить рабочего
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
