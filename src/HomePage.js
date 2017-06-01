import React, { Component } from 'react';
import Robot from './Robot';
import {connect} from 'react-redux';
import Notification from './Notification';
import _ from 'underscore';
import classnames from 'classnames';
import queryString from 'query-string';
import {
  browserHistory
} from 'react-router'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeItems = this.onChangeItems.bind(this);


    this.sortRobots = this.sortRobots.bind(this);
    this.filterByManufacter = this.filterByManufacter.bind(this);
    this.filterByPage = this.filterByPage.bind(this);
    this.getNumberOfPages = this.getNumberOfPages.bind(this);
    this.buildPagesArray = this.buildPagesArray.bind(this);
    this.setAppRobots = this.setAppRobots.bind(this);

    var urlQuery = this.props.location.query;
    var sortType = urlQuery.sortType || 'ASC';
    var manufacturer = urlQuery.manufacturer || 'any';
    var currentPage = urlQuery.page || 1 ;
    var items = urlQuery.items || 3;
    var manufacters = _.uniq(props.robots.map((robot) => robot.manufacturer));
    var allRobots = _.clone(props.robots);


    allRobots = this.sortRobots(allRobots, sortType);
    var robots = this.filterByManufacter(allRobots, manufacturer);
    var pageRobots = this.filterByPage(robots, currentPage, items);

    var numberOfPages = this.getNumberOfPages(robots, items);

    this.state = {
      numberOfPages: numberOfPages,
      currentPage: currentPage,
      sortType: sortType,
      robots: robots,
      pageRobots: pageRobots,
      allRobots: allRobots,
      manufacters: manufacters,
      manufacturer: manufacturer,
      deleteMade: false,
      items: items
    }
  }

  setAppRobots(){
    var allRobots = this.sortRobots(this.state.allRobots, this.state.sortType);
    var robots = this.filterByManufacter(allRobots, this.state.manufacturer);
    var pageRobots = this.filterByPage(robots, this.state.currentPage, this.state.items);
    var numberOfPages = this.getNumberOfPages(robots, this.state.items); 

    var queryObject = {
      currentPage: this.state.currentPage,
      items: this.state.items,
      manufacturer: this.state.manufacturer,
      sortType: this.state.sortType,
    }
    var stringified = queryString.stringify(queryObject);

    browserHistory.push({
      pathname: '/',
      search: '?'+stringified
    })

    this.setState({
      allRobots: allRobots,
      robots: robots,
      pageRobots: pageRobots,
      numberOfPages: numberOfPages
    })   
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
    }, this.setAppRobots)
  }

  onChangeManufacturer(event){
    var manufacturer = event.target.value;
    var robots = this.filterByManufacter(this.state.allRobots, manufacturer);
    robots = this.sortRobots(robots, this.state.sortType);
    this.setState({
      manufacturer:manufacturer,
      robots: robots
    }, this.setAppRobots)
  }

  onChangePage(page){
    this.setState({
      currentPage: page
    }, this.setAppRobots);
  }

  onChangeItems(event){
    var items = event.target.value;
    this.setState({
      items: items
    }, this.setAppRobots)
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
      robots.sort(function(a,b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();

        return (aName < bName) ? 1 : ((aName < bName) ? -1 : 0);
      }); 
    }else{
      robots.sort(function(a,b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();        
        return (aName > bName) ? 1 : ((bName > aName) ? -1 : 0);
      }); 
    }
    return robots;
  }

  filterByPage(robots, page, items){
    var start = (page - 1) * items;
    var end = page * items;
    return robots.slice(start, end);
  }

  getNumberOfPages(robots,items){
    var numberOfPages =  Math.ceil(robots.length / items);
    return numberOfPages;
  }

  onDeleteClick(id){
    this.props.onDeleteRobot(id);
    this.setState({deleteMade: true})  
    this.setAppRobots();    
  }

  buildPagesArray(numberOfPages){
    var bArray = [];
    for(var i=0;i<numberOfPages;i++){
      bArray.push(i+1);
    }
    return bArray;
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

          <div className=" column is-3 field">
            <p className="control">
              <span className="select is-medium">
                <select value={this.state.sortType} onChange={this.onChangeSort}>
                  <option value="ASC">Nombre +</option>
                  <option value="DESC">Nombre -</option>
                </select>
              </span>
            </p>
          </div>

          <div className=" column is-3 field">
            <p className="control">
              <span className="select is-medium">
                <select value={this.state.items} onChange={this.onChangeItems}>
                  <option value={1}>Mostrar 1 robot</option>
                  <option value={2}>Mostrar 2 robots</option>
                  <option value={3}>Mostrar 3 robots</option>

                </select>
              </span>
            </p>
          </div>

          <div className="column is-4">
            <nav className="pagination">
              {/*
              <a className="pagination-previous" title="This is the first page" disabled>Previous</a>
              <a className="pagination-next">Next page</a>
              */}
              <ul className="pagination-list">
                { this.buildPagesArray(this.state.numberOfPages).map((page, index) => 
                  <li>
                    <a onClick={() => this.onChangePage(page)}  className={classnames(
                      'pagination-link',
                      {
                        'is-current': (page) === this.state.currentPage
                      }
                    )}>
                      {page}
                    </a>
                  </li>
                )}
              </ul>
            </nav>            
          </div>

        </div>

        <p>
          <a href="/robot/create" className="button is-primary">Crear robot +</a>
        </p>
        <br/>

        <div className="columns is-multiline">
          { this.state.pageRobots.map((robot, i) => 
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