import React from 'react';

class Hero extends React.Component {
  render() {
    return (
      <div className="header">
        

        <style>{`
          .header {
            background: url(/.png);
            background-size: cover;
            padding: 50px 100px;
            margin-top: 52px;
          }

          @media (max-width: 623px){
           .header {
             width: 100%;
             padding: 0;
             margin: 0;
           }
          }
        `}</style>
      </div>
    )
  }
}

export default Hero;