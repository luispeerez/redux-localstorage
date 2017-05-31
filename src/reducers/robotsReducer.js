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
      console.log('action', action);
      var newState = state.filter((robot, index) => {
        return robot.id !== action.id;
      });
      console.log('newState', newState);
      return newState;      
    
    default:
      return state;
  }
}