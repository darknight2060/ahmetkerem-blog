import React from 'react';
const currentYear = new Date;

class Footer extends React.Component {
  render() {return (
    <footer>
      <div className="text">Ahmet Kerem Blog. <br/> <a href="/hakkinda">Ahmet Kerem</a> tarafından  geliştirildi.</div> <br/>

      <style>{`
        footer {
          margin: 100px 0 0;
          padding: 80px 0;
          background: #fff;
          text-align: center;
        }

        footer .text {
          color: #000;
        }

        footer a {
          color: #7171d2;
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