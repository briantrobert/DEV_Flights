'use client'
import Link from "next/link"
import AccountButton from "./UserButton"
import { useDataProviding } from "../provider/DataProvider"

function Navbar() {

    const { state } = useDataProviding()

    return (
        <nav className="sticky z-20 top-0 bg-gray-700 backdrop-blur-sm py-2">
            <div className="container flex justify-between items-center px-10 md:px-0 mx-auto">
                <Link href="/">
                    <h1 className="text-lg font-bold font-sans text-gray-200">
                        My Flights App
                    </h1>
                </Link>
                <ul className="pr-3 flex space-x-3 justify-center items-center">
                    {
                        state.name ?
                        <>
                        <li className="font-semibold text-base text-gray-300">{state.email}</li>
                        </>
                        :
                        <>
                        </>
                    }
                    <li>
                        <AccountButton />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar