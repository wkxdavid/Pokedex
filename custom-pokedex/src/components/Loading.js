import React from 'react';

export function LoadingScreen(props) {
  return (
    <div className="loading">
      <p>Fetching pokemon data. Please wait</p>
      <img src="img/loading.gif" alt="running pikachu"/>
    </div>
  )
}