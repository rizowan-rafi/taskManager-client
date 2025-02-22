import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../firebase/firebase.init";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const signInWithGoogle
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // sign in using google auth
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    // update Profile
    const updateUserProfile = (Name) => {
        return updateProfile(auth.currentUser, {
            displayName: Name,
        });
    };

    // signOut user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth).then((res) => {
            setUser(null);
            setLoading(false);
        });
    };

    // to monitor state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // console.log(user.displayName, user.email)
                
                setLoading(false);
            } else {
                // User is signed out
                // ...
                // setLoading(false)
                setLoading(false);
            }
        });

        return () => {
            return unsubscribe();
        };
    }, []);

    const info = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        signInWithGoogle,
    };
    return <authContext.Provider value={info}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {};

export default AuthProvider;
