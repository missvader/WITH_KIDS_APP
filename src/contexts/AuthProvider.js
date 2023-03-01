import { createContext,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successLoginSignUp , msgError, logOutMsg, warningPassword} from '../utils/messages'
import {
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {  setDoc, doc} from "firebase/firestore";
import {auth, db} from "../firebase/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  
  const navigate= useNavigate();
  //SIGNUP
  const signUp = async(email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("userCredential", userCredential)
      updateProfile(auth.currentUser, {
        displayName:username,
      });
      successLoginSignUp('Registre completat')
      const user = userCredential.user;
      console.log('user -> ', user)
      sessionStorage.setItem('Auth Token', user.stsTokenManager.refreshToken)
      await setDoc(doc(db, 'users', user.uid), {
        email, 
        username,
        favoritesBiblio: [],
        favoritesAgenda: [],
        favoritesRestaurants:[]
      });
      navigate('/profile')
      return true
    }catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === 'auth/weak-password'){
        warningPassword('Password is too weak');
      }else {
        msgError(errorMessage);
      }
      console.log(error)
    }
  };
  //LOGIN
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      successLoginSignUp('Usuari correcte')
      const user = userCredential.user;
      sessionStorage.setItem('Auth Token', user.stsTokenManager.refreshToken)
      navigate('/profile');
      return true
    } catch(error) {
      msgError(error.message)
    };
  };
  //SIGNOUT
  const logOut = async() => {
    try {
      await signOut(auth)
      logOutMsg()
      navigate('/')
      return true
    }catch(error) {return false}
  };
  //esta funcion de firebase va a estar revisando cada vez que haya un cambio de sesión
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('loading...')
      if (user) {
        console.log("state=signed in")
        setCurrentUser(user);
        
      } else {
        console.log("state=signed out")
        setCurrentUser(null);
      }
    });
    console.log('currentUser es=>',currentUser)
  },[currentUser]);
  
  return (
    <AuthContext.Provider value={{ 
      currentUser,
      setCurrentUser,
      signIn,
      signUp,
      logOut,
      email, setEmail,
      username, setUsername,
      password,setPassword,
      error, setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};