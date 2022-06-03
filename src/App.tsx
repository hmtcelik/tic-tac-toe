import React, { useEffect, useState } from 'react';
import Navbar from './layout/Navbar';

function App() {
  const [turn, setTurn] = useState("X");
  const [array, setArray] = useState([
    "","","",
    "","","",
    "","","",
  ]);
  const [winner, setWinner] = useState("");
  const [pause, setPause] = useState(false);

  useEffect(()=>{   
    //if winner is not exist and array is full
    if(winner === "" && !array.includes("") ){
      setWinner("nobody");
      setPause(true);
    }
  })

  const handleWinner = (array:Array<string>) =>{
    let winner:string = turn;
    //checking horizontal
    for (let i=0;i<9;i+=3){
      if(array[i] === array[i+1] && array[i] === array[i+2] && array[i] !== ""){
        setWinner(winner);
        setPause(true);
      }
    }
    //checking vertical
    for (let i=0;i<3;i++){
      if(array[i] === array[i+3] && array[i] === array[i+6] && array[i] !== ""){
        setWinner(winner);
        setPause(true);
      }
    }  
    //checking diagonal
    for (let i=0;i<3;i+=2){
      if(array[i] === array[4] && array[i] === array[8-i] && array[i] !== ""){
        setWinner(winner);
        setPause(true);
      }
    }
  }
  
  const handlePlayAgain = () =>{
    setArray([
      "","","",
      "","","",
      "","","",
    ]);
    setWinner("");
    setTurn("X");
    setPause(false);
  }
  
  const handleClick = (i:number)  =>{
    if(pause) return;
    let newArray:Array<string> = [...array];
    if (turn === "X" && array[i] === ""){
      newArray[i] = "X";
      setTurn("O");  
    } 
    else if (turn === "O" && array[i] === ""){
      newArray[i] = "O";
      setTurn("X");
    }
    handleWinner(newArray);
    setArray(newArray);
  }

  const Cell = (props:any) =>{
    let i:number = props.num;
    return(
      <td onClick={()=>handleClick(i)}><h2>{array[i]}</h2></td>
    );
  }
  
  return (
    <>
      <Navbar/>
      <a className="github-fork-ribbon" href="https://github.com/hmtcelik/tic-tac-toe" data-ribbon="Fork me on GitHub" title="Fork me on GitHub"  target="_blank" rel="noopener noreferrer" >Fork me on GitHub</a>
      <div className="container">
          <h1>Turn: {turn}</h1>
      </div>
      <div className='container'>
          <table>
            <tbody>
              <tr>
                <Cell num={0}/>
                <Cell num={1}/>
                <Cell num={2}/>
              </tr>
              <tr>
                <Cell num={3}/>
                <Cell num={4}/>
                <Cell num={5}/>
              </tr>
              <tr>
                <Cell num={6}/>
                <Cell num={7}/>
                <Cell num={8}/>
              </tr>
            </tbody>
          </table>
      </div>
      {winner &&
      <div>
        <div className="container">
          <h2 className='winner'>Winner: {winner}</h2>
        </div>
        <div className="container">
          <button className='play-button' onClick={()=>handlePlayAgain()}>play again</button>
        </div>
      </div>
      }
    </>
  );
}

export default App;