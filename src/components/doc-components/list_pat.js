import React, { Component } from "react";
import UserService from "../../services/doc.service";
import {Link, Redirect} from "react-router-dom";

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
        });
        // console.log('response',this.state.patients)
      }
    );

  }

  render() {
    return (
      <div className="row center col-xs-12 tables ">
         <h1>Пациенты</h1>
         <div className="table-bordered table-hover text-center table-sm table-responsive ">
            <table className="table ">
                <thead >
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
                    <tr key={item.id} className={
                      item.flag
                      ? "alert alert-danger"
                      : ""
                  }>
                        <td>{index + 1}</td>
                        <td>{item.surname}</td>
                        <td>{item.name}</td>
                        <td>{item.patronymic}</td>
                        <td>{item.policy_number}</td>
                        <td className="col-xs-12"><Link to={`/list/${item.id}` }className="btn btn-primary btn-sm pdLink" role="button">Подробно</Link>
                        </td>
                        
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}