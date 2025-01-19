
"use client"
import Header from "./header/page"
import { IdentificationIcon } from '@heroicons/react/16/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { use, useEffect, useState } from 'react'
import { MagnifyingGlassIcon, TrashIcon, PencilSquareIcon, UserPlusIcon, PhotoIcon } from '@heroicons/react/20/solid'
import axios from "axios"
import html2canvas from 'html2canvas';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const initialState = {
    fullname: '',
    course: '',
    dob: '',
    address: '',
    email: '',
    expiry: '',
    phoneNumber: '',
    imageurl: ''
  }
  const idcard = {
    studentid: 'null',
    fullname: '..',
    course: '..',
    dob: '...',
    address: '..',
    email: '...',
    expiry: '...',
    phoneNumber: '..',
    imageurl: '...'
  }
  const [state, setState] = useState(initialState)
  const [open, setOpen] = useState(false)
  const [nopen, setNopen] = useState(false)
  const [iddel, setIddel] = useState("")
  const [iddetails, setiddetails] = useState(idcard)
  const [iloader, setIloader] = useState(true)
  const [idcardshow, setIdcardshow] = useState(true)
  const [idnum, setIdnum] = useState("")
  const [student, setStudent] = useState([])
  const [idopen, setIdopen] = useState(false)
  const [file, setFile] = useState(null);
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(false)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError({})

  };

  const handleInput = (e) => {
    setState((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    setError("")
  }
  const imgUrl = (str) => {
    setState((pre) => ({ ...pre, imageurl: str }))
  }

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('/api/upload', formData).then((res) => {
      imgUrl(res.data.url)
      console.log(res.data.url);


    })
  }
  const SubmitHandle = async (e) => {
    e.preventDefault()
    await axios.post("/api/student", state).then((e) => {
      alert("data submited")
    })
  }

  const idgenerate = async () => {
    setIdcardshow(false)
    setIloader(true)
    const res = await axios.post("/api/getstudent", { "id": idnum })
    if (res.status == 200) {
      setiddetails(res.data.response)
      setIloader(false)
    }
  }


  const takeScreenshot = () => {
    html2canvas(document.querySelector("#yourDivId"), { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'IDcard.png';
      link.click();
    });
  };
const getstudent = async()=>{
  await axios.get("/api/allstudent").then((res)=>{
    setStudent(res.data.response)

  })
}

const searchUser =()=>{
  const filteredUsers = student.filter(user => user.fullname.toLowerCase().includes(name.toLowerCase()));
  setStudent(filteredUsers);
}

const deleteuser = async()=>{
  await axios.post("/api/delete",{"id":iddel}).then((res)=>{
    alert("deleted")

  })
}
 


  useEffect(() => {
    getstudent()
  },[])


  return (
    <div>
      <Header />
      <main className="sm:px-32 px-4">
        <div className="flex flex-wrap gap-4  p-4">
          <button
            onClick={() => {
              setNopen(!nopen);
              setIdopen(false)
            }}
            className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          > <UserPlusIcon className="h-5 w-5" /> Add New Student</button>
          <button
            onClick={() => {
              setNopen(false);
              setIdopen(!idopen)
            }}
            className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          > <IdentificationIcon className="h-5 w-5" />Generate ID Card</button>


        </div>

        <div>
          {nopen && <form onSubmit={SubmitHandle}>
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
                        id="course"
                        name="course"
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
                    {state.imageurl !== "" ? <img src={state.imageurl} width={330} height={200} alt='img' /> : < div className="col-span-full">
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
                          file === null ? null : <button className={"flex w-full mt-3 justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"} type="button" onClick={uploadFile}>
                            {loading ? <div className="loader"></div> : " Upload a file"}
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
          {idopen && <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div
              className="py-5"
            >
              <div className="shrink-0">

              </div>
              <div className="min-w-0 flex-1">
                <p>Student ID Card Number</p>
                <div className="mt-2 flex max-w-md gap-x-4">

                  <input

                    name="idcard"
                    onChange={(e) => setIdnum(e.target.value)}
                    type="text"
                    placeholder="Enter your numbeer"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
                  />
                  <button
                    onClick={idgenerate}
                    type="submit"
                    className="flex flex-wrap gap-2 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
            {idcardshow ? <div className="w-full p-16">
              <div className="relative mx-auto max-w-2xl rounded-[40px] bg-gradient-to-br from-[#2C3988]/80 via-[#2C3988]/20 to-[#2C3988]/80 p-[1px]">
                <div className="relative rounded-[40px] bg-[#cdcfeb] p-12">
                  <h1 className="mb-8 text-4xl font-bold text-white"></h1>
                  <p className="text-xl leading-relaxed text-gray-400">
                    AI tailors the user experience to each visitor.<br />
                    Imagine a website that remembers<br />
                    preferences, recommends relevant products.
                  </p>
                </div>
              </div>
            </div> : iloader ? <div className="loader"></div>  : <div className="space-x-3 py-4 " >
              <div className="min-w-0">
                <div className="h-72 p-3 sm:w-[540px] rounded-lg bg-slate-200" id="yourDivId">
                  <div className="bg-slate-400 rounded-xl p-2 h-16 w-full flex justify-center items-center text-white text-sm">
                    <p className="text-xl">
                      Shri Sai Baba Aadarsh Mahavidyalaya
                      College in Ambikapur

                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <img
                      alt=""
                      src="https://exn4ldkghvzvu4vw.public.blob.vercel-storage.com/Screenshot%202025-01-14%20172741-RqwgvUbyHjI21FESbE5AQtF1OJipUk.png"
                      className="size-[80px] rounded-full border-2 my-2 border-gray-800"
                    />
                    <div className="py-4">
                      <p>{iddetails.fullname}</p>
                      <p>Student</p>
                    </div>
                  </div>
                  <div className="h-10 flex justify-between">
                    <div className="details">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-1 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                              Student ID
                            </th>
                            <th
                              scope="col"
                              className="py-1 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                              Date of birth
                            </th>
                            <th
                              scope="col"
                              className="py-1 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                              Address
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {iddetails.studentid}
                            </td>
                            <td
                              className="whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {iddetails.dob}
                            </td>
                            <td
                              className="whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {iddetails.address}
                            </td>
                          </tr>
                        </tbody>
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-1 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                              Mobile No
                            </th>
                            <th
                              scope="col"
                              className="py-1 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                            >
                              Expiry Date
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {iddetails.phoneNumber}
                            </td>
                            <td
                              className="whitespace-nowrap  pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                            >
                              {iddetails.expiry}
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                    <div className="sign">
                      Signature
                    </div>

                  </div>

                </div>




              </div>
              <div className="py-2">
                <button
                  onClick={takeScreenshot}
                  className="flex-none rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >Download ID Card</button>
              </div>

            </div>}


          </div>}




        </div>

        <div className="sm:flex sm:items-center">
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
                    onChange={(e)=>{
                      setName(e.target.value)
                      }}
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
              onClick={searchUser}
                type="submit"
                className="flex-none rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root">
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
                      Address
                    </th>
                    <th scope="col" className="flex justify-center  py-3.5 pl-3 pr-4 sm:pr-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {student.map((person, index) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.fullname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.studentid}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.address}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className=" flex gap-10">
                          <TrashIcon onClick={()=>{
                            setOpen(true)
                            setIddel(person.id)
                          }} className="h-10 w-6 text-red-700" />
                          <PencilSquareIcon className="h-10 w-6 text-gray-400" />
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
      <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Delete account
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                    Are you sure you want to delete this student?.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={deleteuser}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
               
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </div>
  )
}

