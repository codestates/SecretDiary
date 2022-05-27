import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';

const colors = [
  "red",
  "green",
  "yellow",
  "black",
  "blue",
  "orange",
  "purple",
  "silver",
  "gold",
]

export default function Canvasdraw() {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [lastPosition, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (canvasRef.current) {
      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x, y) => {
    if (mouseDown) {
      ctx.current.beginPath();
      ctx.current.strokeStyle = selectedColor;
      ctx.current.lineWidth = 10;
      ctx.current.lineJoin = 'round';
      ctx.current.moveTo(lastPosition.x, lastPosition.y);
      ctx.current.lineTo(x, y);
      ctx.current.closePath();
      ctx.current.stroke();

      setPosition({
        x,
        y
      })
    }
  }, [lastPosition, mouseDown, selectedColor, setPosition])

  const download = async () => {
    const image = canvasRef.current.toDataURL('image/png');
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  }

  const clear = () => {
    ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
  }

  const onMouseDown = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
    setMouseDown(true)
  }

  const onMouseUp = (e) => {
    setMouseDown(false)
  }

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY)
  }

  
  // const handleSaveClick = () => {
  //   download();
  //   const data = firstCanvas.current.getSaveData();
  // }


  return (
    <Main>
    <div className="App">
      <canvas
        style={{
          border: "3px solid #000"
        }}
        width={1370}
        height={500}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <br />
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      >
        {
          colors.map(
            color => <option key={color} value={color}>{color}</option>
          )
        }
      </select>
     
      <Button onClick={clear}>Clear</Button>
      <Button onClick={download}>Download</Button>
      
    </div>
    </Main>
  );
}



const Main = styled.div`
	height: 100%;
	margin: 1rem 1rem 1rem 1rem;
	display: flex;
	flex-direction: column;
	@media only screen and (max-width: 480px) {
		height: 80%;
	}
`;



// const Buttons = styled.div`
// 	flex-grow: 1;
// 	display: flex;
// 	justify-content: flex-end;
// `;

const Button = styled.button`
	border: 2px solid black;
	background: #f6f6ee;
	margin-right: 0.1rem;
  margin-left: 1rem;
	font-size: 0.8rem;
	font-weight: bold;
	:hover {
		cursor: pointer;
		background: black;
		color: #f6f6ee;
		transition: all 1s;
	}
	@media only screen and (max-width: 480px) {
		font-size: 0.8rem;
	}
`;


