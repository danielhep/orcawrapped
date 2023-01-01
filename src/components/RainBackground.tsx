import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const dropAnimation = keyframes`
  0% {
    transform: translateY(0vh);
  }
  75% {
    transform: translateY(97vh);
  }
  100% {
    transform: translateY(97vh);
  }
`;

const Drop = styled.div<{
  animationDelay: number;
  animationDuration: number;
  offsetBottom: number;
  positionX: number;
  opacity: number;
}>`
  position: absolute;
  bottom: 100%;
  width: 15px;
  height: 120px;
  pointer-events: none;
  opacity: ${(p) => p.opacity};
  left: ${(p) => p.positionX}%;
  bottom: ${(p) => p.offsetBottom + 1 + 100}%;
  animation: ${dropAnimation} 0.5s linear infinite;
  animation-delay: ${(p) => p.animationDelay}s;
  animation-duration: ${(p) => p.animationDuration}s;
`;

const stemAnimation = keyframes`
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

const Stem = styled.div<{
  animationDelay: number;
  animationDuration: number;
  opacity: number;
}>`
  width: 1px;
  height: 60%;
  margin-left: 7px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.25)
  );
  opacity: ${(p) => p.opacity}
  animation: ${stemAnimation} 0.5s linear infinite;
  animation-delay: ${(p) => p.animationDelay}s;
  animation-duration: ${(p) => p.animationDuration}s;
`;

const splatAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(0);
  }
  90% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const Splat = styled.div<{ animationDelay: number; animationDuration: number }>`
  width: 15px;
  height: 10px;
  border-top: 2px dotted rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: ${splatAnimation} 0.5s linear infinite;
  animation-delay: ${(p) => p.animationDelay + p.animationDuration}s;
  animation-duration: ${(p) => p.animationDuration}s;
`;

export default function RainBackground() {
  const randomValues = Array.from({ length: 25 }).map(() => ({
    positionX: Math.floor(Math.random() * 100),
    offsetBottom: Math.floor(Math.random() * 20),
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() / 2 + 0.5,
    opacity: Math.random() / 2 + 0.5,
  }));

  const generateDrops = (): JSX.Element[] => {
    const drops = randomValues.map((vals, i) => {
      return (
        <Drop
          key={i}
          offsetBottom={vals.offsetBottom}
          animationDelay={vals.animationDelay}
          animationDuration={vals.animationDuration}
          opacity={vals.opacity}
          positionX={vals.positionX}
        >
          <Stem
            animationDelay={vals.animationDelay}
            opacity={vals.opacity}
            animationDuration={vals.animationDuration}
          />
          <Splat
            animationDelay={vals.animationDelay}
            animationDuration={vals.animationDuration}
          />
        </Drop>
      );
    });
    return drops;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      {generateDrops(1)}
    </div>
  );
}
