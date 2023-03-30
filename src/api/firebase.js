import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var fire = {db: firestore}

var auth = undefined;
var firestore = undefined;
var analytics = undefined;

fire.initApp = () => {

    // const firebaseConfig = {
    //     apiKey: "AIzaSyBLUhdnTnUzPIpEeccA040FODk9X0lKE4w",
    //     authDomain: "bindrake-ddcfa.firebaseapp.com",
    //     projectId: "bindrake-ddcfa",
    //     storageBucket: "bindrake-ddcfa.appspot.com",
    //     messagingSenderId: "912905037047",
    //     appId: "1:912905037047:web:ef36cceadc7d44bd8a1ff2",
    //     measurementId: "G-TGTDPTLRR8"
    //     };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  // const analytics = firebase.getAnalytics(app);

  auth = firebase.auth();
  firestore = firebase.firestore();
  analytics = firebase.analytics();
  return {app};
}

fire.authUser = () => {
  return firebase.auth();
}

fire.getPerson = async (email) => {
    const usersRef = firestore.collection('Users').doc(email);
    const person = (await usersRef.get()).data();
    return person;
}

fire.getUserData = async (email) => {
  const userRef = firestore.collection('Users').doc(email)
  const user = (await userRef.get()).data();
  return user
}

fire.signIn = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password)
        // Signed in 
        const user = userCredential.user;
        const res = {user, state: true};
        console.log(res)
        return res;
    }
    catch(error){
        const errorMessage = error.message;
        const res = {user: errorMessage, state: false};
        console.log(res);
        return res;
    };
}

fire.SignInGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const res = await auth.signInWithPopup(provider);
  const usersRef = firestore.collection('Users');

  const user = auth.currentUser;
  const userData = await fire.checkExistingUser(usersRef.doc(user.email));

  if (userData){
        console.log("Found userData");
        return userData;
  }
  else{
    console.log("Creating user from google register");
    await fire.createUser();
    const ref = usersRef.doc(res.email);
    const found = await ref.get();
    return found; 
  }
}

fire.SignOut = () => {
  auth.signOut();
  console.log("sign out called");
}

fire.checkExistingUser = async (ref) => {
	//if exists: user data, else returns 'undefined'
  	const result = await ref.get();
  	return result.data();
}

fire.createUser = async () => {
    const user = auth.currentUser;
    const userRef = firestore.collection('Users').doc(user.email);
    const {email, emailVerified} = user;
    console.log(email, emailVerified);
    if(!emailVerified) {
        await fire.verificationMail();
    }
    return await userRef.set({
        email
    });
}

fire.registerUser = async (email, password) => {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        // Signed in 
        const user = userCredential.user;
        await fire.createUser();
        const res = {user, state: true};
        console.log(res);
        return res;

    } catch(error) {
        const errorMessage = error.message;
        const res = {user: errorMessage, state: false};
        console.log(res);
        return res;
    };
}

fire.verificationMail = async () => {
    await auth.currentUser.sendEmailVerification();
}

fire.passwordReset = async (email) => {
    try{
        await auth.sendPasswordResetEmail(email);
        return {result: "Successfully sent password reset mail", state: true}
    }catch (error){
        return {result: error, state: false}
    }
}

export default fire;