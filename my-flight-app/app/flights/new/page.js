'use client'
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { motion } from "framer-motion"
import { CreateFlight, CreateFlightwithPhoto, EditFlight, EditFlightwithPhoto, GetFlightById, GetFlightPhotoById } from "@/components/services/flightServices"
import { useDataProviding } from "@/components/provider/DataProvider"
import Loading from "@/app/loading"
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';

const initValues = {
  code: "",
  capacity: 0,
  departureDate: "",
  photo: ""
}


function FlightForm() {
  
  const params = useParams();

  const validationSchema = Yup.object().shape({
    code: Yup.string().length(6, 'Need 6 characters long').required('Required!'),
    capacity: Yup.number('Is not a number').positive("Please a positive integer").integer('Please integer')
    .min(1, 'Capacity most be greater than 1')
    .max(200, 'Capacity most be lower than 200').required('Required!'),
  });

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(validationSchema)
  })

  const { addData, editData, config } = useDataProviding()
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [formData, setData] = useState(initValues);
  const [image, setImage] = useState(formData.photo);

  const handelChange = (e) => setData({ ...formData, [e.target.name]: e.target.value });

  const NewFlight = async () => {
    let trueForm = {
      code: formData.code,
      capacity: parseInt(formData.capacity),
      departureDate: formData.departureDate
    }
    console.log(config)
    setLoading(true)
    const response = await CreateFlight(trueForm, config)
    const { total, status, resources, data, message } = response
    if (status === 201) {
      addData(data)
      setTimeout(() => {
        router.push('/')
        router.refresh()
        setLoading(false)
      }, 4000)
    }else{
      setLoading(false)
      alert(message)

    }
  };

  const NewFlightWithPhoto = async (formDataSend) => {
    setLoading(true);
    const response = await CreateFlightwithPhoto(formDataSend, config);
    const { total, status, resources, data, message } = response
    if (status === 201) {
      addData(data);
      setTimeout(() => {
        setLoading(false);
        router.push("/");
        router.refresh();
      }, 4000);
    }else{
      setLoading(false);
      alert(message)
    }
  };

  const EditingFlights = async (id) => {
    if (formData) {
      formData.capacity = parseInt(formData.capacity)
    }

    let editForm = {
      code: formData.code,
      capacity: formData.capacity,
      departureDate: formData.departureDate
    }
    setLoading(true)
    const response = await EditFlight(id, editForm, config)
    const { total, status, resources, data, message } = response
    if (status === 200 ) {
      editData(data)
      setTimeout(() => {
        setLoading(false)
        router.push('/')
        router.refresh()
      }, 4000)
    } else {
      setLoading(false)
      alert(message)
    }
  }

  const EditingFlightswithPhoto = async (id, formDataSend) => {
    setLoading(true);
    const response = await EditFlightwithPhoto(id, formDataSend);
    const { total, status, resources, data, message } = response
    if (status === 200) {
      editData(data);
      setTimeout(() => {
        setLoading(false);
        router.push("/");
        router.refresh();
      }, 4000);
    } else {
      setLoading(false);
      alert(message)
    }
  };

  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };

    setData({ ...formData, [e.target.name]: e.target.value })
  };

  const handelSubmitForm = async (data) => {
    let formDataSend = new FormData();
    if (!params.id) {
      if (!image) {
        return await NewFlight();
      } else {
        formDataSend.append("code", data.code);
        formDataSend.append("capacity", data.capacity);
        formDataSend.append("departureDate", data.departureDate);
        formDataSend.append("photo", data.photo[0]);
        return await NewFlightWithPhoto(formDataSend);
      }
    } else {
      if (!image) {
        return await EditingFlights(params.id)
      } else {
        formDataSend.append("code", data.code);
        formDataSend.append("capacity", data.capacity);
        formDataSend.append("departureDate", data.departureDate);
        formDataSend.append("photo", data.photo[0]);
        return await EditingFlightswithPhoto(params.id, formDataSend)
      }
    }

  }

  const loadData = async (id) => {

    const response = await GetFlightById(id, config)
    // console.log(config)
    const { status, data } = response
   if(status === 200){
     var { img, code, departureDate ,capacity} = data
   if(img){
     const dataPhoto = await GetFlightPhotoById(id)
      const reader = new FileReader();
      reader.readAsDataURL(dataPhoto);
         reader.onload = () => {
             const base64String = reader.result;
             setImage(base64String)
         };
   }
    setData({ code, capacity, departureDate, photo: img });

   }


    await new Promise(resolve => { setTimeout(resolve, 4000) })

  }

  useEffect(() => {
    if (params.id) {
      loadData(params.id)
    }
  }, [])


  return (
    <>
      {loading ? <Loading /> :

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center w-full h-[calc(100vh-7rem)]">
          <form className="w-96 bg-white p-5 rounded-md" onSubmit={handleSubmit(handelSubmitForm)}>
            <h1 className="font-bold text-3xl text-gray-800 mb-10">
              {
                !params.id ? "Create Flight" : "Edit Flight"}
            </h1>
            <div className="flex flex-col relative">
              <input id="code" {...register('code')}
                className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                value={formData.code} type="text" name="code"
                onChange={(e) => handelChange(e)} />
                <p className="text-xs text-red-600 text-left">{errors.code?.message}</p>
              <label htmlFor="code" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900">
                Code
              </label>
            </div>
            <div className="flex flex-col mt-8 relative">
              <input id="capacity" {...register('capacity')} className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                value={formData.capacity} type="number" name="capacity"
                onChange={(e) => handelChange(e)} />
              <p className="text-xs text-red-600 text-left">{errors.capacity?.message}</p>
              <label htmlFor="capacity" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900"
              >
                Capacity
              </label>
            </div>
            <div className="flex flex-col mt-8 relative">
              <input id="departureDate"
                className="peer py-2 rounded-lg px-1 mt-1 border 
                 border-gray-500 focus:outline-none focus:ring-1 
                 focus:border-indigo-700 focus:ring-indigo-700 placeholder:transparent"
                value={formData.departureDate} type="date" name="departureDate" {...register('departureDate')} onChange={(e) => handelChange(e)} />
              <label htmlFor="departureDate" className="text-xl absolute left-1 -top-6 font-semibold text-gray-900">
                Departure Date
              </label>
            </div>
              <div className="pt-2 flex justify-center">
                <img
                  className="w-40 h-50"
                  src={image}
                  alt="No image selected"
                />
              </div>
              <div className="flex flex-col mt-8 relative">
                <input
                  type="file"
                  name="photo"
                  {...register('photo')}
                  accept="image/*"
                  onChange={(e) => handleChangeImage(e)
                  }
                />
              </div>
            <div className="pt-3 flex justify-end items-center space-x-2">
              <button type="submit" className="flex space-x-1 bg-gray-400 focus:outline-none hover:bg-gray-500 hover:scale-105 text-gray-800 hover:text-gray-100 transition-all ease-in-out font-semibold rounded-xl px-3 py-2">
                <span>
                  {
                    !params.id ? "Save" : "Edit"}
                </span>
              </button>
              <Link href="/" className="focus:outline-none">
                <button className="flex space-x-1 bg-gray-300 focus:outline-none hover:bg-gray-500 hover:scale-105 text-gray-800 hover:text-gray-100 transition-all ease-in-out font-semibold rounded-xl px-3 py-2">
                  <span>Cancel</span>
                </button>
              </Link>
            </div>
          </form>
        </motion.div>
      }
    </>
  )
}

export default FlightForm
