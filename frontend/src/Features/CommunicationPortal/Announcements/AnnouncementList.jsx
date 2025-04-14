import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../Components/FormComponent/ButtonComponent/Button";
import { FaPlus } from "react-icons/fa";
import { TbFlag3 } from "react-icons/tb";
import { LuBell } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";

//  Created By Firoj Hasan
const AnnouncementList = () => {
    const [activeTab, setActiveTab] = useState(1);
    const members = [
        { name: 'Md. Mahafujul Islam', userName: 'mahfujul.islam000@gmail.com', contact: '01780963872', type: 'Flat Owner', email: 'mahfujul.islam000@gmail.com', role: 'Doctor', tower: 'Sotorupa', floor: '5', unit: 'B1', action: 'Active', image: './user.jpg' },
        { name: 'Mst. Sumaiya Akter', userName: 'mahfujul.islam000@gmail.com', contact: '01880963872', type: 'Unit Staff', email: 'mahfujul.islam000@gmail.com', role: 'Engineer', tower: 'Showa', floor: '3', unit: 'C2', action: 'Active', image: './user.jpg' },
        { name: 'Md. Ashiqur Rahman', userName: 'mahfujul.islam000@gmail.com', contact: '01980963872', type: 'Unit Staff', email: 'mahfujul.islam000@gmail.com', role: 'Service', tower: 'Shoper Nir', floor: '5', unit: 'D3', action: 'InActive', image: './user.jpg' },
    ];

    const filterTable = () => {
        return members.filter(member =>
            member.name.toLowerCase() ||
            member.userName.toLowerCase()
        );
    };
    return (
        <div className="p-[14px] h-full">
            <div className="container">
                <div className="pb-4 ">
                    <div className="flex justify-between items-center py-4 r">
                        <div>
                            <p className="text-[24px] font-semibold">Announcements List</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                                <label className="ml-2 mb-[3px] text-[16px] text-[#3D9D9B]">My Post</label> </div>
                            <div className="flex items-center bg-white rounded border border[#E2E8F0] shadow-sm  py-[8px] px-[8px]">
                                <p className=" pr-[20px] text-[16px] text-[#3D9D9B]">Select Type</p>
                                <img src="./filter-icon/arrow-up-down-line.png" alt="Arrow Icon" className="" />
                            </div>
                            <div className="flex items-center bg-white rounded border border[#E2E8F0] shadow-sm  py-[8px] px-[8px]">
                                <p className=" pr-[20px] text-[16px] text-[#3D9D9B]">Select Type</p>
                                <img src="./filter-icon/arrow-up-down-line.png" alt="Arrow Icon" className="" />
                            </div>
                            <div className="flex items-center bg-white rounded border border-[#E2E8F0] shadow-sm py-[8px] px-[8px]">
                                <img src="./filter-icon/filter-2-line.png" alt="Filter Icon" className=" mr-2" />
                                <input
                                    type="text"
                                    name="search"
                                    className="outline-none  placeholder-[#3D9D9B] custom-placeholder"
                                    placeholder="Search list..."
                                />
                            </div>
                            <div className="flex items-center">
                                <img src="./filter-icon/filter-3-line.png" alt="Filter Icon" className="h-[24px] w-[24px]" />
                            </div>
                            <Link>
                                <Button
                                    size="small"
                                    className="flex items-center justify-between text-sm font-medium bg-[#3D9D9B] text-white hover:bg-[#34977A] transition-all duration-300 px-4 py-2 rounded"
                                >
                                    <FaPlus className="mr-2" />
                                    Create Announcements
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="  rounded-[27px]  bg-[#FFFFFF]  rounded">
                    <div className="p-4 ">
                        <div className="flex  mb-4 bg-[#3C9D9B1A]">
                            <button
                                className={`flex-1 w-full py-2 font-[600] ${activeTab === 1 ? "border border-[#3D9D9B] " : "border border-[#fff]"
                                    }`}
                                onClick={() => setActiveTab(1)}
                            >
                                On Going
                            </button>
                            <button
                                className={`flex-1 w-full py-2 font-[600] ${activeTab === 2 ? "border border-[#3D9D9B] " : "border border-[#fff]"
                                    }`}
                                onClick={() => setActiveTab(2)}
                            >
                                Upcoming
                            </button>
                            <button
                                className={`flex-1 w-full py-2 font-[600] ${activeTab === 3 ? "border border-[#3D9D9B] " : "border border-[#fff]"
                                    }`}
                                onClick={() => setActiveTab(3)}
                            >
                                Expired
                            </button>

                        </div>

                        {/* Tab Content */}
                        <div className="mx-auto">
                            {activeTab === 1 && (
                                <div >
                                    <div className="mx-auto">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <img src="./admin.jpg" className="w-[24px] h-[24px] border-[#3D9D9B] border-[1px] rounded-full" alt="Admin Avatar" />
                                                    <div>
                                                        <h2 className="text-[#3d9d9b] text-[16px]">Md. Firoj Hasan</h2>
                                                        <p className="text-[#3d9d9b] text-[11px]">Super Admin</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <div>                                                <TbFlag3 className="w-[18px] h-[18px] mx-[6px] " />
                                                </div>
                                                <div className="flex items-center mx-[6px]"> <LuBell className="w-[18px] h-[18px]  " /> <span>30</span></div>

                                                <div>                                                <HiDotsHorizontal className="w-[18px] h-[18px] mx-[6px] " />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 2 && (
                                <div>
                                    <div className="bg-[#FFFFFF]">
                                        <div className="mx-auto">

                                            <div>
                                                <table className="w-full text-sm text-left rtl:text-right">
                                                    <thead className="bg-[#3C9D9B1A] shadow-lg border-b border-[#E2E8F0]">
                                                        <tr>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Name</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Contact</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Type</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Email</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Role</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filterTable().map((member, index) => (
                                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                                <th scope="row" className="px-3 py-[10px] font-medium flex items-center">
                                                                    <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full mx-2" />
                                                                    {member.name}
                                                                </th>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.contact}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.type}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.email}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.role}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div>
                                    <div className="bg-[#FFFFFF]">
                                        <div className="mx-auto">

                                            <div>
                                                <table className="w-full text-sm text-left rtl:text-right">
                                                    <thead className="bg-[#3C9D9B1A] shadow-lg border-b border-[#E2E8F0]">
                                                        <tr>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Name</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Contact</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Type</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Email</th>
                                                            <th scope="col" className="px-3 font-[700] py-[11px] text-[16px] text-[#14181F]  text-left">Role</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filterTable().map((member, index) => (
                                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                                <th scope="row" className="px-3 py-[10px] font-medium flex items-center">
                                                                    <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full mx-2" />
                                                                    {member.name}
                                                                </th>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.contact}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.type}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.email}</td>
                                                                <td className="px-3 py-[8px] text-[14px]  text-left">{member.role}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementList;
