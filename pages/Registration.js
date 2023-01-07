import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, Dimensions,SafeAreaView,ScrollView, Keyboard, Switch} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';
import ProfileBar from '../components/profilebar/ProfileBar';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const headerHeight = getStatusBarHeight()
const windowWidth = Dimensions.get('window').width;

export default function Registration() {

  

   const {state, signin} = useContext(AuthContext)
    
    const [category, setCategory] = useState('')

    
    
    const routeUserPage = () =>{
      navigation.navigate('UserPage')
    }

   
   



    const [showEngModal, setShowEngModal] = useState(false)

    const [showMasterModal, setShowMasterModal] = useState(false)

    const [showRaznModal, setShowRaznModal] = useState(false)

    
    const showModalEng = () =>{
        setShowEngModal(true)
        console.log(1)
      }
  
    const hideModalEng = () => {
        setShowEngModal(false)
    }





    const showModalMaster = () =>{
        setShowMasterModal(true)
        console.log(1)
      }
  
    const hideModalMaster = () => {
        setShowMasterModal(false)
    }






    const showModalRazn = () =>{
        setShowRaznModal(true)
        console.log(1)
      }
  
    const hideModalRazn = () => {
        setShowRaznModal(false)
    }






    
    const showModalCat = () =>{
        setShowAddPhotoModal(true)
        console.log(1)
      }
  
    const hideModalCat = () => {
        setShowAddPhotoModal(false)
    }








  const navigation = useNavigation();
  



  const [img64default,setImg64default] = useState('')

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [chosenData, setChosenData] = useState('00:00:0000')
  const [chosenTime, setChosenTime] = useState('00:00:0000')

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
    setForm({...form, end: formatedTime, start: formatedDate})

  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  
 

  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false)
  const [img64, setImg64] = useState(null);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(
    {
      username: '',
      email: '',
      password: '',
      avatar: img64,
      phoneNumber:'',
      isZakaz4ik: false,
      isPodryader: false
    }
  )


  const [isZakazer, setIsZakazer] = useState(false);
  const [isPodrer, setIsPodrer] = useState(false);

    const toggleSwitchZak = () => setIsZakazer(previousState => !previousState);
    const toggleSwitchPod = () => setIsPodrer(previousState => !previousState)

    useEffect(()=>{
      setForm({...form, isPodryader: isPodrer})
    },[isPodrer])

    useEffect(()=>{
      setForm({...form, isZakaz4ik: isZakazer})
    },[isZakazer])

  


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
  }, []);




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
        setForm({...form, avatar: result.base64})
        hideModalOne()
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
        setForm({...form, avatar: result.base64})
        hideModalOne()
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
       const response = await axios.post("http://62.113.97.220:8800/api/auth/register",form)
         
       
        .then(async (response) => {
            const userId = response.data.user._id;
            const userToken = response.data.token;
            const userDump = response.data.user
            // Store the credentials
            await SecureStore.setItemAsync('token', JSON.stringify(userToken))

              return (response, userDump)
              }). then( (userDump)=>{
                signin({userDump})
                
                  if (userDump) 
                    console.log('userDump successfully received from server')
                  else {
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
      <View style={styles.maincontainer}>
    <SafeAreaView style={keyboardStatus == "KeyboardShown" ? styles.KeyboardShown : styles.KeyboardHidden}> 
        <ScrollView>
      
      

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


     





















      <Modal 
                visible={showRaznModal}  
                transparent
                onRequestClose = {()=>
                setShowRaznModal(false)
                }
                hardwareAccelerated
                animationType='none'
            >
                <TouchableOpacity style={styles.modalOne} onPress = {hideModalRazn}>
                <View style={styles.modalInnerCategBar}>
                    
                    
                    
                    
                    <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 3}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', padding: 5, alignSelf: 'center'}}>
                            Подсобные работы
                        </Text>
                    </View>







                    <View style={{flexDirection: 'row',padding: 5, justifyContent: 'space-between'}}>
                        <View style={{width: '49%', justifyContent: 'center', alignItems: 'center', borderColor: '#006b76', borderWidth: 2, borderRadius: 5}}>
                            <Text style={{fontSize: 23, fontWeight: 'bold', padding: 5}}>
                                Заказы
                            </Text>
                        </View>

                        <View style={{width: '49%', justifyContent: 'center', alignItems: 'center', borderColor: '#006b76', borderWidth: 2, borderRadius: 5}}>
                            <Text style={{fontSize: 23, fontWeight: 'bold', padding: 5}}>
                                Подрядчики
                            </Text>
                        </View>
                    </View>





                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        
                        
                        <TouchableOpacity onPress={()=>{setForm({...form,category: 'Разнорабочий'}), hideModalRazn(), console.log(form)}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Разнораб.
                            </Text>

                            <Image source ={require('../../assets/categories/raznorab/razn1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setCategory('Земельные'), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Земельные работы
                            </Text>

                            <Image source ={require('../../assets/categories/raznorab/kop1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                    
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>

                        <TouchableOpacity onPress={()=>{setCategory('Озеленение'), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Озеленение
                            </Text>
                            
                            <Image source ={require('../../assets/categories/raznorab/zel1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setCategory('Грузчики'), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                Грузчики
                            </Text>
                            
                            <Image source ={require('../../assets/categories/raznorab/gruz1.jpg')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                    </View>



                </View>
                </TouchableOpacity>
            </Modal>























            <Modal 
                visible={showMasterModal}  
                transparent
                onRequestClose = {()=>
                setShowMasterModal(false)
                }
                hardwareAccelerated
                animationType='none'
            >
                <TouchableOpacity style={styles.modalOne} onPress = {hideModalMaster}>
                    
                </TouchableOpacity>
            </Modal>

























            <Modal 
                visible={showEngModal}  
                transparent
                onRequestClose = {()=>
                setShowEngModal(false)
                }
                hardwareAccelerated
                animationType='none'
            >
                <TouchableOpacity style={styles.modalOne} onPress = {hideModalEng}>
                   
                </TouchableOpacity>
            </Modal>
    

















      <View style={styles.container}>

      <View style={styles.logo}>
        <Text style={{fontSize: 23,fontWeight: '700',color: 'black'}}>
            Р Е Г И С Т Р А Ц И Я 
        </Text>
        <Image source ={require('../../assets/crm/logo.png')} style={{
                    marginTop: 15,
                    width: 55,
                    height: 75
                }} />
      </View>

      <TextInput 
            onChangeText={(name) => setForm({...form, username: name})}
            placeholder="Ваше имя"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />

          <TextInput
          onChangeText={(pass) => setForm({...form, password: pass})}
          placeholder="Введите пароль"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
          />
          
          <TextInput
            onChangeText={(userEmail) => setForm({...form, email: userEmail})}
            placeholder="Электронная почта"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />

          <TextInput
            onChangeText={(pnumber) => setForm({...form, phoneNumber: pnumber})}
            placeholder="Телефон"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false} 
            style={styles.input}
          />


          <View style={styles.zquestion}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17}}>
                Планируете выступать Подрядчиком?
            </Text>

            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPodrer ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchPod}
              value={isPodrer}
            />

          </View>






        <TouchableOpacity onPress={showModalOne}  style={{flexDirection: 'row', alignItems: 'center', height: 150}} >
                { img64 
                  ? 
                    <Image source={{uri: img64.uri}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 3,
                        borderColor: '#006b76',
                        marginBottom: 5
                    }}/> 
                  : <>
                      <Image source ={require('../../assets/users/addPhoto.png')} style={{
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
          style={{borderWidth: 1, width: "90%",alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10,backgroundColor: '#31383e',borderWidth: 1, marginBottom: 5}}
          onPress={registerHandler}
        >
          
          
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            Регистрация
          </Text>

        </TouchableOpacity>
        </View>
        </ScrollView>
      
      
    </SafeAreaView>

    {/* {keyboardStatus !== "KeyboardShown" && <View style={{position:'absolute',bottom: 0 }}>
        <ProfileBar />
    </View>} */}
    
  </View>
  
  )
}



const styles = StyleSheet.create({
maincontainer: {
    justifyContent: 'space-between',
    height: '100%'
},
KeyboardHidden:{
    flex: 1, 
    justifyContent: 'space-between',
    marginTop: headerHeight
},
KeyboardShown:{
    flex: 1,
    justifyContent: 'space-between'
}, 
hatmw: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "white",
    justifyContent:'center',
    borderBottomColor: 'grey',
    width: '100%'
},
bar:{
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 15,
    alignItems: 'center'
},

image: {
    height: 40,
    width: 40,
    borderRadius: 7
},
imageGlow:{
    height: 50,
    width: 50,
    borderRadius: 6,
},
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
  width: '100%',
  backgroundColor: 'white',
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
 modalInnerCategBar:{
    paddingBottom: 10,
    width: '90%',
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
 zquestion:{
   flexDirection:'row',
   width: '85%',
   justifyContent: 'space-between', 
   alignItems: 'center'
 }
 
 
})
