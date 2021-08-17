import React, { Component } from 'react';

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";


class Share extends Component {
  constructor(props) {
    super(props);
    this.shareLink = window.location.href;
  }

  render() {return (
    <div className="shareContainer">
      <EmailShareButton
        url={this.shareLink}
        children={ <EmailIcon size={32} /> }
      />

      <FacebookShareButton
        url={this.shareLink}
        children={ <FacebookIcon size={32} /> }
      />

      <TelegramShareButton
        url={this.shareLink}
        children={ <TelegramIcon size={32} /> }
      />

      <TwitterShareButton
        url={this.shareLink}
        children={ <TwitterIcon size={32} /> }
      />

      <WhatsappShareButton
        url={this.shareLink}
        children={ <WhatsappIcon size={32} /> }
      />

      <style>{`
        .shareContainer {
          margin: 0 15px;
          display: flex;
          overflow: auto hidden;
        }

        .shareContainer button {
          height: 32px;
          margin-right: 6px;
        }

        .shareContainer button:hover svg {
          filter: opacity(0.8);
        }

        .shareContainer svg {
          border-radius: 5px;
          transition: .1s;
        }
      `}</style>
    </div>
  )}
}

export default Share;