import React, {Component} from 'react';

class Robot extends Component{

  constructor(props) {
    super(props);
    this.onDeleteAction = this.onDeleteAction.bind(this);
    console.log('this.props', this.props);

  }  

  onDeleteAction(){
    this.props.onDelete(this.props.robot.id);
  }

  render(){

    let actionsBlock = (
      <div className="block block-buttons">
        <a href={'/robot/'+this.props.robot.id} className="button is-info">Ver</a>
        <a href={'/robot/edit/'+this.props.robot.id} className="button is-warning">Editar</a>
        <a onClick={this.onDeleteAction} className="button is-danger">Eliminar</a>
      </div>      
    );  

    if(!this.props.enableActions){
      actionsBlock = null;
    }

    return (
      <div className="card">
        <div className="card-image">
          <div className="image is-4by4">
            <img src={ "https://robohash.org/" +  this.props.robot.id } alt="Image"/>
          </div>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{this.props.robot.name}</p>
              <p className="subtitle is-6">robot id: #{this.props.robot.id}</p>
              <p><strong>Manufactura</strong>: {this.props.robot.manufacturer}</p>
              {actionsBlock}
            </div>
          </div>

        </div>
      </div>

    );

  }
}

export default Robot;