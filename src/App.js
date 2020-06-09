import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AssignmentTurnedInSharpIcon from '@material-ui/icons/EventAvailableSharp';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import MenuBookSharpIcon from '@material-ui/icons/MenuBookSharp';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { slide as Menu } from 'react-burger-menu';
import AuthService from "./services/auth.service";
import Role from "./services/role"
import Login from "./components/login.component";
import Register from "./components/register.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import BuildIcon from '@material-ui/icons/Build';
import userService from "./services/user.service";
import attachedList from "./components/doc-components/patients-name";
import step_history from "./components/user-components/step_history";
import pulse_history from "./components/user-components/pulse-history";
import pressure_history from "./components/user-components/pressure_history";
import recommendation from "./components/user-components/recommendation";
import info_treatment_information from "./components/user-components/info-treatment-information"
import PatientProfile from "./components/patient-profile";
import AddITinfo from "./components/doc-components/add-treatment-information";
import addRec from "./components/doc-components/add-recommendation";

import listUser from "./components/Addmin-components/usur_list";
import EditUser from "./components/Addmin-components/edit_user";
import viewLog from "./components/Addmin-components/view_log";
import addDoc from "./components/Addmin-components/add_doc";

class App extends Component {
  constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);

      this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          showPatientBoard: false,
          currentUser: undefined,
          roles:"",
          RolTemp: false,
          temp:false
        };
  }

  componentDidMount() {
      const user = AuthService.getCurrentUser();
      const role = Role()
      if (user) {
        this.setState({
          currentUser: AuthService.getCurrentUser(),
          showModeratorBoard: role.role.includes("doctor"),
          showPatientBoard: role.role.includes("patient"),
          showAdminBoard: role.role.includes("admin"),
          roles: role.role
        });
      }
     
  }

  logOut() {
      AuthService.logout();
  }
  

  render() {
      const { currentUser, showModeratorBoard, showPatientBoard,showAdminBoard } = this.state;
     
      if (localStorage.length === 0){this.state.temp = false}else{this.state.temp = true}
     
      return (
          <div  className="body">
              
                {showPatientBoard && (
                 <Menu styles={styles} right  width={ '380px' } disableAutoFocus >   
                    <a id="home" className="menu-item aaa" href="/user"><AccountCircleIcon className="padd"/>Профиль</a>
                    <a className="menu-item aaa" href="/pulse_history"><FavoriteBorderIcon className="padd"/>Пульс</a>
                    <a className="menu-item aaa" href="/step_history"><DirectionsRunIcon className="padd"/> Шаги</a>
                    <a className="menu-item aaa" href="/pressure_history"><img src="https://image.flaticon.com/icons/png/512/25/25624.png" width="26px" height="26px" className="img_menu padd"/>Давление</a>               
                    <a id="contact" className="menu-item aaa" href="/recommendation"><AssignmentTurnedInSharpIcon className="padd"/>Рекомендации</a>
                    <a id="contact" className="menu-item aaa" href="/info_treatment_information"><MenuBookSharpIcon className="padd"/>Схема лечения</a>
                    <a href="/login" className=" menu-item aaa" onClick={this.logOut}><ExitToAppIcon className="padd"/> Выйти  </a>
                    </Menu> )}
                {showModeratorBoard && (
                 <Menu styles={styles} right width={ '380px' } disableAutoFocus>   
                            <a id="home" className="menu-item aaa" href="/doc"><AccountCircleIcon className="padd"/>Профиль</a>
                    <a id="about" className="menu-item aaa" href="/attachedList"><ListAltSharpIcon className="padd"/>Список пациентов</a>
                    <a id="contact" className="menu-item aaa" href="/register"><PersonAddSharpIcon className="padd"/>Добавить пациента</a>
                    <a href="/login" className=" menu-item aaa" onClick={this.logOut}><ExitToAppIcon className="padd"/> Выйти  </a> 
                    </Menu> )}
                    {showAdminBoard && (
                 <Menu styles={styles} right width={ '380px' } disableAutoFocus>   
                    <a id="about" className="menu-item aaa" href="/listUser"><ListAltSharpIcon className="padd"/>Список пользователей</a>
                    <a id="contact" className="menu-item aaa" href="/addDoc"><PersonAddSharpIcon className="padd"/>Регистрация врача</a>
                    <a id="contact" className="menu-item aaa" href="/log"><BuildIcon className="padd"/>Просмотр лога</a>
                    <a href="/login" className=" menu-item aaa" onClick={this.logOut}><ExitToAppIcon className="padd"/> Выйти  </a> 
                    </Menu> )}  
           
                  <nav class="navbar navbar-expand-lg  bg-primary  ">
                      <div className="container ">
                        <p className="navbar-bard ">
                          <img src="https://kontur-center.ru/wp-content/themes/rstheme/img/logo/all-logo/pulse/pulse-256.png" width="40px" height="40px"/>
                        <p className="p1 ">
                           ИС мониторинга состояния здоровья пациентов
                        </p>
                        </p>   
                      </div>
               </nav>

                  <div className="container ">
                    {this.state.temp?(console.log("temp",this.state.temp)):(<Redirect to="/login"/>)}
                     {currentUser ?( <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/user" component={BoardUser} />
                        <Route exact path="/attachedList" component={attachedList} />
                        <Route exact path="/doc" component={BoardAdmin}/>
                        <Route path="/step_history" component={step_history}/>
                        <Route exact path="/pulse_history" component={pulse_history}/>
                        <Route exact path="/pressure_history" component={pressure_history}/>
                        <Route exact path="/recommendation" component={recommendation}/>
                        <Route exact path="/list/:id" component={PatientProfile} />
                        <Route exact path="/add/:id" component={AddITinfo} />
                        <Route exact path="/addRec/:id" component={addRec} />
                        <Route exact path="/log" component={viewLog} />
                        <Route exact path="/listUser" component={listUser} />
                        <Route exact path="/addDoc" component={addDoc} />
                        <Route exact path="/editUser/:id" component={EditUser} />
                        <Route exact path="/info_treatment_information" component={info_treatment_information}/>
                    </Switch> ) : <Route exact path="/login" component={Login}/>
                     
                     }
                        
                  </div>
              
          </div>
      );
  }
}
var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '36px'
      
    },
    bmBurgerBars: {
      background: '#fff',
      border:'1px solid #000'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      
    },
    bmMenu: {
      background: 'linear-gradient(73deg, rgb(51, 105, 231), rgb(0, 174, 255))',
      backgroundSize: 'cover',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#ffffff'
    },
    bmItemList: {
      color: '#fff',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block',
      color:'#fff'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
      
    }
  }
export default App;