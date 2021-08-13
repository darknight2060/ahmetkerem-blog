import React, { Component } from 'react';
import ms from '../../services/ms';

class Notifications extends Component {
  categorizeNotf(notf) {
    var member = "";
  
    if (notf.member == "Misafir") member = "Misafir";
  
    this.props.users.forEach(p => {
      if (p.id !== notf.member) return;
      else member = p.name;
    })
  
    if (notf.type == "like") return `${member} bir yazı beğendi.`;
    if (notf.type == "comment") return `${member} bir yorum yaptı.`;
  }

  render() {return (
    <div className="panel-tab">
      <div className="head">Bildirimler</div>
      
      <div className="panel-notfs-overlay">
        {this.props.notifications.map(notf => {return (
          <div className="panel-notf">
            <div className="img" />
        
            <div style={{textAlign: "left"}}>
              <div className="notf-date">{ms(Date.now() - notf.date, {long: true}) + " önce"}</div>
              <div className="notf-content">{this.categorizeNotf(notf)}</div>
            </div>
          </div>
        )}).reverse()}
      </div>

      <style>{`
        .panel-notfs {
          width: 300px;
          height: 75vh;
          background: #fff;
          border-left: 2px solid var(--button-background);
          border-radius: 0 10px 10px 0;
          float: right;
          overflow: hidden;
        }
      
        .panel-notfs-overlay {
          height: calc(100% - 65px);
          overflow: hidden auto;
        }
        
        .panel-notfs-overlay::-webkit-scrollbar {
          width: 8px;
        }
      
        .panel-notfs-overlay::-webkit-scrollbar-thumb {
          background: #ddd;
        }
      
        .panel-notfs-overlay::-webkit-scrollbar-thumb:hover {
          background: #bbb;
        }

        .panel-notf {
          padding: 15px 20px;
          border-bottom: 1px solid #e2e2e2;
          display: flex;
          user-select: none;
          transition: .1s;
        }

        .panel-notf:hover {
          background: #ececec;
        }

        .panel-notf .img {
          width: 22px;
          height: 22px;
          margin: auto 15px auto 0;
          background: #000;
          border-radius: 50px;
          background: url(https://cdn2.iconfinder.com/data/icons/racket-sports-1/24/badminton_Copy-512.png);
          background-size: contain;
          background-repeat: no-repeat;
        }

        .panel-notf .notf-date {
          color: #8e8e8e;
          font-size: 12px;
          font-style: italic;
          text-transform: uppercase;
        }

        @media (max-width: 700px) {
          .panel-notfs {
            width: 100%;
            height: 50vh;
            border-radius: 0;
          }
        }
      `}</style>  
    </div>
  )}
};

export default Notifications;