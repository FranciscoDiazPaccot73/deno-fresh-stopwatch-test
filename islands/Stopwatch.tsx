/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div style={{
      fontSize: "100px",
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -55%)",
      width: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}>
      <div className="numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div style={{
        position: "absolute",
        top: "95%",
        left: "48.4%",
        transform: "translate(-51.6%, -45%)"
      }}>
        <button 
          style={{
            width: '60px',
            margin: '16px 6px'
          }}
          disabled={!IS_BROWSER} onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
        <button 
          style={{
            width: '60px',
            margin: '16px 6px'
          }}
          disabled={!IS_BROWSER || running || time === 0} onClick={() => setTime(0)}>Reset</button>       
      </div>
    </div>
  );
}
