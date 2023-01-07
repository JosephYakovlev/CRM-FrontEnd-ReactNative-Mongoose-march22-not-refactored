import axios from 'axios'
import React , {useState , useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, Alert } from 'react-native';
import ProfileBar from '../components/profilebar/ProfileBar';
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import {Context as AuthContext} from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ReversedFlatList from 'react-native-reversed-flat-list';
import DateTimePicker from '@react-native-community/datetimepicker'
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';
import * as ImagePicker from 'expo-image-picker'
import ImageView from "react-native-image-viewing";
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const OpenedCasePage = (data) => {

    console.log("OPPDATA")

    const [imageViewerProps, setImageViewerProps] = useState({
        visible: false,
    })

    const [imageCurViewerProps, setImageCurViewerProps] = useState({
      visible: false,
  })


    const headerHeight = getStatusBarHeight()

    const [imageWorkerViewerProps, setImageWorkerViewerProps] = useState({
        visible: false,
        index: 0
    })

    const [imageCurWorkerViewerProps, setImageCurWorkerViewerProps] = useState({
      visible: false,
      index: 0
    })

    console.log("DATA ROUTE PARAMS")
    

    



    const days = new Date(data.route.params.terms[0].mainTitle) - new Date(data.route.params.terms[0].title)
    const termDays = days/(3600000*24)*-1

    const workdays = [...Array(termDays)].map((i, index) => {

        let dayDate = new Date(data.route.params.terms[0].mainTitle)

        const dateCopy = new Date(dayDate.getTime());

        dateCopy.setDate(dateCopy.getDate() + (index+1))



        return {
            day: index+1,
            date: dateCopy,
            workDone: [],
            materialsWasted: [],
            price: 1,
            workers: [],
            paid: 0
        }
    })

    const realworkdays = workdays.length > 0 ? workdays : [{
      day: 1,
            date: data.route.params.terms[0].mainTitle,
            workDone: [],
            materialsWasted: [],
            price: 1,
            workers: [],
            paid: 0
    }]

    console.log(realworkdays)



    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width
    const workDoneUnitImageWidth = windowWidth/4.7
    const imageWidth = windowWidth/100*10

    const {state, signin} = useContext(AuthContext)
    const currentUser = state.user.user.userDump

    const CsId = data.route.params._id
    const indexRCaseData = currentUser.runningContracts.findIndex(i => i._id === CsId)
    
    const runningCaseData = (currentUser.runningContracts[indexRCaseData] ? currentUser.runningContracts[indexRCaseData] : {...data.route.params, workDays: realworkdays})
    
    console.log("OPPDAT22A")

    const [workDay, setWorkDay] = useState(runningCaseData.workDays[0])

    const indexDay = runningCaseData.workDays.findIndex(i => i._id === workDay._id)

    const wokDone = runningCaseData?.workDays[indexDay]?.workDone || []
    const wokers = runningCaseData?.workDays[indexDay]?.workers || []

    const votedEndOwner = runningCaseData?.voteEndOwner
    const votedEndContractor = runningCaseData?.voteEndContractor
    

    const approvedWorkDons = wokDone?.filter(i => 
        i.approved === "YES"
        &&
        i.paid !== i.price

    )

    const approvedAndPaidWorkDons = wokDone?.filter(i => 
        i.approved === "YES" &&
        i.paid === i.price 
    )

    const notApprovedWorkDons = wokDone?.filter(i => 
        i.approved !== "YES"
    )


    const approvedWorkers = wokers?.filter(i => 
        i.approved === "YES"
        &&
        i.paid !== i.price

    )

    const approvedAndPaidWorkers = wokers?.filter(i => 
        i.approved === "YES" &&
        i.paid === i.price 
    )

    const notApprovedWorkers = wokers?.filter(i => 
        i.approved !== "YES"
    )

    console.log("RUNNING DATA")

    const [workKind, setWorkKind] = useState('WORK')

    const [currentDoneWork, setCurrentDoneWork] = useState({
        _id: '',
        name:'',
        unit:'',
        quantity: 0,
        price: 1,
        paid: 0, 
        approved: "NO",
        img: ''
    })

    const [currentWorker, setCurrentWorker] = useState({
        _id: '',
        name: "",
        surname: "", 
        enter: "00:00", 
        leave: "00:00", 
        price: 1, 
        paid: 0, 
        approved: "NO",
        img: ''
    })


    const paymentStateWork = {
        Sender: currentUser._id,
        Reciever: runningCaseData.caseContractor,
        Summ: currentDoneWork.price ,
        Context: 'WORK PAY',
        BelongsTo: runningCaseData._id,
        PayFor: currentDoneWork._id 
    }

    const paymentStateWorkDeposit = {
      Sender: currentUser._id,
      Reciever: runningCaseData.caseContractor,
      Summ: currentDoneWork.price ,
      Context: 'WORK PAY DEPOSIT',
      BelongsTo: runningCaseData._id,
      PayFor: currentDoneWork._id 
  }

  const paymentStateWorker = {
    Sender: currentUser._id,
    Reciever: runningCaseData.caseContractor,
    Summ: currentWorker.price,
    Context: 'WORK PAY',
    BelongsTo: runningCaseData._id,
    PayFor: currentWorker._id
}

console.log("OPPDAT22A3343")

const paymentStateWorkerDeposit = {
  Sender: currentUser._id,
  Reciever: runningCaseData.caseContractor,
  Summ: currentWorker.price,
  Context: 'WORK PAY DEPOSIT',
  BelongsTo: runningCaseData._id,
  PayFor: currentWorker._id
}

    const [deletingWorker, setDeletingWorker] = useState({
        name: "",
        surname: "", 
        enter: "00:00", 
        leave: "00:00", 
        price: 1, 
        paid: 0, 
        approved: "NO",
        img: ''
    })

    console.log(deletingWorker.img)
    const [deletingDoneWork, setDeletingDoneWork] = useState({
        name:'',
        unit:'',
        quantity: 0,
        price: 1,
        paid: 0, 
        approved: "NO",
        img: ''
    })

    const [imgWorker, setImgWorker] = useState(null);
    const [imgDoneWork, setImgDoneWork] = useState(null);
    
  

    const [addDoneWorkForm, setAddDoneWorkForm] = useState({
        name:'',
        unit:'',
        quantity: 0,
        price: 1,
        owner: runningCaseData.caseOwner,
        contractor: runningCaseData.caseContractor,
        img: ''
    })

    const [addWorkerForm, setAddWorkerForm] = useState({
        name: '',
        surname: '',
        enter: '00:00',
        leave: '00:00',
        done: [],
        price: 1,
        owner: runningCaseData.caseOwner,
        contractor: runningCaseData.caseContractor,
        img: ''
    })


    const [showAddDoneWorkModal, setShowAddDoneWorkModal] = useState(false)
    const [showAddWorkerModal, setShowAddWorkerModal] = useState(false)
    const [showDeleteDoneWorkModal, setShowDeleteDoneWorkModal] = useState(false)
    const [showDeleteWorkerModal, setShowDeleteWorkerModal] = useState(false)
    const [showDoneWorkModal, setShowDoneWorkModal] = useState(false)
    const [showWorkerModal, setShowWorkerModal] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showBank, setShowBank] = useState(false)
    const [showCloseCaseModal, setShowCloseCaseModal] = useState(false)


    const showCloseCase = () => {
      setShowCloseCaseModal(true)
  }

    const hideCloseCase = () => {
      setShowCloseCaseModal(false)
    }


    const showDialogModal = () =>{
        setShowDialog(true)
        seenDialogHandler()
      }
    
      const hideDialogModal = () => {
        setShowDialog(false)
      }

      const showSBank= () =>{
        setShowBank(true)
      }
    
      const hideSbank = () => {
        setShowBank(false)
      }
      console.log("OPPDAT22Agsdfgsdfg")
    const showAddDoneWork = () =>{
        setShowAddDoneWorkModal(true)
      }
    
    const hideAddDoneWork = () => {
        setShowAddDoneWorkModal(false)
    }

    const showAddWorker = () =>{
        setShowAddWorkerModal(true)
      }
    
    const hideAddWorker = () => {
        setShowAddWorkerModal(false)
    }

    const showDeleteDoneWork = () =>{
        setShowDeleteDoneWorkModal(true)
      }
    
    const hideDeleteDoneWork = () => {
        setShowDeleteDoneWorkModal(false)
    }

    const showDeleteWorker = () =>{
        setShowDeleteWorkerModal(true)
      }
    
    const hideDeleteWorker = () => {
        setShowDeleteWorkerModal(false)
    }

    const showDoneWork = () =>{
        setShowDoneWorkModal(true)
      }
    
    const hideDoneWork = () => {
        setShowDoneWorkModal(false)
    }

    const showWorker = () =>{
        setShowWorkerModal(true)
      }
    
    const hideWorker = () => {
        setShowWorkerModal(false)
    }

    const [startDate, setStartDate] = useState(new Date(workDay.date))
    const [endDate, setEndDate] = useState(new Date(workDay.date))
    const [mode, setMode] = useState('time')
    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)

    const onChangeStart = (event,selectedDate) => {
        const currentDate = selectedDate || startDate
        setShowStart(Platform.OS === 'ios')
        setStartDate(currentDate)
  
        let tempDate = new Date(currentDate)
        let fDate = JSON.stringify(tempDate)
        let formatedDate = fDate.substring(12,17)
        setAddWorkerForm({...addWorkerForm, enter: formatedDate})
    
      }
  
      const onChangeEnd = (event,selectedDate) => {
        const currentDate = selectedDate || endDate
        setShowEnd(Platform.OS === 'ios')
        setEndDate(currentDate)
  
        let tempDate = new Date(currentDate)
        let fDate = JSON.stringify(tempDate)
        let formatedDate = fDate.substring(12,17)
        setAddWorkerForm({...addWorkerForm, leave: formatedDate})
    
      }
  
      const showModeStart = (currentMode) => {
        setShowStart(true)
        setMode('time')
      }
  
      const showModeEnd = (currentMode) => {
        setShowEnd(true)
        setMode('time')
      }

      console.log("OPPDAT22dfgdsfgdA")

    const registerDoneWorkHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/addDoneWork/${runningCaseData._id}/${workDay._id}`, {...addDoneWorkForm, img: imgDoneWork?.base64}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideAddDoneWork()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const registerWorkerHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/addWorker/${runningCaseData._id}/${workDay._id}`, {...addWorkerForm, img: imgWorker?.base64}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideAddWorker()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const deleteWorkerHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/deleteWorker/${runningCaseData._id}/${workDay._id}`, {...deletingWorker,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideDeleteWorker()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const deleteDoneWorkHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/deleteDoneWork/${runningCaseData._id}/${workDay._id}`, {...deletingDoneWork,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideDeleteDoneWork()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const approveDoneWorkHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/approveDoneWork/${runningCaseData._id}/${workDay._id}`, {...currentDoneWork,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideDoneWork()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const approveWorkerHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/approveWorker/${runningCaseData._id}/${workDay._id}`, {...currentWorker,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideWorker()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const payForWorkHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/payforwork/${runningCaseData._id}/${workDay._id}`, {...paymentStateWork,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
                socket.emit("reload", res.data.owner)
                socket.emit("reload", res.data.contractor)
                
                
                hideDoneWork()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const payForWorkDepositHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/payforworkdeposit/${runningCaseData._id}/${workDay._id}`, {...paymentStateWorkDeposit,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              hideDoneWork()
          })
          
        } catch (error) {
          console.log(error)
        }
    }


    const payForWorkerHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/payforworker/${runningCaseData._id}/${workDay._id}`, {...paymentStateWorker,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              hideWorker()
          })
          
        } catch (error) {
          console.log(error)
        }
    }


  const payForWorkerDepositHandler = async () => {
    try {

        const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/payforworkerdeposit/${runningCaseData._id}/${workDay._id}`, {...paymentStateWorkerDeposit,owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
          
            socket.emit("reload", res.data.owner)
            socket.emit("reload", res.data.contractor)
            
            
            hideWorker()
        })
        
      } catch (error) {
        console.log(error)
      }
}


    const voteEndByOwnerHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/voteowner/${runningCaseData._id}`, {owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              console.log("HELLO")
          })
          
        } catch (error) {
          console.log(error)
        }
    }

    const voteEndByContractorHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/votecontractor/${runningCaseData._id}`, {owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              hideDoneWork()
          })
          
        } catch (error) {
          console.log(error)
        }
    }


    const unvoteEndByOwnerHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/unvoteowner/${runningCaseData._id}`, {owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              hideDoneWork()
          })
          
        } catch (error) {
          console.log(error)
        }
    }

    const unvoteEndByContractorHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/unvotecontractor/${runningCaseData._id}`, {owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
              
              hideDoneWork()
          })
          
        } catch (error) {
          console.log(error)
        }
    }







    const doneWorkPrices = runningCaseData?.workDays[indexDay]?.workDone.map((item)=>{
        if(!item)
          return 
        return item.price
      }) || []
    
      const partyOverallPrice = doneWorkPrices.reduce(function( previousValue ,item) {
        return item + previousValue
      },0)

      const workpaids = runningCaseData.workDays.map((i)=> {
        const nums =  i.workDone.map((item)=>{
          if(!item)
            return 
          return item.paid
        })

        const overallNums = nums.reduce(function( previousValue ,item) {
          return item + previousValue
        },0)

        return overallNums
      })

      const workerpaids = runningCaseData.workDays.map((i)=> {
        const Wnums =  i.workers.map((item)=>{
          if(!item)
            return 
          return item.paid
        })

        const overallWNums = Wnums.reduce(function( previousValue ,item) {
          return item + previousValue
        },0)

        return overallWNums
      })


     
    
      const paidOverall = workpaids.reduce(function( previousValue ,item) {
        return item + previousValue
      },0)

    const WorkersPrices = runningCaseData?.workDays[indexDay]?.workers.map((item)=>{
        if(!item)
          return 
        return item.price
      }) || []
    
    const workerOverallPrice = WorkersPrices.reduce(function( previousValue ,item) {
        return item + previousValue
    },0)


    
    
    const workerOverallPaid = workerpaids.reduce(function( previousValue ,item) {
        return item + previousValue
      },0)


      const paidoverallperc = ((workerOverallPaid + paidOverall)/runningCaseData.price)*100


      const daysLasted = Math.floor((new Date() - new Date(runningCaseData.terms[0].mainTitle))/(3600000*24))
      

      



    const profit = (day) => {
          
        const doneWorkPaids= day.workDone.map((item)=>{
            if(!item)
              return 
            return item.paid
          })
        
        const paidDoneWorkOverall = doneWorkPaids.reduce(function( previousValue ,item) {
            return item + previousValue
        },0)


        const WorkersPaids= day.workers.map((item)=>{
            if(!item)
              return 
            return item.paid
        })
        
        const paidWorkersOverall = WorkersPaids.reduce(function( previousValue ,item) {
            return item + previousValue
        },0)


        return paidDoneWorkOverall + paidWorkersOverall


    }

    

      const currentMessages = currentUser.dialogs.filter(i=>{
        return i?.companion == runningCaseData._id
      })


      const unseenmsg = currentMessages[0]?.messages?.filter(i => {
        return  i?.messageSender != currentUser._id && 
                i?.unseen == "YES"
           
       }) || []

      const thisDialogMessages = currentMessages[0]?.messages || []

      useEffect(()=> {
        setShowMessages(false)
        setMessages(currentMessages[0]?.messages)
      },[thisDialogMessages])

    const [newMessage, setNewMessage] = useState({
        messageSender: currentUser._id,
        messageSenderAvatar: currentUser.avatar,
        messageSenderUsername: currentUser.username,
        messageReciever: currentUser._id === runningCaseData.caseOwner ? runningCaseData.caseContractor : runningCaseData.caseOwner,
        title: '',
        theme: 'RngC-Message',
        belongs: CsId,
        seen: "https://res.cloudinary.com/stroyka-ru/image/upload/v1664487284/check2_n6aw8c.png"
      })


    let today = String(new Date()).substring(16,21)
    let currdatec = currentUser.datec.substring(0,11)
      
    let todayfull = currdatec.concat(today)
    
    const [messages, setMessages] = useState(currentMessages[0]?.messages || [])
    
    const [showMessages, setShowMessages] = useState(false)
    
   
    const [value1, setValue1] = useState()


    
    const [showAddPhotoDoneWorkModal, setShowAddPhotoDoneWorkModal] = useState(false)
    const [showAddPhotoWorkerModal, setShowAddPhotoWorkerModal] = useState(false)

    


    const showWorkerOne = () =>{
        setShowAddPhotoWorkerModal(true)
      }
  
    const hideWorkerOne = () => {
        setShowAddPhotoWorkerModal(false)
    }

    const showDoneWorkOne = () =>{
        setShowAddPhotoDoneWorkModal(true)
    }
  
    const hideDoneWorkOne = () => {
        setShowAddPhotoDoneWorkModal(false)
    }

    const companion = currentUser._id === runningCaseData.caseOwner ? runningCaseData.caseContractor : runningCaseData.caseOwner

    const seenDialogHandler = async () => {
      try {
  
          const res = await axios.post(`http://62.113.97.220:8800/api/users/seendialog/${currentUser._id}/${currentMessages[0]?._id}/${companion}`).then((res)=>{
              socket.emit("reload", res.data.sender)
              socket.emit("reload", res.data.reciever)
              console.log("DONE")
          })
          
        } catch (error) {
          console.log(error)
        }
    }
      

    const sendMessageHandler = async () => {

      setValue1({value: ''})

      
          try{
            setMessages([...messages, {...newMessage, datec: todayfull, seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487287/check1_brohks.png', title: value1, _id: 'fgdfgdfgdfdfgdgd'}])
            setShowMessages(true)

            const res = await axios.post(`http://62.113.97.220:8800/api/users/newrunningconmessage`, {...newMessage, title: value1}).then((res) => {
        
                socket.emit("reload", res.data.reciever)
                socket.emit("reload", res.data.sender)

                seenDialogHandler()
              })
          } catch (error) {
            console.log("noPost", error);
          }
        
      }





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
    
    
    const PickDoneWorkGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[4,3],
            quality: 1,
            base64: true
        })
        
        if(!result.cancelled){
            setImgDoneWork(result)
            hideDoneWorkOne()
          }
    }
    
    
    
        const PickDoneWorkCamera = async () => {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[3,3],
            quality: 1,
            base64: true
          })
          if(!result.cancelled){
            setImgDoneWork(result)
            hideDoneWorkOne()
          }
        }
    
        


        const PickWorkerGalery = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect:[4,3],
                quality: 1,
                base64: true
            })
            
            if(!result.cancelled){
                setImgWorker(result)
                hideWorkerOne()
              }
        }
        
        
        
            const PickWorkerCamera = async () => {
              let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[3,3],
                quality: 1,
                base64: true
              })
              if(!result.cancelled){
                setImgWorker(result)
                hideWorkerOne()
              }
            }



      const renderMessage = (item,index) => {


        if(item.messageSender == currentUser._id) {
            return (
                <View style={{ 
                        width:'90%', 
                        minHeight: 80, 
                        backgroundColor: '#D5F8E6', 
                        marginTop: 15,
                        marginBottom: index == 0 ? 50 : 0, 
                        alignSelf: 'flex-end',
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1  ,
                        borderTopLeftRadius: 9,
                        borderBottomLeftRadius: 9,
                        flexDirection: 'row'
                    }}>
    
                    <View style = {{ width: '80%'}}>
                        
                        <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
                            Вы:
                        </Text>
    
                            
                       
    
                        <View style={{width: '85%', alignSelf:'center', minHeight: 35}}>
                            <Text>
                               {item.title}
                            </Text>
                        </View>
    
                        <View style={{position: 'absolute', bottom: 3, right: item.messageSender === currentUser._id ? 5 : null, bottom: 3 , left: item.messageSender === currentUser._id ? null : 67,flexDirection: 'row' }}>
    
                            <Image source ={{uri: item.seen}} style={{
                                width: 16,
                                height: 13,        
                            }}/>
    
                            <Text style={{ fontSize: 12, marginLeft: 5}}>
                                {item.datec.substring(11,16)}
                            </Text>
    
                        </View>
                        
    
                    </View>
                    <View style = {{ width: '20%', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image source ={{uri: item.messageSenderAvatar}} style={{    
                            width: imageWidth*1.7,
                            height: imageWidth*1.7,
                            borderRadius: imageWidth,
                            borderWidth: 1 ,
                            borderColor: 'black',
                            marginTop: 4,
                            marginRight: 2
                        }}/>
                    </View>
                </View>
            )
        } else {
    
            return(
                <View style={{
                        width:'90%', 
                        minHeight: 80, 
                        backgroundColor: 'lightblue', 
                        marginTop: 15, 
                        marginBottom: index == 0 ? 50 : 0,
                        alignSelf: 'flex-start',
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1 ,
                        borderBottomRightRadius: 9,
                        borderTopRightRadius: 9,
                        flexDirection: 'row'
                    }}>
    
                        <View style = {{ width: '20%', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Image source ={{uri: item.messageSenderAvatar}} style={{    
                                width: imageWidth*1.7,
                                height: imageWidth*1.7,
                                borderRadius: imageWidth,
                                borderWidth: 1 ,
                                borderColor: 'black',
                                marginTop: 4,
                                marginRight: 2
                            }}/>
                        </View>
    
                        <View style = {{ width: '80%'}}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
                                    {item.messageSenderUsername}:
    
                                </Text>
    
                                
    
                            <View style={{width: '90%', alignSelf:'center', minHeight: 35}}>
                                <Text>
                                {item.title}
                                </Text>
                            </View>
    
                            <View style={{position: 'absolute', bottom: 3, right: 5,flexDirection: 'row' }}>
    
    
                                <Text style={{ fontSize: 12, marginLeft: 5}}>
                                    {item.datec.substring(11,16)} 
                                </Text>
    
                            </View>
                            
    
                        </View>
                    
    
                </View>
            )
    
        }
    
    }



    const alertclosedcase = () => {
      Alert.alert(
          "Поздравляем!",
          "Вы успешно завершили контракт!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
    }




    const FinalCaseClosingHandler = async () => {

          try{
            const res = await axios.post(`http://62.113.97.220:8800/api/openedCases/finalcaseclose/${runningCaseData._id}`, {owner: runningCaseData.caseOwner , contractor: runningCaseData.caseContractor}).then((res)=>{
              
              hideCloseCase()
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              alertclosedcase()
              navigation.navigate('Main')
              
              
          })
          } catch (error) {
            console.log("noPost", error);
          }
        
      }






    return (
        <View style={{backgroundColor: 'white', flex: 1}}>



        <ImageView
            images={[{uri: deletingDoneWork?.img}]}
            imageIndex={imageViewerProps.index}
            visible={imageViewerProps.visible}
            onRequestClose={() => setImageViewerProps({...imageViewerProps, visible: false})}
        />

        <ImageView
            images={[{uri: deletingWorker?.img}]}
            imageIndex={imageWorkerViewerProps.index}
            visible={imageWorkerViewerProps.visible}
            onRequestClose={() => setImageWorkerViewerProps({...imageViewerProps, visible: false})}
        />

        <ImageView
            images={[{uri: currentDoneWork?.img}]}
            imageIndex={imageCurViewerProps.index}
            visible={imageCurViewerProps.visible}
            onRequestClose={() => setImageCurViewerProps({...imageViewerProps, visible: false})}
        />

        <ImageView
            images={[{uri: currentWorker?.img}]}
            imageIndex={imageCurWorkerViewerProps.index}
            visible={imageCurWorkerViewerProps.visible}
            onRequestClose={() => setImageCurWorkerViewerProps({...imageViewerProps, visible: false})}
        />








    <Modal 
        visible={showAddPhotoDoneWorkModal}  
        transparent
        onRequestClose = {()=>
            showAddPhotoDoneWorkModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideDoneWorkOne}>
          <View style={{...styles.modalInner, flexDirection: 'row', height: 300 }}>
          <TouchableOpacity style={styles.cam} onPress={PickDoneWorkCamera}>
          
            <Image source ={require('../../assets/src/useCamera.png')} style={{
                               width: 130,
                               height: 130,
                              borderRadius: 5,
                              marginBottom: 15
            }}/>

            <Text style={{fontSize: 20}}>
              Камера
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity style={styles.gal} onPress={PickDoneWorkGalery}>

            <Image source ={require('../../assets/src/useGal.png')} style={{
                              width: 130,
                              height: 130,
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
        visible={showCloseCaseModal}  
        transparent
        onRequestClose = {()=>
          setShowCloseCaseModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideCloseCase}>
          <TouchableOpacity style={{...styles.modalInner}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center'}}>
              Закрытие сделки
            </Text>

            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginTop: 10}}>
              Убедитесь что вас все устраивает
            </Text>

         

       
          
          <TouchableOpacity onPress={FinalCaseClosingHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Закрыть
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>                      






























      <Modal 
        visible={showAddPhotoWorkerModal}  
        transparent
        onRequestClose = {()=>
          setShowAddPhotoWorkerModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideWorkerOne}>
          <View style={{...styles.modalInner, height: 300, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.cam} onPress={PickWorkerCamera}>
          
            <Image source ={require('../../assets/src/useCamera.png')} style={{
                               width: 130,
                               height: 130,
                              borderRadius: 5,
                              marginBottom: 15
            }}/>

            <Text style={{fontSize: 20}}>
              Камера
            </Text>
          </TouchableOpacity>

         
          <TouchableOpacity style={styles.gal} onPress={PickWorkerGalery}>

            <Image source ={require('../../assets/src/useGal.png')} style={{
                              width: 130,
                              height: 130,
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
        visible={showAddDoneWorkModal}  
        transparent
        onRequestClose = {()=>
          setShowAddDoneWorkModal(false)
        }
        hardwareAccelerated
        animationType='none'
      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideAddDoneWork}>
          <TouchableOpacity style={{...styles.modalInner}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginBottom: 10}}>
              Выполненная работа #{workDay.workDone.length+1}
            </Text>

            
            <TextInput 
                onChangeText={(nam) => setAddDoneWorkForm({...addDoneWorkForm, name: nam})}
                placeholder="Наименование"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />

            <TextInput 
                onChangeText={(un) => setAddDoneWorkForm({...addDoneWorkForm, unit: un})}
                placeholder="Единица измерения"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />

            <TextInput
                onChangeText={(quan) => setAddDoneWorkForm({...addDoneWorkForm, quantity: quan})}
                placeholder="Количество"
                iconType="user"
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />

            <TextInput
                onChangeText={(money) => setAddDoneWorkForm({...addDoneWorkForm, price: money})}
                placeholder="Цена за 1 ед"
                iconType="user"
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />


        <TouchableOpacity onPress={showDoneWorkOne}  style={{flexDirection: 'row', alignItems: 'center', height: 150, justifyContent: 'center'}} >
                { imgDoneWork 
                  ? 
                    <Image source={{uri: imgDoneWork.uri}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginBottom: 5,
                        alignSelf: 'center'
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


            {imgDoneWork && <TouchableOpacity onPress={() => setImgDoneWork(null)} style={{ alignSelf: 'center', minHeight: 30, width: '50%', backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 1, marginBottom: -5, marginTop: 5}}>
                <Text style={{ fontSize: 16, color: 'black'}}>
                    Удалить фото
                </Text>
            </TouchableOpacity>}
          
          <TouchableOpacity onPress={registerDoneWorkHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Добавить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

















    <Modal 
        visible={showAddWorkerModal}  
        transparent
        onRequestClose = {()=>
          setShowAddWorkerModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideAddWorker}>
          <TouchableOpacity style={{...styles.modalInner}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginBottom: 10}}>
              Добавить рабочего #{workDay.workers.length+1}
            </Text>

            
            <TextInput 
                onChangeText={(nam) => setAddWorkerForm({...addWorkerForm, name: nam})}
                placeholder="Имя"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />

            <TextInput 
                onChangeText={(snam) => setAddWorkerForm({...addWorkerForm, surname: snam})}
                placeholder="Фамилия"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />


        

            <TouchableOpacity onPress={showModeStart} style={{flexDirection: 'row', width: '90%',marginVertical: 8, alignSelf: 'center'}}>
                <View style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center' ,justifyContent: 'center'}} onPress={()=> showMode('date')}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
                        Начал работу:
                    </Text>
                </View>
                <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {addWorkerForm.enter}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={showModeEnd} style={{flexDirection: 'row', width: '90%',marginVertical: 8, alignSelf: 'center'}}>
                <View style={{borderRadius: 5,borderWidth: 1,backgroundColor: '#31383e', width: '50%',alignItems: 'center' ,justifyContent: 'center'}} onPress={()=> showMode('date')}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: '400',marginVertical:5}}>
                        Закончил работу:
                    </Text>
                </View>
                <View style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {addWorkerForm.leave}
                    </Text>
                </View>
            </TouchableOpacity>


            <TextInput
                onChangeText={(money) => setAddWorkerForm({...addWorkerForm, price: money})}
                placeholder="Цена"
                iconType="user"
                keyboardType='numeric'
                autoCapitalize="none"
                autoCorrect={false} 
                style={styles.input}
            />


            <TouchableOpacity onPress={showWorkerOne}  style={{flexDirection: 'row', alignItems: 'center', height: 150, width: '95%', alignSelf: 'center', justifyContent: 'center'}} >
                { imgWorker 
                  ? 
                    <Image source={{uri: imgWorker.uri}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
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


            {imgWorker && <TouchableOpacity onPress={() => setImgWorker(null)} style={{ alignSelf: 'center', minHeight: 30, width: '50%', backgroundColor: 'lightgrey', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 1, marginBottom: -5, marginTop: 5}}>
                <Text style={{ fontSize: 16, color: 'black'}}>
                    Удалить фото
                </Text>
            </TouchableOpacity>}
       
          
          <TouchableOpacity onPress={registerWorkerHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Добавить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>


































      <Modal 
        visible={showDeleteWorkerModal}  
        transparent
        onRequestClose = {()=>
          setShowDeleteWorkerModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideDeleteWorker}>
          <TouchableOpacity style={{...styles.modalInner}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center'}}>
              Удалить рабочего {deletingWorker.indx}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', color: 'blue'}}>
                {deletingWorker.name}
                </Text>

                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginLeft: 5, color: 'blue'}}>
                {deletingWorker.surname}
                </Text>
            </View>

            <TouchableOpacity  style={{flexDirection: 'row', width: '90%',marginVertical: 8, alignSelf: 'center'}}>
                <View style={{width: '60%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22, color: 'black'}}>
                        Начал работу:
                    </Text>
                </View>
                <View style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {deletingWorker.enter}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity   style={{flexDirection: 'row', width: '90%',marginVertical: 8, alignSelf: 'center'}}>
                <View style={{width: '60%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20, color: 'black'}}>
                        Закончил работу:
                    </Text>
                </View>
                <View style={{width: '40%', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20}}>
                        {deletingWorker.leave}
                    </Text>
                </View>
            </TouchableOpacity>

            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginTop: 10}}>
              Цена: {NormalizeNumHook(deletingWorker.price)}.00 руб.
            </Text>



            
            <TouchableOpacity onPress={()=> setImageWorkerViewerProps({visible: true})} style={{alignSelf: 'center'}}>
                <Image source={{uri: deletingWorker.img}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginTop: 5,
                        marginBottom: 5,
                        alignSelf: 'center'
                }}/> 
            </TouchableOpacity>
          
          <TouchableOpacity onPress={deleteWorkerHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Удалить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>


        























      <Modal 
        visible={showDeleteDoneWorkModal}  
        transparent
        onRequestClose = {()=>
          setShowDeleteDoneWorkModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideDeleteDoneWork}>
          <TouchableOpacity style={{...styles.modalInner}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center'}}>
              Удалить работу #{deletingDoneWork.indx}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', color: 'blue'}}>
                    Наименование
                </Text>

                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginLeft: 5, color: 'blue'}}>
                {deletingDoneWork.name}
                </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', color: 'blue'}}>
                 ед. изм.
                </Text>

                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginLeft: 5, color: 'blue'}}>
                {deletingDoneWork.unit}
                </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', color: 'blue'}}>
                кол-во
                </Text>

                <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginLeft: 5, color: 'blue'}}>
                {deletingDoneWork.quantity}
                </Text>
            </View>

            

            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginTop: 10}}>
              Цена: {NormalizeNumHook(deletingWorker.price)}.00 р..00 руб.
            </Text>

            <TouchableOpacity onPress={()=>setImageViewerProps({visible: true, index: 0})} style={{alignSelf: 'center'}}>
                <Image source={{uri: deletingDoneWork.img}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginBottom: 5,
                        marginTop: 5,
                        alignSelf: 'center'
                }}/> 
            </TouchableOpacity>

       
          
          <TouchableOpacity onPress={deleteDoneWorkHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Удалить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>















































<Modal 
        visible={showDoneWorkModal}  
        transparent
        onRequestClose = {()=>
          setShowDoneWorkModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideDoneWork}>
          <TouchableOpacity style={{...styles.modalInner, backgroundColor: 'white'}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginBottom: 10}}>
              Работа #{currentDoneWork.indx}
            </Text>


            <TouchableOpacity onPress={()=> setImageCurViewerProps({visible: true})} style={{flexDirection: 'row', alignItems: 'center', height: 150, justifyContent: 'center'}} >
                
                    <Image source={{uri: currentDoneWork.img}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginBottom: 5,
                        alignSelf: 'center'
                    }}/> 
               

        </TouchableOpacity>

            
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700',  color: 'blue'}}>
                {currentDoneWork.name}
                </Text>
            </View>

            <TouchableOpacity  style={{flexDirection: 'row', width: '90%',marginVertical: 8, marginLeft: 10}}>
                <View style={{width: '60%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22, color: 'black'}}>
                        Единица:
                    </Text>
                </View>
                <View style={{width: '40%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {currentDoneWork.unit}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity   style={{flexDirection: 'row', width: '90%',marginVertical: 8, marginLeft: 10}}>
                <View style={{width: '60%', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20, color: 'black'}}>
                        Количество:
                    </Text>
                </View>
                <View style={{width: '40%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {currentDoneWork.quantity}
                    </Text>
                </View>
            </TouchableOpacity>
          
          {currentDoneWork.approved === "YES" ? 
          <View style={{...styles.deni, backgroundColor: 'green'}}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Одобрено
            </Text>
          </View> 

            :

          <TouchableOpacity onPress={approveDoneWorkHandler} style={{...styles.deni, backgroundColor: 'lightgreen'}}>
            <Text style={{paddingHorizontal: '15%',color: 'black', fontSize: 22,fontWeight:'bold'}}>
              Одобрить
            </Text>
          </TouchableOpacity> 
          
          }


          <View style={{width:'100%', minHeight: 1, backgroundColor: 'black', marginTop: 15}}>

          </View>

 
          {currentDoneWork.paid < currentDoneWork.price && 
          <>
            <TouchableOpacity   style={{flexDirection: 'row', width: '100%',marginVertical: 8,  marginTop: 10}}>
                  <View style={{width: '50%', justifyContent: 'center'}}>
                      <Text style={{ fontSize: 18, color: 'black', marginLeft: 10}}>
                          На вашем счету:
                      </Text>
                  </View>
                  <View style={{width: '50%',  justifyContent: 'center'}}>
                      <Text style={{ fontSize: 20,fontWeight: '700', color: 'green', marginLeft: 5}}>
                          {currentUser.wallet}.00 руб.
                      </Text>
                  </View>
              </TouchableOpacity>


              <TouchableOpacity   style={{flexDirection: 'row', width: '100%',marginVertical: 8, }}>
                  <View style={{width: '50%', justifyContent: 'center'}}>
                      <Text style={{ fontSize: 18, color: 'black', marginLeft: 10}}>
                          Остаток залога за всю сделку:
                      </Text>
                  </View>
                  <View style={{width: '50%',  justifyContent: 'center'}}>
                      <Text style={{ fontSize: 20,fontWeight: '700', color: 'green', marginLeft: 5}}>
                        {runningCaseData.depositOwner}.00 руб
                      </Text>
                  </View>
              </TouchableOpacity>
            </>
            }


            <Text style={{fontSize: 18, fontWeight: '700',  marginTop: 10, alignSelf: 'center'}}>
              Цена: {NormalizeNumHook(currentDoneWork.price)}.00 руб.
            </Text>

            {currentDoneWork.paid >= currentDoneWork.price ? 
              <View style={{...styles.deni, backgroundColor: 'green'}}>
                <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
                  Оплачено
                </Text>
              </View>

                :

                <>
                <TouchableOpacity onPress={payForWorkDepositHandler}  style={{...styles.deni, backgroundColor: 'green'}}>
                  <Text style={{paddingHorizontal: 10,color: 'white', fontSize: 22,fontWeight:'600'}}>
                    Оплатить со счета сделки
                  </Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={payForWorkHandler}  style={{...styles.deni, backgroundColor: 'green'}}>
                  <Text style={{paddingHorizontal: 10,color: 'white', fontSize: 22,fontWeight:'600'}}>
                    Оплатить со своего счета
                  </Text>
                </TouchableOpacity> 
              </>
              
            }


          
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
















    <Modal 
        visible={showWorkerModal}  
        transparent
        onRequestClose = {()=>
          setShowWorkerModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideWorker}>
          <TouchableOpacity style={{...styles.modalInner, backgroundColor: 'white'}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginBottom: 10}}>
             Работник {currentWorker.indx}
            </Text>

            <TouchableOpacity onPress={()=> setImageCurWorkerViewerProps({visible: true})} style={{flexDirection: 'row', alignItems: 'center', height: 150, justifyContent: 'center'}} >
                
                    <Image source={{uri: currentWorker.img}} style={{
                        width: 150,
                        height:150,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginBottom: 5,
                        alignSelf: 'center'
                    }}/> 
               

          </TouchableOpacity>

            
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10,width: '100%'}}>
                <Text style={{fontSize: 18, fontWeight: '700',  color: 'blue'}}>
                {currentWorker.name}
                </Text>

                <Text style={{fontSize: 18, fontWeight: '700', marginLeft: 5, color: 'blue'}}>
                {currentWorker.surname}
                </Text>
            </View>

            <TouchableOpacity  style={{flexDirection: 'row', width: '90%',marginVertical: 8, marginLeft: 10}}>
                <View style={{width: '60%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22, color: 'black'}}>
                        Начал работу:
                    </Text>
                </View>
                <View style={{width: '40%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {currentWorker.enter}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity   style={{flexDirection: 'row', width: '90%',marginVertical: 8, marginLeft: 10}}>
                <View style={{width: '60%', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20, color: 'black'}}>
                        Закончил работу:
                    </Text>
                </View>
                <View style={{width: '40%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 22}}>
                        {currentWorker.leave}
                    </Text>
                </View>
            </TouchableOpacity>

            {currentWorker.approved === "YES" ? 
          <View style={{...styles.deni, backgroundColor: 'green'}}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Одобрено
            </Text>
          </View> 

            :

          <TouchableOpacity onPress={approveWorkerHandler} style={{...styles.deni, backgroundColor: 'lightgreen'}}>
            <Text style={{paddingHorizontal: '15%',color: 'black', fontSize: 22,fontWeight:'bold'}}>
              Одобрить
            </Text>
          </TouchableOpacity> 
          
          }


          <View style={{width:'100%', minHeight: 1, backgroundColor: 'black', marginTop: 15}}>

          </View>

 
          {currentWorker.paid < currentWorker.price && 
          <>
          <TouchableOpacity   style={{flexDirection: 'row', width: '100%',marginVertical: 8,  marginTop: 10}}>
                <View style={{width: '50%', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 18, color: 'black', marginLeft: 10}}>
                        На вашем счету:
                    </Text>
                </View>
                <View style={{width: '50%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20,fontWeight: '700', color: 'green', marginLeft: 5}}>
                        {currentUser.wallet}.00 руб.
                    </Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity   style={{flexDirection: 'row', width: '100%',marginVertical: 8, }}>
                <View style={{width: '50%', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 18, color: 'black', marginLeft: 10}}>
                        Остаток залога за всю сделку:
                    </Text>
                </View>
                <View style={{width: '50%',  justifyContent: 'center'}}>
                    <Text style={{ fontSize: 20,fontWeight: '700', color: 'green', marginLeft: 5}}>
                      {runningCaseData.depositOwner}.00 руб
                    </Text>
                </View>
            </TouchableOpacity>
            </>
            }


            <Text style={{fontSize: 18, fontWeight: '700',  marginTop: 10, alignSelf: 'center'}}>
              Цена: {NormalizeNumHook(currentWorker.price)}.00 руб.
            </Text>


            {currentWorker.paid >= currentWorker.price ? 
              <View style={{...styles.deni, backgroundColor: 'green'}}>
                <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
                  Оплачено
                </Text>
              </View>

                :
              <>
                <TouchableOpacity onPress={payForWorkerDepositHandler}  style={{...styles.deni, backgroundColor: 'green'}}>
                  <Text style={{paddingHorizontal: 10,color: 'white', fontSize: 22,fontWeight:'600'}}>
                    Оплатить со счета сделки
                  </Text>
                </TouchableOpacity> 

                <TouchableOpacity onPress={payForWorkerHandler}  style={{...styles.deni, backgroundColor: 'green'}}>
                  <Text style={{paddingHorizontal: 10,color: 'white', fontSize: 22,fontWeight:'600'}}>
                    Оплатить со своего счета
                  </Text>
                </TouchableOpacity> 
              </>
              
            }
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

















      <Modal 
        visible={showDialog}  
        transparent
        onRequestClose = {()=>
          setShowDialog(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <View style={styles.modalOne} >
          <View style={styles.modalInnerDialog}>

            <View style={{marginBottom: 84, borderBottomColor: 'black'}}>
          
                <ReversedFlatList
                    data={showMessages == true ? messages : currentMessages[0]?.messages}
                    keyExtractor={(item) => item._id}
                    renderItem={ ({ item, index }) => (
                        renderMessage(item, index) 
                    )}
                />
            

          </View>

            <View style={{width: '100%', position: 'absolute', bottom: 0, minHeight: 85}}>

              <View style={{flexDirection: 'row', padding: 10,borderTopWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 15}}>
                    Вы:
                  </Text>
                </View>

                <TextInput
                  onChangeText={(message) => setValue1(message)}
                  placeholder="Ваше сообщение..."
                  iconType="user"
                  autoCapitalize="none"
                  value={value1}
                  style={styles.inputDialog}
                />
                
                <TouchableOpacity onPress={sendMessageHandler} style={{width: '15%', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <Image source ={require('../../assets/sendmsg.png')} style={{    
                        width: imageWidth+5,
                        height: imageWidth+5,
                  }}/>
                </TouchableOpacity>
                
              </View>
            </View>

          </View>
        </View>
      </Modal>




      <Modal 
        visible={showBank}  
        transparent
        onRequestClose = {()=>
          setShowBank(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <View style={styles.modalOne} >
          <View style={styles.modalInnerDialog}>

            <ScrollView style={{ borderBottomColor: 'black', borderBottomWidth: 2}}>

              <Image source ={require('../../assets/crm/logo.png')} style={{
                  marginTop: 5,
                  width: 50,
                  height: 66,
                  alignSelf: 'center',
                  marginVertical: 20
              }} />

              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
              <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                  Номер счета сделки:
              </Text>

              <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                {runningCaseData._id}
              </Text>

              </View>

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <Text style={{fontSize: 22, fontWeight: '700', color: '#31383e'}}>
                  БАНК:
              </Text>

              <Text style={{fontSize: 22, fontWeight: '700', color: 'green', marginLeft: 10}}>
                  {NormalizeNumHook(runningCaseData.depositOwner+runningCaseData.depositContractor)}.00 руб.
              </Text>

              </View>

              <View style={{width: '100%', minHeight: 2, backgroundColor: 'black', marginVertical: 10}}>

              </View>

             

              <Text style={{fontSize: 25, fontWeight: '600', color: '#31383e', alignSelf: 'center'}}>
                  Транзакции:
              </Text>

              {runningCaseData.transactions.map((i, index) => 

              i.Reciever == runningCaseData.fromConContr  ?

                  <View style={{width: '100%', marginTop: 10,minHeight: 80, backgroundColor: '#00FF1040', marginBottom: index === 0 ? 10 : 0, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1}} key={i._id} >
                      {i.Context === "START CASE DEPOSIT"   ?
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
                                      ВНЕСЕНИЕ ДЕПОЗИТА
                                  </Text>
                              </View>

                              <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                      <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                          От:
                                      </Text>

                                      <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                          {i.Sender == runningCaseData.caseOwner ? 'Заказчика' : 'Подрядчика'}
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
                                  Внесение депозита с расс. счета
                              </Text>
                      </View>

                          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                      <Text style={{fontSize: 14, fontWeight: '700', color: '#31383e'}}>
                                          От:
                                      </Text>

                                      <Text style={{fontSize: 14, fontWeight: '700', color: 'blue', marginLeft: 10}}>
                                          {i.Sender == runningCaseData.caseOwner ? 'Заказчика' : 'Подрядчика'}
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
                                  {i.Context === "WORK PAY DEPOSIT" ? 'Оплата счета за работу с депозита сделки.' : 'Оплата счета за работу с расс. счета.'}
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
        </View>
        </View>
      </Modal>





      






          
            <ScrollView style={{marginBottom: 90, marginTop: headerHeight}}>

            {showStart && (
                <DateTimePicker 
                    testID='dateTimePicker'
                    value={startDate}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeStart}
                />
            )}

            {showEnd && (
                <DateTimePicker 
                    testID='dateTimePicker'
                    value={endDate}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeEnd}
                />
            )}
                
                <View style={styles.caseTitle}>
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}> Строительный подряд</Text>
                </View>

                <View style={styles.caseInfo}>
                    <View style={{flexDirection:'column',alignItems: 'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text> Id сделки: </Text>
                            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'blue',fontStyle: 'italic'}}> {runningCaseData._id}</Text>
                        </View>
                        <Text> Направление: отделочные работы</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'blue'}}> Показать СНиПы, ГОСТы и т.д. </Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'green'}}> Юридические услуги</Text>
                    </View>
                    <View style={{flexDirection:'column',alignItems: 'center'}}>
                        <Text>
                            Менеджер сделки:
                        </Text>
 
                        <Text style={{color: 'blue', fontSize: 16,fontWeight: 'bold'}}>
                            Татьяна А.Н.
                        </Text>

                        <View style={styles.button}>
                            <Text style={{color: 'white'}}>
                                Открыть чат
                            </Text>
                        </View>
                        <View style={{...styles.button,marginTop: 5}}>
                            <Text style={{color: 'white'}}>
                                Связаться
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.caseMembers}>
                    <View style={styles.memberCont}>
                        <Text style={styles.memberName}>
                            {runningCaseData.caseContractorUserName}
                        </Text>
                        <Image source ={{ uri: runningCaseData.caseContractorAvatar}} style={{
                                            width: 116,
                                            height: 116,
                                            borderRadius: 5,
                                            borderWidth: 3,
                                            borderColor: '#006b76'
                        }}/>

                        <Text style={styles.memberName}>
                            Депозит: {runningCaseData.depositContractor}.00 р.
                        </Text>

                        {votedEndContractor == true &&  <TouchableOpacity onPress={() => {currentUser._id == runningCaseData?.caseContractor ? unvoteEndByContractorHandler() : showCloseCase()}} style={{position: 'absolute', height: 108, width: 108, top: 21, left: 6, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', borderRadius: 54, borderWidth: 2, borderColor: 'yellow'}}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                                Предлагает
                            </Text>
                            <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold'}}>
                                закрыть
                            </Text>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                                сделку
                            </Text>
                        </TouchableOpacity>}

                        {votedEndContractor == false && currentUser._id == runningCaseData?.caseContractor && <TouchableOpacity onPress={() => { votedEndOwner == false ? voteEndByContractorHandler() : showCloseCase()}} style={{position: 'absolute', height: 50, width: 80, bottom: -20, left: 3, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: 'black'}}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                                Закрыть
                            </Text>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                                сделку
                            </Text>
                        </TouchableOpacity>}


                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', bottom: 5}}>
                      <TouchableOpacity onPress={showSBank} style={{ alignItems: 'center'}}>
                        <Text style={{fontSize: 20,fontWeight: 'bold', color: '#006b76'}}>
                            Банк
                        </Text>
                        
                        <Text style={{fontSize: 18,fontWeight: '500', color: '#006b76', marginTop: -3}}>
                            {runningCaseData.depositOwner+runningCaseData.depositContractor}.00 руб.
                        </Text>

                        <Text style={{fontSize: 15,fontWeight: '500', color: 'blue'}}>
                            Транзакции..
                        </Text>
                      </TouchableOpacity>

                        <Image source ={require('../../assets/handshake.png')} style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 5,
                                            alignSelf: 'center'
                        }}/>

                        <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                            День: {daysLasted}
                        </Text>

                        <TouchableOpacity onPress={showDialogModal} style={{width: 90, backgroundColor:'lightgrey',padding: 2, borderRadius: 5, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                            <Text>
                                Диалог..
                            </Text>

                            {unseenmsg.length > 0 && 
                              <View style={{position:'absolute',height: 25, width: 25, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', top: -12, right: -10}}>
                                <Text style={{color: 'white', fontSize: 16}}>
                                  {unseenmsg.length}  
                                </Text>
                              </View>
                            }
                        </TouchableOpacity>
                    </View>

                    

                    <View style={styles.memberCont}>
                        
                        <Text style={styles.memberName}>
                            {runningCaseData.caseOwnerUserName}
                        </Text>
                        <Image source ={{ uri: runningCaseData.caseOwnerAvatar}} style={{
                                                width: 116,
                                                height: 116,
                                                borderRadius: 5,
                                                borderWidth: 3,
                                                borderColor: '#006b76'
                        }}/>

                        <Text style={styles.memberName}>
                            Депозит: {runningCaseData.depositOwner}.00 р.
                        </Text>

                        {votedEndOwner == true && <TouchableOpacity onPress={() => {currentUser._id == runningCaseData?.caseOwner ? unvoteEndByOwnerHandler() : showCloseCase()}} style={{position: 'absolute', height: 108, width: 108, top: 21, right: 3, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', borderRadius: 54, borderWidth: 2, borderColor: 'yellow'}}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                                Предлагает
                            </Text>
                            <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold'}}>
                                закрыть
                            </Text>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold'}}>
                                сделку
                            </Text>
                        </TouchableOpacity>}

                        {votedEndOwner == false && currentUser._id == runningCaseData?.caseOwner && 
                          <TouchableOpacity onPress={() => { votedEndContractor == false ? voteEndByOwnerHandler() : showCloseCase()}} 
                                            style={{position: 'absolute', height: 50, width: 80, bottom: -20, right: 3, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: 'black'}}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                                Закрыть
                            </Text>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                                сделку
                            </Text>
                        </TouchableOpacity>}

                    </View>

                </View>

                <Text style={{fontSize: 15, fontWeight: 'bold',alignSelf: 'center'}}>
                  Полная цена контракта:
                </Text>

                <Text style={{fontSize: 18, fontWeight: 'bold',alignSelf: 'center', color: 'green'}}>
                  {NormalizeNumHook(runningCaseData.price)}.00 р.
                </Text>

                <View style={{marginLeft: `${paidoverallperc < 15 && 5 || paidoverallperc > 75 && 60 || paidoverallperc >= 15 && paidoverallperc <= 75 && paidoverallperc -15 }%`}}>
                          <Text>
                            Оплачено: {NormalizeNumHook(paidOverall+workerOverallPaid)}.00 р. 
                          </Text>
                </View>

                <View style={{width:'100%', alignItems: 'center', marginBottom: 10}}>
                  <View style={{width:'90%',flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width:`${paidoverallperc}%`, backgroundColor: 'green', height: 4}}>

                    </View>
                    <View style={{width:'1%', backgroundColor: 'black', height: 12}}>
                      

                    </View>
                    <View style={{width:`${100-paidoverallperc}%`, backgroundColor: 'grey', height: 4}}>

                    </View>

                  </View>
                </View>


                <View style={{width:'100%', backgroundColor: 'lightgrey', height: 55, marginTop: 5, borderTopWidth: 1, borderBottomWidth: 1}}>
                    <ScrollView horizontal={true}  style={{flexDirection: 'row', width:'100%'}} >
                        { runningCaseData.workDays.map((day) =>
                            <TouchableOpacity onPress={()=>setWorkDay(day)} key={day.day} style={{width: 100,  backgroundColor: day.day === workDay.day ? 'lightgreen' : 'lightgrey', borderLeftWidth: 0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 15,marginBottom: -4}}>
                                    День {day.day} 
                                </Text>
                                <Text style={{fontSize: 14}}>
                                    Заработано:
                                </Text>

                                <Text style={{fontSize: 15, marginTop: -3}}>
                                    {NormalizeNumHook(profit(day))}.00 р. 
                                </Text>
                                

                            </TouchableOpacity>
                        )}
                    </ScrollView>

                </View>

                <Text style={{fontSize: 22,fontWeight: '600', alignSelf: 'center', marginVertical: 7}}>
                    День {workDay.day}
                </Text>   

                <View style={{width:'100%', height: 70,flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=> setWorkKind('WORK')} style={{width:'50%', height: 70,justifyContent: 'center', alignItems: 'center',borderRightWidth: 1,backgroundColor: workKind === 'WORK' ? 'lightgreen' : 'lightgrey',borderBottomWidth: 1, borderTopWidth: 1}}>
                        <Text style={{fontSize: 18, fontWeight: '600', marginTop: 5}}>
                            Работы:  ({wokDone.length}..) 
                        </Text>

                        <Text style={{fontSize: 14, fontWeight: '600', marginTop: -4}}>
                            На сумму:  {NormalizeNumHook(partyOverallPrice)}.00 руб.  
                        </Text>

                        <Text style={{fontSize: 14, fontWeight: '600', marginTop: -4}}>
                            Оплачено:  {NormalizeNumHook(paidOverall)}.00 руб.  
                        </Text>

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'red', borderColor: 'black', top: -16, left: 3, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'white'}}>
                                {notApprovedWorkDons.length}
                            </Text>
                        </View>

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'orange', borderColor: 'black', top: -16, left: 33, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'black'}}>
                                {approvedWorkDons.length}
                            </Text>
                        </View>

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'green', borderColor: 'black', top: -16, left: 64, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'white'}}>
                                {approvedAndPaidWorkDons.length}
                            </Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={()=> setWorkKind('VISIT')} style={{width:'50%', height: 70,justifyContent: 'center', alignItems: 'center',backgroundColor: workKind === 'VISIT' ? 'lightgreen': 'lightgrey',borderBottomWidth: 1, borderTopWidth: 1}}>
                        <Text style={{fontSize: 19, fontWeight: '600'}}>
                            Посещения: ({wokers?.length}..)
                        </Text>

                        <Text style={{fontSize: 14, fontWeight: '600', marginTop: -4}}>
                            На сумму:  {NormalizeNumHook(workerOverallPrice)}.00 руб.  
                        </Text>

                        <Text style={{fontSize: 14, fontWeight: '600', marginTop: -4}}>
                            Оплачено:  {NormalizeNumHook(workerOverallPaid)}.00 руб. 
                        </Text>

                        

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'red', borderColor: 'black', top: -16, right: 3, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'white'}}>
                                {notApprovedWorkers.length}
                            </Text>
                        </View>

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'orange', borderColor: 'black', top: -16, right: 33, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'black'}}>
                                {approvedWorkers.length}
                            </Text>
                        </View>

                        <View style={{position: 'absolute', width:26,height: 26,borderRadius: 5, backgroundColor: 'green', borderColor: 'black', top: -16, right: 64, borderWidth: 1, justifyContent: 'center', alignItems:'center'}}>
                            <Text style={{fontSize: 17, color: 'white'}}>
                                {approvedAndPaidWorkers.length}
                            </Text>
                        </View>


                    </TouchableOpacity> 
                </View> 












                { workKind === "WORK" && 
                
            
                <View>
                    {wokDone.map((workUnit, index) => 
                    
                <TouchableOpacity onPress={() => {currentUser._id == runningCaseData.caseOwner ?  (setCurrentDoneWork({...workUnit, indx: index +1}), showDoneWork()) : (setDeletingDoneWork({...workUnit,indx: index+1}), showDeleteDoneWork()) }}  key = {workUnit._id} style={{width:'98%', height: 125,flexDirection: 'column', alignItems: 'center', marginTop: 17, borderWidth:1, borderStyle:'dashed', alignSelf: 'center', marginBottom: index+1 === workDay.workDone.length ? 10 : 0}}>
                  
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{marginLeft: 17,color: 'black', fontWeight: 'bold'}}>
                                            Id:
                                        </Text>
                                        <Text style={{marginLeft: 3,fontSize: 13,fontWeight: '300', color: 'blue'}}>
                                        {workUnit._id}
                                        </Text>
                          </View>
                  
                  
                  
                  
                  
                  
                  
                  
                  <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width:'35%', height: 100}}>
                        
                            <Text style={{alignSelf: 'center', marginTop: 20}}>
                                Наименование:
                            </Text>
                            <Text style={{alignSelf: 'center',fontSize: 15,fontWeight: '600', color: 'blue'}}>
                                {workUnit.name}
                            </Text>
                        
                        
                            <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{marginLeft: 17}}>
                                    Цена:
                                </Text>
                                <Text style={{marginLeft: 10,fontSize: 19,fontWeight: '700', color: 'green'}}>
                                    {NormalizeNumHook(workUnit.price)}.00 руб.
                                </Text>
                            </View>
                        
                    </View> 

                    <View style={{width:'40%', height: 100,alignItems: 'center', justifyContent:'center'}}>
                        
                            <Text>
                                Работа принята:
                            </Text>

                            {workUnit.approved !== "YES" &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'red'}}>
                                    НЕТ
                                </Text>
                            }

                            {workUnit.approved === "YES" && workUnit.paid !== workUnit.price &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'orange'}}>
                                    ДА
                                </Text>
                            }

                            {workUnit.approved === "YES" && workUnit.paid === workUnit.price &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'green'}}>
                                    ДА
                                </Text>
                            }

                       
                        
                        
                            <Text>
                                Оплачена:
                            </Text>
                            {workUnit.paid !== workUnit.price &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'red'}}>
                                    НЕТ
                                </Text>
                            }

                            {workUnit.paid === workUnit.price && workUnit.price <= 0 &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'red'}}>
                                    НЕТ
                                </Text>
                            }

                            {workUnit.paid === workUnit.price && workUnit.price > 0 &&
                                <Text style={{fontSize: 19,fontWeight: '700', color: 'green'}}>
                                    ДА
                                </Text>
                            }
                        
                    </View>  

                    <View style={{width:'25%', height: 100,alignItems: 'center', justifyContent:'center'}}>
                        <Image source ={{ uri: workUnit.img}} style={{
                                                width: workDoneUnitImageWidth,
                                                height: 90,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: 'black'
                        }}/>
                    </View>  

                    <View style={{position: 'absolute', minWidth: 34, height: 30, borderRadius: 5, borderWidth: 1, backgroundColor: 'lightgrey',alignItems: 'center', justifyContent: 'center', top: -29, left: 5, paddingHorizontal: (index+1) > 9 ? 4 : 0}}>
                        
                        <Text style={{fontSize: 19, fontWeight: '600'}}>
                           # {index + 1}
                        </Text>

                    </View>

                    {workUnit.paid >= workUnit.price  &&  workUnit.price !== 0 &&
                        <Image source ={require('../../assets/ok.png')} style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
                            position: 'absolute',
                            top: -15, 
                            right: -4,
                            borderWidth: 1,
                            borderColor: 'black'       
                        }}/>
                    }

                  </View>
                    
                </TouchableOpacity> )}



                {currentUser._id !== runningCaseData.caseOwner && <View style={{width: '100%', marginBottom: 10, marginTop: 10, paddingVertical: 10,}}>
          
                    <TouchableOpacity onPress={showAddDoneWork} style={{width: '70%',  height: 50, alignItems: 'center', justifyContent:'center', flexDirection: 'row', backgroundColor: 'lightgrey', borderRadius: 10, borderWidth: 1, alignSelf: 'center'}}>
                        <Text style={{fontSize: 25}}>
                        +
                        </Text>

                        <Text style={{fontSize: 20, marginLeft: 20}}>
                        Добавить работу
                        </Text>
                    </TouchableOpacity>
                    
                </View>}
                
            </View>
                
        }    


        { workKind === "VISIT" && 
                
            <View>
                
            {wokers.map((workUnit, index) => 
                    
                <TouchableOpacity onPress={() => {currentUser._id == runningCaseData.caseOwner ?  (setCurrentWorker({...workUnit, indx: index +1}), showWorker()) : (setDeletingWorker({...workUnit,indx: index+1}), showDeleteWorker()) }} key = {workUnit._id} style={{width:'98%', height: 115,flexDirection: 'row', alignItems: 'center', marginTop: 17, borderWidth:1, borderStyle:'dashed', alignSelf: 'center', marginBottom: index+1 === workDay.workers.length ? 10 : 0, paddingVertical: 2}}>

                    <View style={{width:'75%'}}>

                        <View style={{width:'90%', marginLeft: '10%', marginTop: 25}}>

                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{marginLeft: 17,color: 'black', fontWeight: 'bold'}}>
                                            Id:
                                        </Text>
                                        <Text style={{marginLeft: 3,fontSize: 13,fontWeight: '300', color: 'blue'}}>
                                        {workUnit._id}
                                        </Text>
                          </View>

                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: 'blue'}}>
                                    {workUnit.name}
                                </Text>

                                <Text style={{marginLeft: 5,fontSize: 16,fontWeight: '700', color: 'blue'}}>
                                    {workUnit.surname}
                                </Text>
                            </View>

                            

                        </View>

                        <View style={{ width:'100%', flexDirection: 'row'}}>

                            <View style={{width:'50%', height: 100}}>

                              
                                
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{marginLeft: 17}}>
                                            Прибыл:
                                        </Text>
                                        <Text style={{marginLeft: 10,fontSize: 17,fontWeight: '700', color: 'black'}}>
                                        {workUnit.enter}
                                        </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{marginLeft: 17}}>
                                            Отбыл:
                                        </Text>
                                        <Text style={{marginLeft: 10,fontSize: 17,fontWeight: '700', color: 'black'}}>
                                        {workUnit.leave}
                                        </Text>
                                    </View>



                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{marginLeft: 17}}>
                                            Цена:
                                        </Text>
                                        <Text style={{marginLeft: 10,fontSize: 19,fontWeight: '700', color: 'green'}}>
                                        {NormalizeNumHook(workUnit.price)}.00 руб. 
                                        </Text>
                                    </View>
                                
                            </View> 

                            <View style={{width:'50%', height: 80,alignItems: 'center'}}>
                                
                                    <Text>
                                        Работа принята:
                                    </Text>
                                    {workUnit.approved !== "YES" &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'red', marginTop: -3}}>
                                            НЕТ
                                        </Text>
                                    }

                                    {workUnit.approved === "YES" && workUnit.paid !== workUnit.price &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'orange', marginTop: -3}}>
                                            ДА
                                        </Text>
                                    }

                                    {workUnit.approved === "YES" && workUnit.paid === workUnit.price &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'green', marginTop: -3}}>
                                            ДА
                                        </Text>
                                    }
                            
                                
                                
                                    <Text>
                                        Оплачена:
                                    </Text>
                                    {workUnit.paid !== workUnit.price &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'red', marginTop: -3}}>
                                            НЕТ
                                        </Text>
                                    }

                                    {workUnit.paid === workUnit.price && workUnit.price <= 0 &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'red', marginTop: -3}}>
                                            НЕТ
                                        </Text>
                                    }

                                    {workUnit.paid === workUnit.price && workUnit.price > 0 &&
                                        <Text style={{fontSize: 16,fontWeight: '700', color: 'green', marginTop: -3}}>
                                            ДА
                                        </Text>
                                    }
                                
                            </View>  
                        </View>
                    </View>

                    <View style={{width:'25%', height: 100,alignItems: 'center', justifyContent:'center'}}>
                        <Image source ={{ uri: workUnit.img}} style={{
                                                width: workDoneUnitImageWidth,
                                                height: 90,
                                                borderRadius: 5,
                                                borderWidth: 1,
                                                borderColor: 'black'
                        }}/>
                    </View>  

                    <View style={{position: 'absolute', minWidth: 34, height: 30, borderRadius: 5, borderWidth: 1, backgroundColor: 'lightgrey',alignItems: 'center', justifyContent: 'center', top: -13, left: 5, paddingHorizontal: (index+1) > 9 ? 4 : 0}}>
                        
                        <Text style={{fontSize: 19, fontWeight: '600'}}>
                           # {index + 1}
                        </Text>

                    </View>

                    {workUnit.paid >= workUnit.price  &&  workUnit.price !== 0 &&
                        <Image source ={require('../../assets/ok.png')} style={{
                            width: 45,
                            height: 45,
                            borderRadius: 30,
                            position: 'absolute',
                            top: -15, 
                            right: -4,
                            borderWidth: 1,
                            borderColor: 'black'       
                        }}/>
                    }

                    
                    
                </TouchableOpacity> )}


                {currentUser._id !== runningCaseData.caseOwner && <View style={{width: '100%', marginBottom: 10, marginTop: 10, paddingVertical: 10,}}>
          
                    <TouchableOpacity onPress={showAddWorker} style={{width: '70%',  height: 50, alignItems: 'center', justifyContent:'center', flexDirection: 'row', backgroundColor: 'lightgrey', borderRadius: 10, borderWidth: 1, alignSelf: 'center'}}>
                        <Text style={{fontSize: 25}}>
                        +
                        </Text>

                        <Text style={{fontSize: 20, marginLeft: 20}}>
                        Добавить рабочего
                        </Text>
                    </TouchableOpacity>
                
                </View>}

             </View>
            }    
                    
        </ScrollView>

            


        <View style={{position:'absolute',bottom: 0 }}>
            <ProfileBar />
        </View>  
    </View>
    )
}


