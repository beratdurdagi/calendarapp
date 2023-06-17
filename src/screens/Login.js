import { StyleSheet, Text, View ,SafeAreaView,TextInput,Pressable, Image} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { KeyboardAvoidingView } from "react-native";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((UserCredential) => {
      const user = UserCredential._tokenResponse.email;
      const myuserId = auth.currentUser.uid;
    });
  };
  
  function renderHeaderImage(){
    return(  <View style={{marginBottom:15,marginTop:50,alignItems:'center',justifyContent:'center'}}>
      <Image source={require("../../assets/calendar.gif")} style={{width:'100%',height:300 }} resizeMode="contain"/>
    </View>)
  
  }

  function renderInput(){
    return(
   <>
    <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="e-mail orn:orn@gmail.com"
   
      />
        <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
       
      />
   </>
    )
  }
  function renderButton(){
    return(
      <>
            
            <Pressable
         style={styles.button}
      
          onPress={login}>
            <Text style={styles.subTitle}>Giris Yap</Text>
            </Pressable>
          
        
        
        <Pressable style={styles.button}
    
     onPress={() => navigation.navigate("Register")}
    
   >
     <Text style={styles.subTitle}>Kayıt Ol</Text>
    </Pressable></>
    )
  }
  return (
    
    <SafeAreaView >
      {renderHeaderImage()}
      <KeyboardAvoidingView>
        <>
        {renderInput()}
        {renderButton()}
        </>
      </KeyboardAvoidingView>
      
       
   
       


   </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal:15,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:15,
    height:48
  },
  button:{
    marginVertical:10,
    borderRadius:12,
    marginLeft:'auto',
    marginRight:'auto',
    backgroundColor:'blue',
    borderWidth:0.5,
    shadowOffset:{
      x:5,y:3


    },
    elevation:11,
    shadowOpacity:0.5,
    
    width:300,
    alignItems:'center',
    height:48,
    justifyContent: 'center',

  },
  subTitle:{
    color:'white',
    fontSize:17,
    fontWeight:'700'

  }
});

