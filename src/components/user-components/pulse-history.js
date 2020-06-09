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
    UserService.getPulseHistory().then(
      response => {
        this.setState({
          content: response.data
        });
      }
    );
  }
  
  render() {
    const date=this.state.content.map((item)=>item.date);
    const step=this.state.content.map((item)=>item.pulse_value);
    const data = {
        labels: date,
        datasets: [
          {
            label: 'Статистика пульса за весь период лечения',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            data: step
          }
        ]
      };

    return (
      <div className="conteiner-fluid">
        
        <div className="row jumbotron"> 
        <div className="col-xs-12 scrolling">{
        this.state.content.map((item)=><div className="col-12 " ><p><strong>Дата: </strong> {item.date}
          <br/><strong>Пульс: </strong> {item.pulse_value}</p></div>)
        }
        </div><div className="col-xs-12 col-sm-9 ">
          <Line className="" data={data} /> 
        
        </div>
        </div>
      </div>
    );
  }
}