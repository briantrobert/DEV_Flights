'use client'
import Link from "next/link"
import { AiFillEdit, AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { DeleteFlight } from "../services/flightServices";
import { useDataProviding } from "../provider/DataProvider";

function Card({data}) {

  const {code ,capacity, departureDate} = data
  const { deleteData } = useDataProviding()


    const handleDelete = async (id) => {
  
      if (window.confirm("Do you want to delete this flight")) {
        await new Promise(resolve => {setTimeout(resolve, 3000)})
          const data  = await DeleteFlight(id)
          console.log(data)
          if(data){
            deleteData(id)
          }
          // console.log(data.data[0])
      }
  }

    return (
      <>
        <div>
          <div className="bg-slate-400 sm:w-64 w-80 rounded-xl shadow-gray-900 shadow-lg hover:cursor-pointer hover:-translate-y-2 transition-all ease-in-out duration-150">
            <div className="m-2">
              <div className="text-gray-600 font-semibold pt-1">
                <h1>Code: {code}</h1>
              </div>
              <div className="text-gray-600 font-semibold pt-2">
                <h1>Capacity: {capacity}</h1>
              </div>
              <div className="text-gray-600 font-semibold">
                <h1>Departure: {departureDate}</h1>
              </div>
            </div>
            <div className="flex justify-end items-end space-x-1 pr-2">
              <Link href={`/flights/${data.id}`}>
                <button className="p-1"><AiFillEdit /></button>
              </Link>
              <div>
                <button className="p-1" onClick={() => handleDelete(data.id)}><AiFillDelete /></button>
              </div>
            </div>
          </div>
        </div>
        
      </>
    )
  }
  
  export default Card