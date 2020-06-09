import React, { Component } from "react";
import UserService from "../../services/user.service";
import {Link, Redirect} from "react-router-dom";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    await UserService.getUserList().then(
      response => {
        this.setState({
          users: response.data
        });
        // console.log('response',this.state.patients)
      }
    );

  }

  render() {
    return (
      <div className="row center justify-content-center col-xs-12 tables ">
         <h1 className="">Пользователи</h1>
         <div className="table-bordered table-hover text-center table-sm table-responsive ">
            <table className="table ">
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>Логин</th>
                        <th>Роль </th>
                        <th>Email</th>
                        <th>Дата регистрации</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.users.map((item, index) =>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.login}</td>
                        <td>{item.role_id}</td>
                        <td>{item.email}</td>
                        <td>{item.date_reg}</td>
                        <td className="col-xs-12">
                        <Link to={`/editUser/${item.id}` }className="btn btn-primary btn-sm" role="button">Редактировать</Link></td>
                        
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}