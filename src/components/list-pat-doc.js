import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import authHeader from "../services/auth-header";
import axios from "axios";
import {Link} from "react-router-dom";
import Refresh from "../services/refresh"
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: []
    };
  }

  async componentDidMount() {
    await UserService.getAttachedUserList().then(
      response => {
        this.setState({
          patients: response.data
        })
      
      }
    );

  }

  render() {
    return (
      <div className="conteiner-fluid">
        <div className="table table-bordered table-hover text-center table-sm ">
            <h5>Пациенты</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Номер полиса</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.patients.map((item, index) =>(
                    <tr key={item.id} onClick={`/list/${item.id}`}>
                        <td>{index + 1}</td>
                        <td>{item.surname}</td>
                        <td>{item.name}</td>
                        <td>{item.patronymic}</td>
                        <td>{item.policy_number}</td>
                        
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}