import React, { useContext } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { User } from "../context/User";

import {
    Bars3Icon,
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
                <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                    <li>
                        <a
                            href="/welcome2"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                            <span className="mr-2">
                                <i className="fas fa-home"></i>
                            </span>
                            Welcome
                        </a>
                    </li>
                    <li>
                        <a
                            href="create-room"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                        >
                            <span className="mr-2">
                                <i className="fas fa-plus-circle"></i>
                            </span>
                            Create Room
                        </a>
                    </li>
                    <li>
                        <a
                            href="join-room"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-green-600 hover:bg-green-50 rounded-md"
                        >
                            <span className="mr-2">
                                <i className="fas fa-sign-in-alt"></i>
                            </span>
                            Join Room
                        </a>
                    </li>
                    <li>
                        <a
                            href="play-random"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-red-600 hover:bg-red-50 rounded-md"
                        >
                            <span className="mr-2">
                                <i className="fas fa-gamepad"></i>
                            </span>
                            Play Online
                        </a>
                    </li>
                </ul>
            ) : (
                <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                    <li>
                        <a
                            href="/"
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                            <span className="mr-2">
                                <i className="fas fa-home"></i>
                            </span>
                            Welcome
                        </a>
                    </li>
                </ul>
            )}
        </>
    );

    return (
        <Navbar className="mx-auto px-4 py-2 lg:px-8 lg:py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-semibold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        Typing Battleground
                    </Typography>
                </div>
                <div className="mr-4 hidden lg:block">{navList}</div>
                <div className="hidden flex-wrap items-center gap-3 lg:flex">
                    {newUser.accessToken ? (
                        <>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </Button>
                            <Button
                                variant="filled"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
                                onClick={() => navigate("/profile")}
                            >
                                <i className="fas fa-user-circle"></i>
                                Profile
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
                                onClick={() => navigate("/signup")}
                            >
                                <i className="fas fa-user-plus"></i>
                                Sign Up
                            </Button>
                            <Button
                                variant="filled"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fas fa-sign-in-alt"></i>
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
                                variant="filled"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
                                onClick={() => navigate("/profile")}
                            >
                                <i className="fas fa-user-circle"></i>
                                Profile
                            </Button>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200"
                                onClick={() => navigate("/signup")}
                            >
                                <i className="fas fa-user-plus"></i>
                                Sign Up
                            </Button>
                            <Button
                                variant="filled"
                                size="sm"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
                                onClick={() => navigate("/login")}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </Collapse>
        </Navbar>
    );
}