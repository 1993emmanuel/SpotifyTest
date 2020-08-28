import React, {useEffect, useState} from 'react';
import './App.css';
import Login from './Login'
import {getTokenFromUrl} from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'
import {useDataLayerValue } from './DataLayer'

const spotify = new SpotifyWebApi()

function App() {

  // const [token, setToken] = useState(null)
  const [{user, token}, dispatch] = useDataLayerValue()

  // ejecuta un codigo basase a una condicion
  useEffect( ()=>{
    //Codigo......
    const hash = getTokenFromUrl()
    window.location.hash=""
    const _token = hash.access_token

    if(_token){
      dispatch({
        type : 'SET_TOKEN',
        token : _token
      })
      spotify.setAccessToken(_token)
      spotify.getMe().then((user) =>{
        dispatch({
          type : 'SET_USER',
          user : user
        })
      })

      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type : 'SET_PLAYLISTS',
          playlists : playlists
        })
      })

      spotify.getPlaylist('37i9dQZEVXcJZyENOWUFo7').then(response=>{
         dispatch({
           type : 'SET_DISCOVER_WEEKLY',
           discover_weekly : response
         })
      })

    }//final del if

  },[])

  return (
    <div className="app">
      {/* <h1>hola estamos construyendo Spofity clone!!!!!</h1> */}

      {
        token ? ( 
            <Player spotify={spotify} />
         ) : ( <Login/> )
      }

      

    </div>
  );
}

export default App;
