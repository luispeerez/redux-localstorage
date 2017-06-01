import React, { Component } from 'react';
import Robot from './Robot';
import {connect} from 'react-redux';
import Notification from './Notification';
import _ from 'underscore';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);

    this.sortRobots = this.sortRobots.bind(this);
    this.filterByManufacter = this.filterByManufacter.bind(this);

    var sortType = 'ASC';
    var manufacturer = 'any';
    var manufacters = _.uniq(props.robots.map((robot) => robot.manufacturer));
    var allRobots = _.clone(props.robots);
    var robots = this.sortRobots(props.robots, sortType);
    robots = this.filterByManufacter(allRobots, manufacturer);

    this.state = {
      sortType: sortType,
      robots: robots,
      allRobots: allRobots,
      manufacters: manufacters,
      manufacturer: manufacturer,
      deleteMade: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({robots:nextProps.robots})
  }

  onChangeSort(event){
    var sortType = event.target.value;
    var robots = this.sortRobots(this.state.robots, sortType);
    this.setState({
      sortType:sortType,
      robots: robots
    })
  }

  onChangeManufacturer(event){
    var manufacturer = event.target.value;
    var robots = this.filterByManufacter(this.state.allRobots, manufacturer);
    robots = this.sortRobots(robots, this.state.sortType);
    this.setState({
      manufacturer:manufacturer,
      robots: robots
    })
  }


  filterByManufacter(allRobots, manufacturer){
    if(manufacturer === 'any'){
      return allRobots;
    }
    
    return allRobots.filter(r => {
      return r.manufacturer === manufacturer;
    })
  }

  sortRobots(robots, sortType){
    if(sortType == 'DESC'){
      robots.sort(function(a,b) {return (a.name < b.name) ? 1 : ((a.name < b.name) ? -1 : 0);} ); 
    }else{
      robots.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} ); 
    }
    return robots;
  }

  onDeleteClick(id){
    this.props.onDeleteRobot(id);
    this.setState({deleteMade: true})
    
}

  render() {

    var deleteNotification = null;
    if(this.state.deleteMade){
      var message = 'Robot eliminado';
      deleteNotification = <Notification message={message} type={'success'} />;
    }

    return (
      <div className="container">

        <div className="columns">

          <div className=" column is-4 field">
            <p className="control">
              <span className="select is-medium">
                <select value={this.state.manufacturer} onChange={this.onChangeManufacturer}>
                  <option value="any">Cualquier manufactura</option>
                  {
                    this.state.manufacters.map(m => 
                      <option value={m}>{m}</option>
                    )
                  }
                </select>
              </span>
            </p>
          </div>

          <div className=" column is-4 field">
            <p className="control">
              <span className="select is-medium">
                <select value={this.state.sortType} onChange={this.onChangeSort}>
                  <option value="ASC">Nombre +</option>
                  <option value="DESC">Nombre -</option>
                </select>
              </span>
            </p>
          </div>

        </div>

        <p>
          <a href="/robot/create" className="button is-primary">Crear robot +</a>
        </p>
        <br/>

        <div className="columns is-multiline">
          { this.state.robots.map((robot, i) => 
            <div key={i} className="column is-one-quarter">
              <Robot enableActions={true}  robot={robot}  onDelete={this.onDeleteClick}/>
            </div>
          )}

        </div>
        {deleteNotification}

      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    robots: state.robots
  }
}
 
function mapDispatchToProps(dispatch){
  return{
    onDeleteRobot: (id) => {
      dispatch({
        type:'DELETE_ROBOT',
        id: id
      })
    }    
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

//export default HomePage;