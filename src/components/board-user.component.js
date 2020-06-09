import React, { Component } from "react";
import UserService from "../services/user.service";
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      }
    );
   
  }
 
  render() {
    return (
      <div className="conteiner-fluid">
        
        <div className="row jumbotron"> 
          <div className="col-xs-12">
            <p><strong>ID:</strong> {this.state.content.id}</p>
            <p><strong>Номер полиса:</strong> {this.state.content.policy_number}</p>
            <p><strong>Минимальное значение пульса:</strong> {this.state.content.min_pulse}</p>
            <p><strong>Максимальное значение пульса:</strong> {this.state.content.max_pulse}</p>
          </div>
        </div>
        <div className="row jumbotron">
          <div className="col-xs-12">
            <p><strong>Рост:</strong> {this.state.content.height}</p>
            <p><strong>Вес:</strong> {this.state.content.weight}</p>
            <p><strong>Минимально значение верхнего давления:</strong> {this.state.content.min_systolic_pressure}</p>
            <p><strong>Максимальное значение верхнего давления:</strong> {this.state.content.max_systolic_pressure}</p>
            <p><strong>Минимальное значение нижнего давления:</strong> {this.state.content.min_diastolic_pressure}</p>
            <p><strong>Максимальное значение нижнего давления:</strong> {this.state.content.max_diastolic_pressure}</p></div>
          </div>
        </div>
    );
  }
}