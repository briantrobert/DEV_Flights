'use client'
import { useDataProviding } from "@/components/provider/DataProvider";
import { CardViewSvg, TableViewSvg, AddingSvg, RefreshSvg } from "./svg/AllSvg"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Variants2 } from "@/helper/Variants";
import Card from "./Cards";
import TableView from "./TableView";
import { useState } from "react";
import axiosFetch from "../services/axios";
import NoData from "./NoData";



function RenderFlights() {

  const [search, setSearch] = useState('')
  const { data, showWays, changeViewState, setData, res, config} = useDataProviding()

  const handleChange = (e) => {
    if (e.target.value === "") {
      res()
    } else {
      setTimeout(async () => {
        const response = await axiosFetch('/flights', {
          params: {
            code: e.target.value
          },
          config
        })
        let data = response.data;
        const { total, count, resources, message, code, type } = data
        console.log(response)
        if (message) {
          console.log(message)
          setData([])
        } else {
          setData(resources);
        }
      }, 2000)
    }
    setSearch(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleChangeView = () => {
    changeViewState(!showWays)
  }

  return (
    <>
      <div className='pt-5 pl-10 flex justify-between pb-2 pr-5'>
        <div className="flex space-x-2">
          <Link href="/flights/new">
            <button className="p-1 bg-gray-700 rounded-lg hover:scale-110 transition-all ease-in-out"><AddingSvg /></button>
          </Link>
          <div>
            <button className="p-1 bg-gray-700 rounded-lg hover:scale-110 transition-all ease-in-out" onClick={() => res()}><RefreshSvg /></button>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-2">
              <input value={search} onChange={handleChange} name="search" className="py-1 rounded-lg px-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                placeholder="Code to search"
              />
            </div>
          </form>
          <div></div>
        </div>
      </div>
      <motion.div
        variants={Variants2}
        initial="hidden"
        animate="visible">
        <div className="w-full flex justify-end items-center">
          <div className="flex justify-center items-center mr-7">
            <button className={`px-2 py-1 rounded-s-xl ${showWays ? `bg-gray-300 border border-gray-500` : `bg-gray-700`}`} disabled={!showWays} onClick={() => handleChangeView()}><CardViewSvg /></button>
            <button className={`px-2 py-1 rounded-e-xl ${!showWays ? `bg-gray-300 border border-gray-500` : `bg-gray-700`} `} disabled={showWays} onClick={() => handleChangeView()}><TableViewSvg /></button>
          </div>
        </div>
        {data ? 
        <>
        <AnimatePresence>
          {
            showWays &&
            <motion.div className="p-5 absolute w-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}>
              {data && <TableView data={data} />}
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {
            !showWays &&
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute w-full pb-5 grid lg:grid-cols-4 gap-4 pt-5 md:grid-cols-3 sm:grid-cols-2 justify-items-center">
              {data && data.map(b => (
                <Card key={b.id} data={b} />
              ))}
            </motion.div>
          }
        </AnimatePresence>
        </>
        :
        <NoData />
        }
      </motion.div>
    </>
  )
}

export default RenderFlights;
