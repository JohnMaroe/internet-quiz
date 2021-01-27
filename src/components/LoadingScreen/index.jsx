import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.82);

  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 74px;
    margin: 0 42px;
    color: ${({ theme }) => theme.colors.wrong};
    animation: browsers-wiggle 1500ms ease;
  }

  .fa-firefox {
    animation-delay: 0;
  }

  .fa-chrome {
    animation-delay: 600ms;
  }

  .fa-edge {
    animation-delay: 1300ms;
  }

  @keyframes browsers-wiggle {
    0%,100% {transform:translateY(0);}
    50% {transform:translateY(-100px);}
  }
`;

function LoadingScreen() {
  return (
    <div>
      <Overlay>
        <i className="fab fa-firefox" />
        <i className="fab fa-chrome" />
        <i className="fab fa-edge" />
      </Overlay>
    </div>
  );
}

export default LoadingScreen;
