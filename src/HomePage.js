import React, { Component } from 'react';
import Robot from './Robot';
import {connect} from 'react-redux';
import Notification from './Notification';


class HomePage extends Component {
  constructor(props){
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.state = {
      robots: props.robots,
      deleteMade: false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({robots:nextProps.robots})
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