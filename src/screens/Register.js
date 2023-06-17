import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Alert,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [securityId, setSecurityId] = useState("");
  const [address, setAdress] = useState("");
  const [type, setType] = useState("");

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert("Invalid Details", "Please fill all the details", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    createUserWithEmailAndPassword(auth, email, password).then(
      (UserCredential) => {
        const user = UserCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;
        console.log(user), console.log(UserCredential);
        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          password: password,
          adsoyad: nameSurname,
          phone: phone,
          kimlik:securityId,
          address:address,
          type:type,
          
        });
      }
    );
  };

  const navigation = useNavigation();
  function renderHeaderImage() {
    return (
      <View
        style={{
          marginBottom: 15,
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/calendar.gif")}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <TextInput
          style={styles.input}
          onChangeText={setNameSurname}
          value={nameSurname}
          placeholder="isim soyisim orn:Fevzi Berat Durdağı"
        />
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
          placeholder="Sifre"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          placeholder="Telefon No Exp:5555555555"
          keyboardType="numeric"
          maxLength={11}
        />
        <TextInput
          style={styles.input}
          onChangeText={setSecurityId}
          value={securityId}
          placeholder="Kimlik No Exp:111111111111"
          keyboardType="numeric"
          maxLength={11}
        />
        <TextInput
          style={styles.input}
          onChangeText={setAdress}
          value={address}
          placeholder="adress orn:Göztepe Mah"
        />
        <TextInput
          style={styles.input}
          onChangeText={setType}
          value={type}
          placeholder=" Cinsiyet Exp:male"
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <>
        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.textTitle}>Kayıt Ol</Text>
        </Pressable>

        <Pressable
          style={{
            width: 250,
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ ...styles.textTitle, color: "black",marginBottom:15 }}>
            Hesabın var mı ? Giris Yap
          </Text>
        </Pressable>
      </>
    );
  }

  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {renderHeaderImage()}

          {renderInput()}
          {renderButton()}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    height: 48,
  },
  button: {
    marginVertical: 10,
    borderRadius: 12,
    marginLeft: "auto",
    marginRight: "auto",

    backgroundColor: "blue",
    width: 300,
    alignItems: "center",
    height: 40,
    justifyContent: "center",
  },
  textTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});
