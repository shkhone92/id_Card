
"use client"
import Header from "./header/page"
import { AcademicCapIcon, ChevronDownIcon, IdentificationIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { uid } from 'uid';
import { MagnifyingGlassIcon ,BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon,TrashIcon,PencilSquareIcon,UserPlusIcon,PhotoIcon} from '@heroicons/react/20/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from "@/components/ui/button";
const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
const tabs = [
  { name: 'My Account', href: '#', icon: UserIcon, current: false },
  { name: 'Company', href: '#', icon: BuildingOfficeIcon, current: false },
  { name: 'Team Members', href: '#', icon: UsersIcon, current: true },
  { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const initialState = {
    fullname: '',
    class: '',
    dob: '',
    address: '',
    email: '',
    expiry: '',
    phoneNumber: '',
    imageurl: ''
  }

  const [state, setState] = useState(initialState)
  const [nopen, setNopen] = useState(false)
  const [idopen, setIdopen] = useState(false)
  const [file, setFile] = useState(null);
  const[error,setError] = useState({})
  const [loading, setLoading] = useState(false)
 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError({})

  };
  const uploadFile = async()=>{
    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);
  }
  const handleInput = (e) => {
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    setError("")
  }
  return (
    <div className="">
      <Header/>
<main className="sm:px-32">
<div className="flex flex-wrap gap-4 px-8 p-4">
        <button 
        onClick={() => {
          setNopen(!nopen); 
          setIdopen(false)
        }}
        className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        > <UserPlusIcon className="h-5 w-5"/> Add New Student</button>
        <button 
        onClick={()=>{
          setNopen(!nopen); 
          setIdopen(!idopen)
        }}
        className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        > <IdentificationIcon className="h-5 w-5"/>Generate ID Card</button>
        <button 
        className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        > <AcademicCapIcon className="h-5 w-5"/>All Student</button>
       
      </div>
   <div className="px-8">
    {nopen&& <form>
      <div className="space-y-5">
         <div className=" pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Student Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                Student Name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Class
              </label>
              <div className="mt-2">
                <input
                  id="class"
                  name="class"
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
               Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  onChange={(e) => handleInput(e)}
                  type="Date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                Full Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => handleInput(e)}
                  type="Email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
           
            <div className="sm:col-span-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
               Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) => handleInput(e)}
                  type="tel"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
              Expiry Date
              </label>
              <div className="mt-2">
                <input
                  id="expiry"
                  name="expiry"
                  onChange={(e) => handleInput(e)}
                  type="Date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
            {state.imageurl!==""?<img src={state.imageurl} width={330} height={200} alt='img' />: < div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-2 text-gray-900">
                    Upload Image*
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                    <div className="text-center">
                      <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-[#007066] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#007066] focus-within:ring-offset-2 hover:text-[#007066]"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="imageurl" onChange={(e) => handleFileChange(e)} type="file" accept=".jpg,.jpeg,.png,.gif" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    

                  </div>
                  <div>
                    {
                      file===null?null:   <button className={"flex w-full mt-3 justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"} type="button" onClick={uploadFile}>
                      {loading? <div className="loader"></div>:" Upload a file"}
                    </button>
                    }

                 
                     
                  </div>
                  <span className='text-red-500'>{error.imageurl}</span>
                </div>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Student
        </button>
      </div>
    </form>}

   
  

   </div>

      <div className="sm:flex sm:items-center px-8">
        <div className="sm:flex-auto mt-10">
          <h1 className="text-base font-semibold text-gray-900">Students</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the students in your account including.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <div className="mt-6 flex max-w-md gap-x-4">
        <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
              <input
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block w-full rounded-md bg-gray-300 py-1.5 pl-10 pr-3 text-base text-white outline-none placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:placeholder:text-gray-400 sm:text-sm/6 focus:outline-indigo-500"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
              />
            </div>
          </div>
              <button
                type="submit"
                className="flex-none rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Search
              </button>
            </div>
        </div>
      </div>
      <div className=" px-8 mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    S.N
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                 
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    ID Number
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="flex justify-center  py-3.5 pl-3 pr-4 sm:pr-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {people.map((person,index) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {index+1}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className=" flex gap-10">
                        <TrashIcon className="h-10 w-6 text-red-700"/> 
                        <PencilSquareIcon className="h-10 w-6 text-gray-400"/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
</main>
    </div>
  )
}

