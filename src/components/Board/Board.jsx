import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Board.module.css';
import { DiceRoller } from "../";

const CELL_SIZE = 60;

export default function Board({
  gridVisible,
  snapToGrid,
  measurement,
  setMeasurement,
  sides,
}) {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const boardRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (boardRef.current) {
      const { width, height } = boardRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.ceil(width / CELL_SIZE) * CELL_SIZE,
        height: Math.ceil(height / CELL_SIZE) * CELL_SIZE,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [updateDimensions]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isMeasuring || !startPos) return;
      const rect = boardRef.current.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      const snap = (value) =>
        snapToGrid ? Math.round(value / CELL_SIZE) * CELL_SIZE : value;

      x = snap(x);
      y = snap(y);

      setEndPos({ x, y });

      const dx = (x - startPos.x) / CELL_SIZE;
      const dy = (y - startPos.y) / CELL_SIZE;
      const squares = Math.sqrt(dx * dx + dy * dy);
      const feet = (squares * 5).toFixed(1);
      setMeasurement(feet);
    },
    [isMeasuring, snapToGrid, startPos, setEndPos, setMeasurement]
  );

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    const rect = boardRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const snap = (value) =>
      snapToGrid ? Math.round(value / CELL_SIZE) * CELL_SIZE : value;

    x = snap(x);
    y = snap(y);

    setStartPos({ x, y });
    setEndPos({ x, y });
    setIsMeasuring(true);
  };

  const handleMouseUp = useCallback(() => {
    if (isMeasuring) {
      setIsMeasuring(false);
      setTimeout(() => {
        setMeasurement(null);
        setStartPos(null);
        setEndPos(null);
      }, 2000);
    }
  }, [isMeasuring, setMeasurement, setStartPos, setEndPos]);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    board.addEventListener("mousemove", handleMouseMove);
    board.addEventListener("mouseup", handleMouseUp);
    board.addEventListener("mouseleave", handleMouseUp);

    return () => {
      board.removeEventListener("mousemove", handleMouseMove);
      board.removeEventListener("mouseup", handleMouseUp);
      board.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const renderMeasurement = useCallback(() => {
    if (!startPos || !endPos) return null;

    return (
      <>
        <circle
          cx={startPos.x}
          cy={startPos.y}
          r={5}
          className={styles.measurementStartDot}
        />

        <circle
          cx={endPos.x}
          cy={endPos.y}
          r={5}
          className={styles.measurementEndDot}
        />
        <line
          x1={startPos.x}
          y1={startPos.y}
          x2={endPos.x}
          y2={endPos.y}
          className={styles.measurementLine}
          strokeWidth="2"
        />
        {measurement && (
          <text
            x={(startPos.x + endPos.x) / 2}
            y={(startPos.y + endPos.y) / 2 - 5}
            className={styles.measurementText}
            textAnchor="middle"
          >
            {measurement} ft
          </text>
        )}
      </>
    );
  }, [startPos, endPos, measurement]);

  const renderGrid = useCallback(() => {
    if (!gridVisible) return null;

    return (
      <>
        <pattern
          id="grid"
          width={CELL_SIZE}
          height={CELL_SIZE}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${CELL_SIZE} 0 L 0 0 0 ${CELL_SIZE}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.3"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </>
    );
  }, [gridVisible]);

  return (
    <div className={styles.boardContainer}>
      <div
        ref={boardRef}
        className={styles.board}
        onMouseDown={handleMouseDown}
        style={{ cursor: isMeasuring ? "crosshair" : "default" }}
      >
        <svg
          className={styles.gridSvg}
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          {renderGrid()}
          {renderMeasurement()}
        </svg>
      </div>

      <DiceRoller sides={sides} className={styles.diceOverlay}/>
    </div>
  );
}