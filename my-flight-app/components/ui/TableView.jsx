import PhotoIcon from "./PhotoIcon"
import IndefiniteProgressBar from "./ProgressBar"
import TableActions from "./TableActions"

function TableView({ data }) {

  return (
    <>
      <div className="overflow-auto rounded-lg shadow-lg shadow-gray-900">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr className="p-3 bg-gray-600 text-gray-300">
              <th className="w-20 p-3 font-bold tracking-wide text-left">
                Actions
              </th>
              <th className="p-3 font-bold tracking-wide text-left">Code</th>
              <th className="p-3 font-bold tracking-wide text-left">Capacity</th>
              <th className="p-3 font-bold tracking-wide text-left">
                Departure Date
              </th>
              <th className="p-3 font-bold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 font-bold tracking-wide text-left">
                Photo
              </th>

            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data ? data.map((m, index) => (
              <tr
                key={m.id}
                className={`${index % 2 == 0 ? "bg-white" : "bg-gray-200"}`}
              >
                <TableActions data={m} />
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  {m.code}
                </td>
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  {m.capacity}
                </td>
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  {m.departureDate}
                </td>
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  {m.status === "processing" ? <IndefiniteProgressBar /> : m.status}
                </td>
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  {m.img === "" ? "" : <PhotoIcon data={m.id} />}
                </td>
              </tr>
            )) : <></>}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableView
