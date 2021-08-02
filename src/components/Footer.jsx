import React from 'react';
const currentYear = new Date;

class Footer extends React.Component {
  render() {return (
    <footer>
      <a>Ahmet Kerem Blog. <br/> <b>Ahmet Kerem</b> tarafından  geliştirildi.</a> <br/>

      <style>{`
        a {
          color: #000;
        }

        footer {
          margin: 100px 0 0;
          padding: 80px 0;
          background: #fff;
          text-align: center;
        }

        footer b {
          color: #7171d2;
          cursor: pointer;
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