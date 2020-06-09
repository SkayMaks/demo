import React, { Component } from "react";
import UserService from "../../services/doc.service";
import {Link, Redirect} from "react-router-dom";

import authHeader from "../../services/auth-header";
import axios from "axios";


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
      allPatients:[],
      showAttPat:true,
      showAllPat:false
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
    await UserService.getAllUserList().then(
      response => {
        this.setState({
          allPatients: response.data
        });
        // console.log('response',this.state.patients)
      }
    );
  }
  
  showAllPat = () =>{
    if(this.state.showAllPat) this.setState({showAllPat: false})
    else this.setState({showAllPat: true})
    this.state.showAttPat=false;

  }
  showAttPat = () =>{
    if(this.state.showAttPat) this.setState({showAttPat: false})
    else this.setState({showAttPat: true})
    this.state.showAllPat=false;
    
  }
  funAttachmen(id){
    axios.post(`http://82.179.9.51:8080/doctor/attachment/`, {patient_id: id},{headers: authHeader()})
    
  }
  render() {
    return (
      <div className="row justify-content-md-center">
        
         <div class="btn-group btn-group-lg  padd" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary" onClick={this.showAttPat} >Список личных пациентов</button>
          <button type="button" class="btn btn-secondary" onClick={this.showAllPat}>Список всех пациентов:</button>
          
        </div>
         

         {this.state.showAttPat&&<div className="table-bordered table-hover text-center table-sm table-responsive ">
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
        </div>}
        {this.state.showAllPat&&<div className="table-bordered table-hover text-center table-sm table-responsive ">
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
                {this.state.allPatients.map((item, index) =>(
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
                        <td className="col-xs-12">
                         <button className="btn btn-primary btn-sm" onClick={this.funAttachmen(item.id)} disabled>Стать врачем</button>
                        </td>
                        
                    </tr>
                ))}
                </tbody>
            </table>
        </div>}

          
         
      </div>
    );
  }
}