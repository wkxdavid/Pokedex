import React from 'react';

import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'; //install option 1


const firebaseUIConfig = {
  signInOptions: [
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
    GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    }
  }
}

//Can make Default
export function SignInPage(props) {

  return (
    <div>
      <div>
        <StyledFirebaseAuth
          uiConfig={firebaseUIConfig}
          firebaseAuth={getAuth()}  />
      </div>
    </div>
  )
}