import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert, Dimensions,SafeAreaView,ScrollView, Keyboard} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store';
import {Context as AuthContext} from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';
import ProfileBar from '../components/profilebar/ProfileBar';
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';
import { getStatusBarHeight } from 'react-native-status-bar-height'


const windowWidth = Dimensions.get('window').width;
const headerHeight = getStatusBarHeight()

export default function RegisterTicketPage() {


   

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
  


  const {state, signin} = useContext(AuthContext)

  const userId =  state.user.user.userDump._id
  
  const currentUser = state.user.user.userDump

  const [img64default,setImg64default] = useState('')

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [chosenData, setChosenData] = useState('00:00:0000')

  const onChange = (event,selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = JSON.stringify(tempDate)
    let formatedDate = fDate.substring(1,11)
    let formatedTime = fDate.substring(12,17)
    setChosenData(formatedDate)
    setForm({...form, start: formatedDate})

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
      ownerId: `${userId}`,
      ownerUserName: currentUser.username,
      ownerAvatar: currentUser.avatar,
      mainTitle: '',
      price:'',
      city:'',
      phoneNumber: '',
      start: '',
      category: '',
      mainimg: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1634690560/tickets/iqbeqnyail9h44kxmbre.jpg',
      otherImg:[]
    }
  )


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
       const response = await axios.post("http://62.113.97.220:8800/api/ticket/register", form)

        .then((response) => {
          // redirect TicketPage
                    const ticket = response.data
                    Alert.alert(
                      "??????????????????????!",
                      "???? ?????????????? ???????????????????????????????? ??????????????",
                      [
                        { text: "????", onPress: () => console.log("???????????????? ?? ??????????????") }
                      ]
                    );
                    navigation.navigate('TicketPage',{ticket, currentUser});
                   
                    
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
              ????????????
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
              ??????????????
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
                            ?????????????????? ????????????
                        </Text>
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        
                        
                        <TouchableOpacity onPress={()=>{setForm({...form,category: '????????????????????????'}), hideModalRazn(), console.log(form)}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                               ????????????????????
                            </Text>

                            <Image source ={require('../../assets/categories/raznorab/razn1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setForm({...form,category: '??????????????????'}), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                ?????????????????? ????????????
                            </Text>

                            <Image source ={require('../../assets/categories/raznorab/kop1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                    
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>

                        <TouchableOpacity onPress={()=>{setForm({...form,category: '????????????????????'}), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                ????????????????????
                            </Text>
                            
                            <Image source ={require('../../assets/categories/raznorab/zel1.png')} style={{
                                                width: `${windowWidth}` / 3,
                                                height: `${windowWidth}` / 3,
                            }}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{setForm({...form,category: '????????????????'}), hideModalRazn()}} style={{flexDirection: 'column', width: '50%', padding: 5, alignItems: 'center'}}>
                            <Text style={{ fontWeight: 'bold'}}>
                                ????????????????
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
          <Text style={{fontSize: 28,fontWeight: 'bold',color: 'white'}}>
              B U I L D E R
          </Text>
          <Text style={{color:'white', fontSize: 15}}>
            ?????????????????????? ??????????????
          </Text>
        </View>

      {form.category === '' && 
      <View style={{width: '100%', marginTop: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 20}}>
                ???????????????? ?????????????????? ????????????
            </Text>

      </View>}

        
      {form.category === '' &&
        <View style={styles.hatmw}>
            <TouchableOpacity onPress = {showModalRazn} style={styles.bar}><Image source ={require('../../assets/categories/raz1.jpg')} style={styles.image}/><Text>????????????????????</Text></TouchableOpacity>
            <TouchableOpacity onPress = {showModalMaster} style={styles.bar}><Image source ={require('../../assets/categories/m1.jpg')} style={styles.image}/><Text>??????????????</Text></TouchableOpacity>
            <TouchableOpacity onPress = {showModalEng} style={styles.bar}><Image source ={require('../../assets/categories/eng1.jpg')} style={styles.image}/><Text>??????????????????</Text></TouchableOpacity>
            <TouchableOpacity style={styles.bar}><Image source ={require('../../assets/categories/teh1.jpg')} style={styles.image}/><Text>??????????????</Text></TouchableOpacity>
            <View style={styles.bar}><Image source ={require('../../assets/categories/buh1.jpg')} style={styles.image}/><Text>??????????????</Text></View>
        </View>}








        {form.category === "????????????????????????" && 
            <View style={{ alignItems: 'center', justifyContent: 'center'}}> 
                
                <Image source ={require('../../assets/categories/raznorab/razn1.png')} style={{
                                                width: 50,
                                                height: 50,
                }}/>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <Text>
                        ?????????????? ??????????:
                    </Text>
                    <Text style={{fontSize: 18, color: 'brown', marginLeft: 5}}>
                        ????????????????????????
                    </Text>
                </View>

                <TouchableOpacity onPress={() => setForm({...form,category: ''})} style={{width: 200, height: 40, borderRadius: 5, borderWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    ????????????????
                  </Text>
                </TouchableOpacity>
            </View> 
        }

        {form.category === "??????????????????" && 
            <View style={{ alignItems: 'center', justifyContent: 'center'}}> 
                
                <Image source ={require('../../assets/categories/raznorab/kop1.png')} style={{
                                                width: 50,
                                                height: 50,
                }}/>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <Text>
                        ?????????????? ??????????:
                    </Text>
                    <Text style={{fontSize: 18, color: 'brown', marginLeft: 5}}>
                        ????????????????
                    </Text>
                </View>

                <TouchableOpacity onPress={() => setForm({...form,category: ''})} style={{width: 200, height: 40, borderRadius: 5, borderWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    ????????????????
                  </Text>
                </TouchableOpacity>
            </View> 
        }



        {form.category === "????????????????????" && 
            <TouchableOpacity onPress={() => setForm({...form,category: ''})} style={{ alignItems: 'center', justifyContent: 'center'}}> 
                
                <Image source ={require('../../assets/categories/raznorab/zel1.png')} style={{
                                                width: 50,
                                                height: 50,
                }}/>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <Text>
                        ?????????????? ??????????:
                    </Text>
                    <Text style={{fontSize: 18, color: 'brown', marginLeft: 5}}>
                        ????????????????????
                    </Text>
                </View>

                
            </TouchableOpacity> 
        }



        {form.category === "????????????????" && 
            <View style={{ alignItems: 'center', justifyContent: 'center'}}> 
                
                <Image source ={require('../../assets/categories/raznorab/gruz1.jpg')} style={{
                                                width: 50,
                                                height: 50,
                }}/>

                <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <Text>
                        ?????????????? ??????????:
                    </Text>
                    <Text style={{fontSize: 18, color: 'brown', marginLeft: 5}}>
                        ????????????????
                    </Text>
                </View>

                <TouchableOpacity onPress={() => setForm({...form,category: ''})} style={{width: 200, height: 40, borderRadius: 5, borderWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                  <Text>
                    ????????????????
                  </Text>
                </TouchableOpacity>
            </View> 
        }
            
        
        <TextInput 
          onChangeText={(name) => setForm({...form, mainTitle: name})}
          placeholder="?????? ?????????? ??????????????"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
          onChangeText={(money) => setForm({...form, price: money})}
          placeholder="????????????"
          iconType="user"
          autoCapitalize="none"
          keyboardType='numeric'
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
          onChangeText={(adress) => setForm({...form, city: adress})}
          placeholder="??????????"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        <TextInput
          onChangeText={(Phnum) => setForm({...form, phoneNumber: Phnum})}
          placeholder="???????????????????? ??????????"
          iconType="user"
          autoCapitalize="none"
          autoCorrect={false} 
          style={styles.input}
        />
        
        <View style={{flexDirection: 'row', width: '90%',marginVertical: 3}}>
          <TouchableOpacity style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center' ,justifyContent: 'center'}} onPress={()=> showMode('date')}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
              ???????????? ??????????
            </Text>
          </TouchableOpacity>
          <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 22}}>
              {chosenData}
            </Text>
          </View>
        </View>

        
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
                  : 
        
         <View style={{alignSelf: 'center', minHeight: 200, borderRadius: 5, borderWidth: 1, width: '98%', backgroundColor: 'lightgrey', marginVertical: 10}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              


           <TouchableOpacity onPress= {showModalOne} style={{marginLeft: 5,marginTop: 5, marginBottom: 5, borderRadius: 5, borderWidth: 1, minHeight: 90, width: '18%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 37}}>
                +
              </Text>

              <Text style={{fontSize: 12, fontWeight: '700'}}>
                ???????????????? 
              </Text>

              <Text style={{fontSize: 12, fontWeight: '700'}}>
                ???????? 
              </Text>
           </TouchableOpacity>
          </View>

         </View>}

        <TouchableOpacity 
          style={{borderWidth: 1, width: "90%",alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10,backgroundColor: '#31383e',borderWidth: 1, marginBottom: 50}}
          onPress={registerHandler}
        >
          
          
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            ???????????????????????????????? ????????????
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
    justifyContent: 'space-between',
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
  margin: 8,
  padding: 7,
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
  marginBottom: 5
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
 }
 
 
})
