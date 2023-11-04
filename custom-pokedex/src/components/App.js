import React, { useRef, useEffect, useState } from 'react';
import {Routes, Route, Navigate, Outlet} from 'react-router-dom';
import { PokedexPage } from './Pokedex';
import { PokeStats } from './PokeStats';
import { ShopPage } from './Shop.js';
import { BuiltGame } from './Game.js';
import { NavBar } from './Nav';
import { DropdownMenu } from './Dropdown';
import { SignInPage } from "./SignIn"
import { CollectionView } from './shop-components/CollectionPage';
import { FooterDescription } from './Footer';

import { getAuth, onAuthStateChanged} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, onValue } from "firebase/database";
import { ErrorPage } from './ErrorPage';

const firebaseConfig = {
  apiKey: "AIzaSyC3KScgIPT-nSaPe_-x1VZrXWqqSFBcBZU",
  authDomain: "info340-wkxdavid-pokedex.firebaseapp.com",
  projectId: "info340-wkxdavid-pokedex",
  storageBucket: "info340-wkxdavid-pokedex.appspot.com",
  messagingSenderId: "348980512353",
  appId: "1:348980512353:web:3e57943d26922bc45d4c20",
  measurementId: "G-Z6TB2PT5JV"
};

const INIT_USER = {"userId": null, "userName": "Log Out", "userImg": "/img/null.png"}

initializeApp(firebaseConfig);

export function App(props) {

    const [currentUser, setCurrentUser] = useState(INIT_USER);
    const [isLoading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [pokemonInfo, setPokemonInfo] = useState([]);
    const pokemonData = useRef([]);
    const [collectionPoke, setCollectionPoke] = useState([]);
    const [pokeCoins, setPokeCoins] = useState(0);

    useEffect(() => {
        onAuthStateChanged(getAuth(), function(firebaseUser) {
            if(firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            }
            else { //signed out
                console.log(firebaseUser);
                console.log("signed out!");
            }
        })
    }, [])

    useEffect(() => {
        setLoading(true);
        fetch('pokemon.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                pokemonData.current = [...data];
                pokemonData.current.forEach((pokemon) => {
                    pokemon.type1Img = "img/" + pokemon.type1 + ".png";
                    pokemon.type1SmallImg =  "img/sml-" + pokemon.type1 + ".png";
                    if (pokemon.type2 !== null) {
                        pokemon.type2Img = "img/" + pokemon.type2 + ".png";
                        pokemon.type2SmallImg =  "img/sml-" + pokemon.type2 + ".png";
                    }
                    pokemon.img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + pokemon.id + ".png"
                })
                setPokemonInfo([...pokemonData.current])
            })
            .catch(() => {
                setAlertMessage('Failed to fetch pokemon data. Try again later!')
            })
            .then(() => {
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        const db = getDatabase();
        const coinRef = ref(db, "userlist/" + currentUser.userId + "/coin");
        onValue(coinRef, function(snapshot) {
          const value = snapshot.val();
          setPokeCoins(value);
        });
    }, [currentUser.userId])

    useEffect(() => {
        const db = getDatabase();
        const pokeRef = ref(db, "userlist/" + currentUser.userId + "/collection");
        onValue(pokeRef, function(snapshot) {
            if (snapshot.val() !== null) {
                const allPokeObj = snapshot.val();
                const pokeKeys = Object.keys(allPokeObj);
                const pokeDisplay = pokeKeys.map((keyString) => {
                allPokeObj[keyString].key = keyString;
                return allPokeObj[keyString];
            })
            setCollectionPoke(pokeDisplay);
            }
        });
    }, [currentUser.userId]);

    const updateAlert = (newAlert) => {
        setAlertMessage(newAlert);
    }

    return (
        <div>
            <header>
                <DropdownMenu />
                <NavBar currentUser={currentUser}/>
            </header>
            <Routes>
                <Route path='sign-in' element={<SignInPage />} />
                <Route element={<ProtectedPage currentUser={currentUser} />} >
                    <Route path="about/:name?" element={<PokeStats data={pokemonInfo} />} />
                    <Route path="/" element={<PokedexPage data={pokemonInfo} alert={alertMessage} setAlert={updateAlert} isLoading={isLoading}/>} />
                    <Route path="shop" element={<ShopPage data={pokemonInfo} currentUser={currentUser} pokeCoins={pokeCoins}/>} />
                    <Route path="collection" element={<CollectionView data={collectionPoke} currentUser={currentUser} pokeCoins={pokeCoins}/>} />
                    <Route path="game" element={<BuiltGame pokemonData={pokemonInfo} currentUser={currentUser} pokeCoins={pokeCoins}/>} />
                    <Route path="/404" element={<ErrorPage />}/>
                    <Route path="*" element={<Navigate to="/404" />} />
                </Route>
            </Routes>
            <FooterDescription />
        </div>
    )
}

function ProtectedPage(props) {
  if(props.currentUser === null || props.currentUser.userId === null) {
    return <Navigate to="/sign-in"/>
  } else {
    return <Outlet />
  }
}