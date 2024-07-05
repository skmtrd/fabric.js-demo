import type fabric from 'fabric';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [shapes, setShapes] = useState<{ [key: string]: fabric.Object }>({});

  useEffect(() => {
    const loadFabric = async () => {
      const fabric = await import('fabric');

      if (canvasRef.current && fabricCanvasRef.current === null) {
        // Canvasの初期化
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
      }
    };

    loadFabric();

    // クリーンアップ関数
    return () => {
      if (fabricCanvasRef.current !== null) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  const addShapes = async () => {
    const fabric = await import('fabric');

    if (fabricCanvasRef.current !== null) {
      // 正方形の作成と追加
      const square = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 100,
        height: 100,
        selectable: true,
        stroke: 'black',
        strokeWidth: 2,
      });
      fabricCanvasRef.current.add(square);

      // 正三角形の作成と追加
      const triangle = new fabric.Triangle({
        left: 300,
        top: 100,
        fill: 'green',
        width: 100,
        height: 100,
        selectable: true,
        stroke: 'black',
        strokeWidth: 2,
      });
      fabricCanvasRef.current.add(triangle);

      // 正円の作成と追加
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        fill: 'red',
        radius: 50,
        selectable: true,
        stroke: 'black',
        strokeWidth: 2,
      });
      fabricCanvasRef.current.add(circle);

      // テキストボックスの作成と追加
      const textbox = new fabric.Textbox('Hello, Fabric.js!', {
        left: 400,
        top: 300,
        width: 200,
        fontSize: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 1,
        backgroundColor: 'lightgray',
        borderColor: 'black',
        editable: false,
      });
      fabricCanvasRef.current.add(textbox);

      // 図形のリファレンスを保存
      setShapes({ square, triangle, circle, textbox });
    }
  };

  const resizeShape = (shapeKey: string, width: number, height: number) => {
    if (shapes[shapeKey]) {
      shapes[shapeKey].set({ width, height });
      shapes[shapeKey].setCoords();
      fabricCanvasRef.current?.renderAll();
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={addShapes}>図形を追加</button>
      <button onClick={() => resizeShape('square', 150, 150)}>正方形を大きくする</button>
      <button onClick={() => resizeShape('triangle', 150, 150)}>三角形を大きくする</button>
      <button onClick={() => resizeShape('circle', 75, 75)}>円を大きくする</button>
      <canvas ref={canvasRef} width="800" height="600" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Home;
