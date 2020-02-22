import { GET_COORDINATES, GET_MASKDATA, GET_TARGETPOSITION, GET_NOWSELECTDATA } from '../actionTypes';

const initialState = {
  center: [25.033671, 121.564427],
  zoom: 16,
  data: [],
  nowData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MASKDATA: {
      const properties = action.payload;
      return {
        ...state,
        data: properties,
      };
    }
    case GET_COORDINATES: {
      const { lat, lon } = action.payload;
      return {
        ...state,
        center: [lat, lon],
      };
    }
    case GET_TARGETPOSITION: {
      const { lat, lon } = action.payload;
      return {
        ...state,
        center: [lat, lon]
      }
    }
    case GET_NOWSELECTDATA: {
      const select = action.payload;
      return {
        ...state,
        nowData: select,
      }
    }
    default:
      return state;
  }
}

