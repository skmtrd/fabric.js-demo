import { useEffect, useRef } from 'react';
import styles from './index.module.css';

const Home = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const loadFabric = async () => {
      const fabric = await import('fabric');

      if (canvasRef.current && !fabricCanvasRef.current) {
        // Canvasの初期化
        fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
      }
    };

    loadFabric();

    // クリーンアップ関数
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  const addShapes = () => {
    const fabric = require('fabric');

    if (fabricCanvasRef.current) {
      // 正方形の作成と追加
      const square = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'blue',
        width: 100,
        height: 100,
        selectable: false, // 操作不可能に設定
        stroke: 'black', // 枠線の色を設定
        strokeWidth: 2, // 枠線の太さを設定
      });
      fabricCanvasRef.current.add(square);

      // 正三角形の作成と追加
      const triangle = new fabric.Triangle({
        left: 300,
        top: 100,
        fill: 'green',
        width: 100,
        height: 100,
        selectable: false, // 操作不可能に設定
        stroke: 'black', // 枠線の色を設定
        strokeWidth: 2, // 枠線の太さを設定
      });
      fabricCanvasRef.current.add(triangle);

      // 正円の作成と追加
      const circle = new fabric.Circle({
        left: 200,
        top: 200,
        fill: 'red',
        radius: 50,
        selectable: false, // 操作不可能に設定
        stroke: 'black', // 枠線の色を設定
        strokeWidth: 10, // 枠線の太さを設定
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
        editable: false, // 編集不可能に設定
      });
      fabricCanvasRef.current.add(textbox);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={addShapes}>図形を追加</button>
      <canvas ref={canvasRef} width="800" height="600" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default Home;
