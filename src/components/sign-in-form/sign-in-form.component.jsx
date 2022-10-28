import { useState } from "react";
//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';
import {
  signInWithGooglePopup,
  //  auth,
  //  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component.jsx'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = ()=>{
    setFormFields(defaultFormFields);
  }

  // PARA USAR EL MÉTODO DE LOGUEO GOOGLE REDIRECT
  // async function funcion (){
  //   const response = await getRedirectResult(auth);
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // }
  // useEffect(()=>{
  //   funcion();
  // }, []);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();

    } catch (error) {
      switch(error.code){

      }
      if(error.code === "auth/wrong-password"){
        alert('incorrect password for email')
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="E-mail" email="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <div className="buttons-container">
        <Button type="submit">Sign In</Button>
        <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;