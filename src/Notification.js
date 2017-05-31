import React, {Component} from 'react';
import classnames from 'classnames';


class Notification extends Component{
  render(){

    return(
      <div className={classnames(
        'notification',
        {
          'is-danger': this.props.type === 'error',
          'is-success': this.props.type === 'success'
        }
      )}>
        {this.props.message}
      </div>      
    )
  }
}

export default Notification;