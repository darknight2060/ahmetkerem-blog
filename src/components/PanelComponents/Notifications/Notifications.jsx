import React, { Component } from 'react';
import ms from '../../../services/ms';
import './Notifications.css';

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
    <div className="panel-notfs">
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
    </div>
  )}
};

export default Notifications;