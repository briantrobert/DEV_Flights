'use client'
import { createContext, useContext, useEffect, useState, useReducer } from "react"
import { GetData } from "../services/flightServices"
import axios from "axios"
import axiosFetch from "../services/axios"

const DataContext = createContext()

const initialState = {
  name: null,
  email: null,
  token: null,
  refreshToken: null,
  submitted: false

}


const reducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        submitted: action.payload.submitted
      }
    case 'REFRESH':  
       return {
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
       }
    case 'LOG_OUT':
       return initialState;

    default:
      return state;
  }
}

function DataProvider({ children }) {

  const [data, setData] = useState()
  const [showWays, setShowWays] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [state, dispatch] = useReducer(reducer, initialState)

  const config = {
    headers: { 
      Authorization: `Bearer ${state.token}`
     }
  }

//   axiosFetch.interceptors.response.use(resp => resp, async error => {
//     if(error.response.status === 401){
//        const response = await axiosFetch.post('/auth/refresh')

//        if(response.status === 200){
//          dispatch({
//           type:'REFRESH',
//           payload: {
//                     token: response.data.token,
//                     refreshToken: response.data.refreshToken,
//                     submitted: true
//             }
//          })
//        }
//     }
//      return error
// })

  const res = async () => {
    const d = await GetData(config)
    const { status, data, message } = d
    if (status === 200) {
      setData(data.resources)
    } else {
      alert(message)
    }
  }

  const changeViewState = (some) => {
    setShowWays(some)
  }

  const addData = (d) => {
    setData([...data, d])
  }

  const deleteData = (id) => {
    setData(data.filter((e) => e.id !== id))
  }

  const editData = (d) => {
    setData(data.map(e => e.id === d.id ? d : e))
  }

  useEffect(() => {
    res()
  }, [])


  return (
    <DataContext.Provider
      value={{
        showWays,
        changeViewState,
        data,
        setData,
        addData,
        deleteData,
        editData,
        res,
        openModal,
        setOpenModal,
        state,
        dispatch,
        config
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useDataProviding() {
  return useContext(DataContext);
}

export default DataProvider
