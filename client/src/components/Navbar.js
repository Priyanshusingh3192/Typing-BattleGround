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

export default function NavbarForDropdownWithMultipleLanguages() {
    const [openNav, setOpenNav] = React.useState(false);
    const { newUser } = useContext(User);

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
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Welcome
                        </a>
                    </Typography>
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Create Room
                        </a>
                    </Typography>
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Join Room
                        </a>
                    </Typography>
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Play As A Guest
                        </a>
                    </Typography>
                </ul>
            ) : (
                <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Welcome
                        </a>
                    </Typography>
                    <Typography as="li" variant="small" color="blue-gray" className="p-2 font-medium hover:bg-blue-100 rounded-lg transition-all duration-200">
                        <a href="#" className="flex items-center">
                            Play As A Guest
                        </a>
                    </Typography>
                </ul>
            )}
        </>
    );

    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <div as="a" href="#" className="mr-4 cursor-pointer py-1.5 text-black text-2xl">
                    Typing Battleground
                </div>

                {/* Navbar items visible on larger screens */}
                <div className="mr-4 hidden lg:block">{navList}</div>

                {/* Login and SignUp buttons outside Collapse */}
                <div className="flex items-center gap-2">
                    <Button variant="gradient" size="sm" className="flex items-center gap-2">
                        <i className="fa fa-user-plus"></i> {/* SignUp icon */}
                        SignUp
                    </Button>
                    <Button variant="gradient" size="sm" className="flex items-center gap-2">
                        <i className="fa fa-sign-in-alt"></i> {/* Login icon */}
                        Login
                    </Button>

                    {/* Hamburger Icon to open the Collapse on Mobile */}
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

                    <Button
                        variant="gradient"
                        size="sm"
                        className="flex items-center justify-center gap-2 rounded-full bg-white p-2 text-white shadow-md hover:bg-gray-200 text-xl"
                    >
                        <i className="fa fa-user-circle"></i> {/* Profile icon */}
                    </Button>
                </div>
            </div>

            {/* Collapse component for mobile view */}
            <Collapse open={openNav}>
                {navList}
            </Collapse>
        </Navbar>
    );
}
