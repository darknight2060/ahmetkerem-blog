import React from 'react';
const currentYear = new Date;

class Footer extends React.Component {
  render() {return (
    <footer>
      <a>Bi' Yazılımcının Köşesi. <br/> <b style={{color: "orange"}}>Ahmet Kerem</b> tarafından geliştirildi.</a> <br/>
      <a style={{color: "#ccc"}}>v.21.0716</a>

      <style>{`
        a {
         color: #fff;
        }

        footer b:hover {
          animation: parlama 1s infinite;
        }

        footer {
          padding: 80px 0;
          background: #212121;
          text-align: center;
        }

        @keyframes parlama {
          0% {opacity: 1}
          50% {opacity: 0}
          100% {opacity: 1}
        }

        @media (max-width: 900px) {
          footer {
            margin-top: 100px;
          }
        }
      `}</style>
    </footer>
  )}
}

export default Footer;