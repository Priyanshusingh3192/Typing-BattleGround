import React, { useContext } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { User } from "../context/User";

import {
    Bars3Icon,
    ChevronDownIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


export default function NavbarForDropdownWithMultipleLanguages() {
    const [openMenu, setOpenMenu] = React.useState(false);
    const [openNav, setOpenNav] = React.useState(false);
    const [lang, setLang] = React.useState("English");

    const { newUser } = useContext(User);
    const navigate = useNavigate();

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <>
            {newUser.accessToken ? (
                <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
                    <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-blue-500 to-green-500 hover:bg-blue-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="/welcome2" className="flex items-center text-black">
                            Welcome
                        </a>
                    </li>
                    <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-purple-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="create-room" className="flex items-center text-black">
                            Create Room
                        </a>
                    </li>
                    <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-yellow-500 to-orange-500 hover:bg-orange-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="join-room" className="flex items-center text-black">
                            Join Room
                        </a>
                    </li>
                    <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-red-500 to-pink-500 hover:bg-red-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="play-random" className="flex items-center text-black">
                            Play Online
                        </a>
                    </li>
                </ul>
            ) : (
                <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
                    <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-gray-500 to-blue-500 hover:bg-gray-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="/" className="flex items-center text-black">
                            Welcome
                        </a>
                    </li>
                    {/* <li className="w-40 h-12 flex justify-center items-center text-black font-medium bg-gradient-to-r from-teal-500 to-cyan-500 hover:bg-teal-600 rounded-lg shadow-lg transition-all duration-200">
                        <a href="play-random" className="flex items-center text-black">
                            Play Online
                        </a>
                    </li> */}
                </ul>
            )}
        </>
    );





    return (
        <Navbar className="mx-auto  px-4 py-2 lg:px-8 lg:py-4"> {/* max-w-screen-xl */}
            <div className="flex items-center justify-between text-blue-gray-900">
                <div as="a" href="#" className="mr-4 cursor-pointer py-1.5 text-black text-2xl text-bold">
                    Typing Battleground
                </div>
                <div className="mr-4 hidden lg:block">{navList}</div>
                <div className="hidden flex-wrap items-center gap-2 lg:flex">
                    {newUser.accessToken ? (
                        <>
            
                            <Button
                                variant="gradient"
                                size="sm"
                                className="w-40 h-12 flex items-center justify-center gap-2  bg-white p-2 text-white shadow-md hover:bg-red-200 "
                                onClick={() => {
                                    // Logout logic here
                                    // Clear user data and redirect to login
                                    // logoutUser(); // Add your logout function
                                    navigate("/login");
                                }}
                            >
                                <i className="fa fa-sign-out-alt"></i> {/* Logout icon */}
                                Logout
                            </Button>
                            
                            <Button
                                variant="gradient"
                                size="sm"
                                className="w-12 h-12 flex items-center justify-center gap-2 rounded-full bg-white p-2 text-white shadow-md hover:bg-gray-200 text-xl"
                                onClick={() => navigate("/profile")}
                            >
                                <i className="fa fa-user-circle"></i> {/* Profile icon */}
                            </Button>
                        </>

                    ) : (
                        <>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="h-12 flex items-center gap-2"
                                onClick={() => navigate("/signup")}
                            >
                                <i className="fa fa-user-plus"></i> {/* SignUp icon */}
                                SignUp
                            </Button>
                            <Button variant="gradient" size="sm" className="h-12 flex items-center gap-2"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fa fa-sign-in-alt"></i> {/* Login icon */}
                                Login
                            </Button>
                        </>
                    )}


                </div>
                <IconButton
                    variant="text"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}

                </IconButton>
            </div>
            <Collapse open={openNav}>
                {navList}
                <div className="flex w-full flex-nowrap items-center gap-x-4 lg:hidden">

                    {newUser.accessToken ? (
                        <>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="flex items-center justify-center gap-2 rounded-full bg-white p-2 text-white shadow-md hover:bg-gray-200 text-xl"
                                onClick={() => navigate("/profile")}
                            >
                                <i className="fa fa-user-circle"></i> {/* Profile icon */}
                            </Button>

                            <Button
                                variant="gradient"
                                size="sm"
                                className="flex items-center justify-center gap-2 rounded-full bg-white p-2 text-white shadow-md hover:bg-red-200 text-xl"
                                onClick={() => {
                                    // Logout logic here
                                    // Clear user data and redirect to login
                                    // logoutUser(); // Add your logout function
                                    navigate("/login");
                                }}
                            >
                                <i className="fa fa-sign-out-alt"></i> {/* Logout icon */}
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="gradient" size="sm" className="flex items-center gap-2"
                                onClick={() => navigate("/signup")}
                            >
                                <i className="fa fa-user-plus"></i> {/* SignUp icon */}
                                SignUp
                            </Button>
                            <Button variant="gradient" size="sm" className="flex items-center gap-2"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fa fa-sign-in-alt"></i> {/* Login icon */}
                                Login
                            </Button>
                        </>

                    )}
                </div>
            </Collapse>
        </Navbar>
    );
}