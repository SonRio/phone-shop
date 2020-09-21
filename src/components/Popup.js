import React from 'react';
import '../css/popup.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Popup extends React.Component {
  render() {
    return (
      <div id={this.props.id} className='popup-Register' style={this.props.showPopup}>
        <h3>{this.props.text}</h3>
        <button className='mr-4' style={{width:"9rem"}} onClick={this.props.closePopup}>{this.props.button}</button>
        <button className='btn-danger' style={this.props.showBtnCancel}  onClick={this.props.cancel}>{this.props.button_2}</button>
      </div>
    );
  }
}

export default Popup;