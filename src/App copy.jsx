import { useState, useEffect, useRef } from 'react';
import Draggable from "react-draggable";
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  // tables states
  const [tables, setTables] = useState(
    [
      {
        id: 1,
        name: "Table 1"
      },
      {
        id: 2,
        name: "Table 2"
      },
      {
        id: 3,
        name: "Table 3"
      },
      {
        id: 4,
        name: "Table 4"
      },
      {
        id: 5,
        name: "Table 5"
      },
    ]
  );
  // postions states
  const [positions, setPositions] = useState({});

  const [hasLoaded, setHasLoaded] = useState(false);

  const nodeRef = useRef(null);

  useEffect(() => {
    setHasLoaded(false);
    const existingDivPositions = JSON.parse(
      localStorage.getItem("tables_positions")
    );
    setPositions(existingDivPositions);
    // setPositions({ "1": { "x": 244, "y": 17 }, "2": { "x": 274, "y": 251 }, "3": { "x": 524, "y": -157 }, "5": { "x": 510, "y": -48 } });
    setHasLoaded(true);
    // console.log(existingDivPositions);
    // console.log("has loaded");
  }, [positions]);


  const handleSave = () => {
    localStorage.setItem('tables_positions', JSON.stringify(positions));
  }

  // handleStop
  const handleStop = (e, data, id) => {
    // console.log(e.target.id);
    let dummyPositions = { ...positions };
    const itemId = id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  }

  // useEffect(() => {
  //   // setPositions(existingDivPositions);
  //   localStorage.setItem(`positions_div`, JSON.stringify(positions));
  // }, [positions]);
  return (
    <div className="App">

      <button onClick={() => handleSave()}>save</button>
      {
        // hasLoaded ? [
        tables && tables.map((item) => {
          return <Draggable
            key={item.id}
            onStop={(e, data) => handleStop(e, data, item.id)}
            position={null}
            nodeRef={nodeRef}
            defaultPosition={
              positions === null ? { x: 0, y: 0 } :
                !positions[item.id] ? { x: 0, y: 0 } :
                  { x: positions[item.id].x, y: positions[item.id].y }
            }
          >
            <div ref={nodeRef} id={item.id} className='table-style'>{item.name}</div>
          </Draggable>
        })
        // ] : 'data is loading...'

      }
    </div>
  )
}

export default App





