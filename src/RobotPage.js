import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';
import Robot from './Robot';
import Notification from './Notification';

class RobotPage extends Component {
  constructor(props){
    super(props);
    this.onChangeRobot = this.onChangeRobot.bind(this);
    this.onSave = this.onSave.bind(this);
    this.resetState = this.resetState.bind(this);

    var urlQuery = this.props.location.query;

    this.state = {
      robot: this.props.robot,
      updateDone: false,
      createdFlag: urlQuery.created

    };

    this.firstState = _.clone(this.state);
  }

  resetState(){
    this.setState(this.firstState);
  }

  onSave(event){
    this.props.onUpdateRobot(this.state.robot.id,this.state.robot)
    this.setState({updateDone: true});
  }

  onChangeRobot(event){
    const field = event.target.name;
    const robot = this.state.robot;
    robot[field] = event.target.value;
    return this.setState({robot: robot});    
  }

  render() {

    var saveNotification = null;
    if(this.state.updateDone){
      var message = 'Cambios guardados';
      saveNotification = <Notification message={message} type={'success'} />;
    }

    var createNotification = null;
    if(this.state.createdFlag){
      var message = 'Robot creado';
      createNotification = <Notification message={message} type={'success'} />;
    }

    return (
      <div className="container">
        <h1>Robot page</h1>

        <div className="columns">
            <div className="column is-one-quarter">
              <Robot robot={this.state.robot}/>
            </div>
            { this.props.route.editMode ?
                <form className="column is-9">
                  <div className="field">
                    <label className="label">Name</label>
                    <p className="control">
                      <input 
                        className="input" 
                        type="text" 
                        placeholder="Name"
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
                        placeholder="Name"
                        name="manufacturer"
                        value={this.state.robot.manufacturer}
                        onChange={this.onChangeRobot}
                      />
                    </p>
                  </div>

                  <div className="block block-buttons">
                    {/*<a onClick={this.resetState} className="button is-info">Restaurar</a>*/}
                    <a onClick={this.onSave} className="button is-primary">Guardar</a>
                  </div>

                </form>

                : null
            }


        </div>

        {saveNotification}
        {createNotification}

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {  
  let robot = {};
  const robotId = ownProps.params.id;
  if (state.robots.length > 0) {
    robot = Object.assign({}, state.robots.find((_robot) => _robot.id === robotId));
  }
  return {robot: robot};
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateRobot: (id, params) => {
      dispatch({
        type:'UPDATE_ROBOT',
        params: params,
        id: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RobotPage);  
