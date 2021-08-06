import React from 'react';

class Footer extends React.Component {
  render() {return (
    <footer>
      <div className="text">
        
        &copy; 2021 Ahmet Kerem Blog. <br/>
      
        <a href="/hakkinda">Ahmet Kerem</a> tarafından ❤️ ile geliştirildi.

      </div>

      <style>{`
        footer {
          margin: 100px 0 0;
          padding: 80px 20px;
          background: #fff;
          text-align: center;
          user-select: none;
        }

        footer .text {
          color: #000;
        }

        footer a {
          color: var(--button-background);
          font-weight: bold;
          transition: .1s;
        }

        footer a:hover {
          color: var(--button-hover-background)
        }

        @media (max-width: 900px) {
          footer {
            margin-top: 100px;
          }
        }
      `}</style>
    </footer>
  )}
};

export default Footer;