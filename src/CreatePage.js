import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import Robot from './Robot';
import Notification from './Notification';
import {
  browserHistory
} from 'react-router'

class CreatePage extends Component {
  constructor(props){
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onChangeRobot = this.onChangeRobot.bind(this);

    this.state = {
      createDone: false,
      robot:{},
      robots: this.props.robots
    };

  }

  componentWillReceiveProps(nextProps){
    this.setState({robots:nextProps.robots})
  }
  
  resetState(){
    this.setState(this.firstState);
  }

  onCreate(event){
    this.props.onCreateRobot(this.state.robot)
    this.setState({createDone: true});
    browserHistory.push('/robot/' + this.state.robots[this.state.robots.length - 1].id + '?created=true');

  }

  onChangeRobot(event){
    const field = event.target.name;
    const robot = this.state.robot;
    robot[field] = event.target.value;
    return this.setState({robot: robot});    
  }

  render() {

    var saveNotification = null;
    if(this.state.createDone){
      var message = 'Robot creado';
      saveNotification = <Notification message={message} type={'success'} />;
    }

    return (
      <div className="container">
        <h1>Robot creation</h1>
        <div className="columns">

          <form className="column is-9">
            <div className="field">
              <label className="label">Name</label>
              <p className="control">
                <input 
                  className="input" 
                  type="text" 
                  name="name"
                  value={this.state.robot.name}
                  onChange={this.onChangeRobot}
                />
              </p>
            </div>
            <div className="field">
              <label className="label">Manufactura</label>
              <p className="control">
                <input 
                  className="input" 
                  type="text" 
                  name="manufacturer"
                  value={this.state.robot.manufacturer}
                  onChange={this.onChangeRobot}
                />
              </p>
            </div>

            {
              !this.state.createDone ? 
              <div className="block block-buttons">
                <a onClick={this.onCreate} className="button is-primary">Crear</a>
              </div>
              :null
            }

          </form>



        </div>

        {saveNotification}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
  return {
    robots: state.robots
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateRobot: (params) => {
      dispatch({
        type:'CREATE_ROBOT',
        newRobot: params,
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);  
