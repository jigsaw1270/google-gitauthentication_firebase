import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const gitprovider = new GithubAuthProvider();

    const handlegoogleSignin = () => {
        signInWithPopup(auth,provider)
        .then(result =>{
            const loggedinUser = result.user;
            console.log(loggedinUser);
            setUser(loggedinUser);
        })
        .catch(error => {
            console.log('error', error.message)
        })
    }

        const handleSignout = () => {
              signOut(auth)
            .then (result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
        }

        const handlegithubSignin = () => {
            signInWithPopup(auth, gitprovider)
            .then( result => {
                const loggInuser = result.user;
                console.log(loggInuser);
                setUser(loggInuser);
            })
            .catch(error => {
                console.log(error)
            })
        }
    
    return (
        <div>
       {
        user ?
        <button onClick={handleSignout}>Sign out</button> :
           <div>
           <button onClick={handlegoogleSignin}>Google log in</button>
            <button onClick={handlegithubSignin}>Github login</button>
           </div>
       }

           { user &&
            <div>
                <h1>{user.displayName}</h1>
                <p>Email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
           }
        </div>
    );
};

export default Login;