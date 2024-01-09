'use client';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square({playingPlayer,setPlayingPlayer,newGame,setNewGame,plays,setPlays,row,col,anyWinner}) {
  // Reset squares by calling useEffect on newGame
  useEffect(()=>{
    if (newGame){
      setClear(true)
      }
    }, [newGame])
  
  // Tracking if square is clear or not
  const [clear, setClear] = useState(true)

  // Handle square click, change square text and set clear on false
  const handleSquareClick = function (){
    if (clear && !(anyWinner)){
      let arra = plays
      arra[row][col] = playingPlayer
      setPlays(arra)
      if (playingPlayer === 'X'){
        setPlayingPlayer('O')
      }
      else if (playingPlayer === 'O'){
        setPlayingPlayer('X')
      }
    setClear(false)
    }
  }
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={handleSquareClick}>
      {plays[row][col]}
    </div>
  );
}

function Board() {
  // Tracking game plays for every player
  const [plays, setPlays] = useState([['','',''],['','',''],['','','']])

  //Tracking winner
  const [winner, setWinner] = useState(null)

  // Defining function for checking winner
  function checkWinner(){
    if(plays[0][0] === 'X' && plays[0][1] === 'X' && plays [0][2] === 'X'){
      return 'X'
    }
    else if(plays[0][0] === 'O' && plays[0][1] === 'O' && plays [0][2] === 'O'){
      return 'O'
    }
    else if(plays[1][0] === 'X' && plays[1][1] === 'X' && plays [1][2] === 'X'){
      return 'X'
    }
    else if(plays[1][0] === 'O' && plays[1][1] === 'O' && plays [1][2] === 'O'){
      return 'O'
    }
    else if(plays[2][0] === 'X' && plays[2][1] === 'X' && plays [2][2] === 'X'){
      return 'X'
    }
    else if(plays[2][0] === 'O' && plays[2][1] === 'O' && plays [2][2] === 'O'){
      return 'O'
    }
    else if(plays[0][0] === 'X' && plays[1][0] === 'X' && plays [2][0] === 'X'){
      return 'X'
    }
    else if(plays[0][0] === 'O' && plays[1][0] === 'O' && plays [2][0] === 'O'){
      return 'O'
    }
    else if(plays[0][1] === 'X' && plays[1][1] === 'X' && plays [2][1] === 'X'){
      return 'X'
    }
    else if(plays[0][1] === 'O' && plays[1][1] === 'O' && plays [2][1] === 'O'){
      return 'O'
    }
    else if(plays[0][2] === 'X' && plays[1][2] === 'X' && plays [2][2] === 'X'){
      return 'X'
    }
    else if(plays[0][2] === 'O' && plays[1][2] === 'O' && plays [2][2] === 'O'){
      return 'O'
    }
    else if(plays[0][0] === 'X' && plays[1][1] === 'X' && plays [2][2] === 'X'){
      return 'X'
    }
    else if(plays[0][0] === 'O' && plays[1][1] === 'O' && plays [2][2] === 'O'){
      return 'O'
    }
    else if(plays[0][2] === 'X' && plays[1][1] === 'X' && plays [2][0] === 'X'){
      return 'X'
    }
    else if(plays[0][2] === 'O' && plays[1][1] === 'O' && plays [2][0] === 'O'){
      return 'O'
    }
    return null
  }

  // Tracking playing player
  const [playingPlayer, setPlayingPlayer] = useState('X')

  // Tracking if game is new or not
  const [newGame, setNewGame] = useState(true)

  //Tracking if is any winner
  const [anyWinner, setAnyWinner] = useState(false)

  // Reset game by calling useEffect on newGame
  useEffect(()=>{
    if (newGame){
      setNewGame(false)
      setPlayingPlayer('X')
      setPlays([['','',''],['','',''],['','','']])
      setWinner(null)
      setAnyWinner(false)
      }
    }, [newGame])
  
  //Checking winner for every play
  useEffect(()=>{
    if (checkWinner()){
      setAnyWinner(true)
      setWinner(checkWinner())
      }
    }, [playingPlayer])
  
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{playingPlayer}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner?winner:'None'}</span></div>
      <button style={buttonStyle} onClick={()=>{setNewGame(true)}}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={0} col={0}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={0} col={1}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={0} col={2}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={1} col={0}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={1} col={1}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={1} col={2}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={2} col={0}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={2} col={1}/>
          <Square playingPlayer={playingPlayer} setPlayingPlayer={setPlayingPlayer} newGame={newGame} setNewGame={setNewGame} plays={plays} setPlays={setPlays} anyWinner={anyWinner} row={2} col={2}/>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