const styles = StyleSheet.create({
    caseTitle:{
        alignItems: 'center'
    },
    caseInfo:{
        right: 5,
        left: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    caseStatus:{
        flexDirection: 'row',
        minHeight: '15%',
        marginHorizontal: 3,
        backgroundColor: 'white',
        justifyContent: 'space-between'

    },
    memberCont:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    memberName:{
        fontSize: 12,
        fontWeight: 'bold'
    },
    caseMembers: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomNavigation:{
        position: 'absolute',
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        marginTop: 15,
        borderBottomWidth: 3, 
        borderTopWidth: 3, 
        paddingTop: 5, 
        paddingBottom: 5,
        borderColor: 'grey',
        bottom: 3
    },
    button:{
        right: 5,
        left: 5,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'grey',
        borderWidth: 1,
        borderColor: 'black'
    },
    modalOne:{
     flex: 1,
     alignItems:'center',
     justifyContent: 'center',
     backgroundColor: '#00000099'
    },
    modalInner:{
      flexDirection: 'column',
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
      width: '90%',
      paddingVertical: 30
    },
    deni:{
       backgroundColor: 'red',
       minHeight: 40,
       borderRadius: 5,
       borderWidth: 2,
       alignItems: 'center',
       justifyContent: 'center',
       alignSelf:'center',
       marginTop: 15,
       borderColor: 'black'
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
    modalInnerDialog:{
       height: '95%',
       flexDirection: 'column',
       backgroundColor: 'white',
       margin: 10,
       borderRadius: 10,
       width: '95%'
      },
    inputDialog: {
        width: '70%',
        borderBottomWidth: 1,
        padding: 10
        
    },
    messageStyle: {
       flexDirection: 'row',
       backgroundColor: 'lightblue',
       borderTopEndRadius: 5,
       borderBottomEndRadius: 5, 
       borderTopWidth: 1, 
       borderRightWidth: 1,
       borderBottomWidth: 1, 
       marginTop: 15, 
       width:'90%', 
       marginRight: '10%', 
       paddingLeft: 5,
       padding: 10,
    },
    messageStyleOpponent:{
       flexDirection: 'row-reverse',  
       backgroundColor: 'lightgrey', 
       borderTopStartRadius: 5,
       borderBottomStartRadius: 5, 
       borderTopWidth: 1, 
       borderLeftWidth: 1,
       borderBottomWidth: 1,
       marginTop: 10, 
       width:'90%', 
       marginRight: '10%', 
       alignItems: 'center',
       paddingLeft: 5,
       padding: 10,
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
})
