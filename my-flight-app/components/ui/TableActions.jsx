"use client"

import Link from "next/link";
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { DeleteFlight } from "../services/flightServices";
import { useDataProviding } from "../provider/DataProvider";
import { useState } from "react";

function TableActions({data}) {

  const {status} = data
  const { deleteData } = useDataProviding()
  const [loading, setLoading ] = useState(false)

  const handleDelete = async (id) => {

    if (window.confirm("Do you want to delete this flight")) {
         setLoading(true)
        const data  = await DeleteFlight(id)
        if(data){
          
          deleteData(id)
          setTimeout(() =>{
            setLoading(false)
          }, 3000)
        }
        else{
          setLoading(false)
        }
    }
}

  return (
    <td className="rounded-xl whitespace-nowrap">
    <div className="flex justify-end items-end">
      <Link href={`/flights/${data.id}`}>
        <button className="pl-2 pr-1">
          <AiFillEdit />
        </button>
      </Link>
      <div className="pl-2 pr-2">
      <button onClick={() => handleDelete(data.id)}>
        <AiFillDelete />
      </button>
      </div>
    </div>
  </td>
  )
}

export default TableActions
