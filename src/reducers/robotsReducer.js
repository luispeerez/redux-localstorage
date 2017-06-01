export default function robotsReducer(state = [], action){
  
  switch(action.type){
    case 'UPDATE_ROBOT':
      var newState = state.map((robot, index) => {
        if (robot.id === action.id) {
          return Object.assign({}, robot, action.params)
        }
        return robot
      })
      return newState;

    case 'DELETE_ROBOT':
      var newState = state.filter((robot, index) => {
        return robot.id !== action.id;
      });
      return newState;      
    
    case 'CREATE_ROBOT':
      action.newRobot.id = makeid();
      state.push(action.newRobot);
      return state;

    default:
      return state;
  }
}

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}