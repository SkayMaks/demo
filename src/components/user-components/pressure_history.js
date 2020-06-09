import React, { Component } from "react";
import UserService from "../../services/user.service";
import {Line} from 'react-chartjs-2';


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }
  componentDidMount() {
    UserService.getPressureHistory().then(
      response => {
        this.setState({
          content: response.data
        });
      }
    );
  }
  
  render() {
    const date=this.state.content.map((item)=>item.date);
    const sys=this.state.content.map((item)=>item.systolic_pressure);
    const dia=this.state.content.map((item)=>item.diastolic_pressure);
    const data = {
        labels: date,
        datasets: [{
            label: 'Значения нижнего давления',
            backgroundColor: 'rgba(171, 41, 5, 1)',
            borderColor: 'rgba(158, 115, 103, 1)',
            fill: false,
            data:  dia,
        },{
            label: 'Значения верхнего давления',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            data: sys,
        } ]
      };
      

    return (
      
      <div className="conteiner-fluid">
        
      <div className="row jumbotron"> 
      <div className="col-xs-12  scrolling">{
      this.state.content.map((item)=><div className="col-xs-12"><p><strong>Дата: </strong> {item.date}
          <strong><br/> Верхнее давление: </strong> {item.systolic_pressure}
          <strong><br/> Нижнее давление: </strong> {item.diastolic_pressure}</p></div>)
      }
      </div><div className="col-xs-12 col-sm-9 ">
        <Line className="" data={data} /> 
      
      </div>
      </div>
    </div>
    );
  }
}