import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

class Footer extends React.Component {
  render() {return (
    <footer>
      <div className="text">
        
        &copy; 2021 Ahmet Kerem Blog. <br/>
      
        <a href="/hakkinda">Ahmet Kerem</a> tarafından ❤️ ile geliştirildi.

        <div className="social-links">
          <SocialIcon
            url="https://www.facebook.com/ahmetkerem.akyel.3/"
            style={{width: "35px", height: "35px"}}
          />

          <SocialIcon
            url="https://www.instagram.com/ahmetkeremakyel/"
            style={{width: "35px", height: "35px"}}
          />

          <SocialIcon
            url="https://twitter.com/ahmetkeremakyel"
            style={{width: "35px", height: "35px"}}
          />
        </div>
      </div>
    </footer>
  )}
};

export default Footer;