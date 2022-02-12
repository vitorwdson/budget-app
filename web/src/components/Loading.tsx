import styled, { keyframes } from 'styled-components';

const Rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const Loading = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--dark-color);
  z-index: 100;
  pointer-events: none;

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    border: 1rem solid var(--bright-color);
    border-top-color: var(--foreground-color);
    border-radius: 50%;
    width: min(40vmin, 10rem);
    height: min(40vmin, 10rem);
    animation: ${Rotate} 1s linear infinite;
  }
`;

export default Loading;
