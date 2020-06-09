import React, { Component } from "react";
import axios from 'axios';
import authHeader from "../../services/auth-header";
export default class viewLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      log: []
    };
  }

  async componentDidMount() {
    axios.get(`http://82.179.9.51:8080/admin/log`, { headers: authHeader() })
            .then(response => {
        this.setState({
          log: response.data
        });
        // console.log('response',this.state.patients)
      }
    );

  }

  render() {
    return (
      <div className="row center justify-content-center col-xs-12 tables ">
         <h1>Лог</h1>
         <div className="table-bordered table-hover text-center table-sm table-responsive ">
            <table className="table ">
                <thead >
                    <tr>
                        <th>№</th>
                        <th>ID пользователя</th>
                        <th>Тип операции </th>
                        <th>Дата</th>
                        <th>Имя таблицы</th>
                        <th>Комментарий</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.log.map((item, index) =>(
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.user_id}</td>
                        <td>{item.operation_type}</td>
                        <td>{item.date}</td>
                        <td>{item.table_name}</td>
                        <td >{item.arguments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
}