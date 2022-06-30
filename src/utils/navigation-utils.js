import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { navigationLoading, navigationSuccess } from '../slices/navigation-slice';


let actualScreen = "";

export const GoTo = (props) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  switch (props.page) {
    case "Dashboard":
            dispatch(navigationLoading());
            actualScreen = props.page;
            navigate("/dashboard",{replace: true});
            dispatch(navigationSuccess(actualScreen)) 
        break;
    case "Appointments":
        dispatch(navigationLoading());
        actualScreen = props.page;
        navigate("/appointments",{replace: true});
        dispatch(navigationSuccess(actualScreen))
    break;
  
    default:
        break;
  }
  
}