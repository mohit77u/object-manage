import React, { useState } from 'react'
import { valueTypes } from './common/common';

export default function App() {
    const [editField, setEditField] = useState(false)
    const [formData, setFormData] = useState([
        {
            label: 'Person main',
            type: '',
            required: false,
            'subMenus': [
                {
                    label: 'Person sub',
                    type: '',
                    required: false,
                },
            ],
        },
    ])

    // handle add main rows
    const addMainRow = (e) => {
        e.preventDefault();
        
        const rowsInput = {
            label: 'Person ' + formData?.length,
            type: '',
            required: false,
            subMenus: [],
            insideSubMenus: [],
        }
        setFormData([...formData, rowsInput])
    }

    // handle delete main rows
    const deleteMainRow = (index) => {
        if(formData.length > 1) {
            const rows = [...formData];
            rows.splice(index, 1);
            setFormData(rows);
        }
    }

    // handle add sub rows
    const addSubRow = (e, index) => {
        let FD = formData
        let mainIndex = FD[index]
        let subRows = mainIndex?.subMenus;

        const rowsInput = {
            label: 'Person Sub ' + (parseInt(subRows?.length) + 1 ),
            type: '',
            required: false,
        }
        
        subRows = [...subRows, rowsInput]
        mainIndex.subMenus = subRows
        FD[index] = mainIndex
        console.log(FD)
        // console.log({...formData[index], mainIndex})
        setFormData(FD)
    }

    // handle change
    const handleChange = (e, index, type) => {
        if(type === 'main-row') {
            let FD = formData;
            let mainIndex = FD[index];
            if(e.target.type === 'checkbox') {
                mainIndex[e.target.name] = e.target.checked;
            } else {
                mainIndex[e.target.name] = e.target.value;
            }

            FD[index] = mainIndex
            setFormData(FD)
        }
    }

    // handle change
    const handleSubRowChange = (e, index, subRowIndex) => {
        console.log(e, index, subRowIndex)
        let FD = formData
        let mainIndex = FD[index]
        let subRows = mainIndex?.subMenus;
        let subRow = subRows[subRowIndex];
        if(e.target.type === 'checkbox') {
            subRow[e.target.name] = e.target.checked;
        } else {
            subRow[e.target.name] = e.target.value;
        }
        
        FD[index] = mainIndex
        console.log(FD)
    }

    // delete sub row
    const deleteSubRow = (index, subIndex) => {
        let FD = formData
        let mainIndex = FD[index]
        let subRows = mainIndex?.subMenus;

        subRows.splice(subIndex, 1);
        console.log(FD);
        setFormData(FD);
    }

    return (
        <div className='app flex justify-center items-center min-h-screen'>
            <div className="container mx-auto lg:w-6/12 md:w-8/12 sm:w-10/12 w-11/12 bg-white rounded shadow p-6 border border-gray-200">
                <div className="p-5 bg-gray-100 rounded">
                    <div className="top flex justify-between items-center">
                        <h2 className='text-gray-500 text-lg font-semibold'>Field name and type</h2>
                        <button className='text-gray-500 text-[30px] px-2' onClick={(e) => {addMainRow(e)}}>+</button>
                    </div>

                    {/* main rows */}
                    <div className="rows flex flex-col gap-3 py-3">
                        {formData?.map((data, index) => (
                            <div className="main-row" key={index}>
                                {/* main rows */}
                                <div className="group flex justify-between items-center p-3 hover:bg-gray-200 rounded">
                                    <div className="left flex items-center gap-4">
                                        <div className="number text-gray-500 text-lg">{index + 1}</div>
                                        {editField === 'edit_main_' + index ? <>
                                            <input type="text" defaultValue={data?.label} name='label' className='px-2 py-2 border border-gray-100 rounded focus:outline-none bg-white focus:ring-0 focus:border-2 focus:border-blue-600' onBlur={() => {setEditField(false)}} onChange={(e) => handleChange(e, index, 'main-row')} />
                                        </> : <>
                                            <h4 className='text-gray-600 text-[22px] font-medium' onClick={() => {setEditField('edit_main_' + index)}} >{data?.label}</h4>
                                        </>}
                                        <select name="type" id="type" className='bg-gray-300 p-1.5 text-gray-600 rounded focus:outline-none' onChange={(e) => handleChange(e, index, 'main-row')}>
                                            {valueTypes?.map((item,index) => (
                                                <option value={item.value} key={index}>{item.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="group-hover:flex right hidden items-center gap-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" name='required' className="sr-only peer" onChange={(e) => handleChange(e, index, 'main-row')} />
                                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900">Required</span>
                                        </label>
                                        <button className='text-gray-500 bg-white text-[20px] px-2' onClick={(e) => {addSubRow(e, index)}}>+</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={(e) => {deleteMainRow(index)}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>  
                                </div>

                                {/* sub rows */}
                                {data?.subMenus?.map((subMenu, s) => (
                                    <div className="group flex justify-between items-center mx-12 mt-3 p-3 hover:bg-gray-200 rounded" key={s}>
                                        <div className="left flex items-center gap-4">
                                            {editField === 'edit_sub_' + s ? <>
                                                <input type="text" defaultValue={subMenu?.label} name='label' className='px-2 py-2 border border-gray-100 rounded bg-white focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-600' onBlur={() => {setEditField(false)}} onChange={(e) => handleSubRowChange(e, index, s)} />
                                            </> : <>
                                                <h4 className='text-gray-600 text-[22px] font-medium' onClick={() => {setEditField('edit_sub_' + s)}} >{subMenu?.label}</h4>
                                            </>}
                                            <select name="type" id="type" className='bg-gray-300 p-1.5 text-gray-600 rounded focus:outline-none' onChange={(e) => handleSubRowChange(e, index, s)}>
                                                {valueTypes?.map((item,index) => (
                                                    <option value={item.value} key={index}>{item.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="group-hover:flex right hidden items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" name="required" className="sr-only peer" onChange={(e) => handleSubRowChange(e, index, s)} />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900">Required</span>
                                            </label>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={(e) => {deleteSubRow(index, s)}}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </div>  
                                    </div>
                                ))}

                                {/* inside sub rows */}
                                {data?.insideSubMenus?.map((insideSubMenu, i) => (
                                    <div className="group flex justify-between items-center mx-16 mt-3 p-3 hover:bg-gray-200 rounded" key={i}>
                                        <div className="left flex items-center gap-4">
                                            <h4 className='text-gray-600 text-[22px] font-medium'>{insideSubMenu?.label}</h4>
                                            <select value={insideSubMenu?.type} name="type" id="type" className='bg-gray-300 p-1.5 text-gray-600 rounded focus:outline-none'>
                                                {valueTypes?.map((item,index) => (
                                                    <option value={item.value} key={index}>{item.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="group-hover:flex right hidden items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900">Required</span>
                                            </label>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </div>  
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
