import {
  BiMenu,
  BiSearch,
  BiUser,
  BiUserPlus,
  BiStar,
  BiExit,
  BiChevronRight,
  BiLeftArrowAlt,
} from "react-icons/bi";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Messages, Notification } from "~/components/main";
import { Avatar, SearchInput, ThemeToggler } from "~/components/shared";
import { LOGIN, REGISTER, SUGGESTED_PEOPLE } from "~/constants/routes";
import logo from "~/images/anjay100.png";
import { IUser } from "~/types/types";

interface IProps {
  isAuth: boolean;
  theme: string;
  auth: IUser;
  openModal: () => void;
}

const NavBarMobile: React.FC<IProps> = ({ theme, isAuth, auth, openModal }) => {
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const onClickMenuItem = () => {
    setOpenMenu(false);
  };

  const clickSearchItemCallback = (user: IUser) => {
    setOpenSearch(false);
    history.push(`/user/${user.username}`);
  };

  return isOpenSearch ? (
    <div className="fixed top-0 left-0 flex w-full items-center bg-indigo-700 z-9999 py-2 pr-2 shadow-xl">
      <div
        className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-500"
        onClick={() => setOpenSearch(false)}
      >
        <BiLeftArrowAlt className="text-white" style={{ fontSize: "18px" }} />
      </div>
      <SearchInput
        clickItemCallback={clickSearchItemCallback}
        inputClassName="w-full"
      />
    </div>
  ) : (
    <nav className="contain flex justify-between z-9999 align-center w-100 border-b bg-white dark:bg-indigo-1000 text-gray-700 h-60px py-2 fixed top-0 left-0 w-full border-gray-200 laptop:shadow-sm dark:border-gray-800">
      <div className="flex items-center space-x-8">
        {/* ---- LOGO -------- */}
        <Link
          to={{
            pathname: "/",
            state: { from: pathname },
          }}
        >
          <img
            src={logo}
            alt=""
            className="w-20"
            style={{ filter: `brightness(${theme === "dark" ? 3.5 : 1})` }}
          />
        </Link>
      </div>
      {/* ---- NAVICONS FOR MOBILE ---- */}
      <div className="flex items-center space-x-2 laptop:hidden">
        {isAuth && (
          <>
            <div className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-indigo-1100">
              <Messages isAuth={isAuth} />
            </div>
            <div className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200  dark:hover:bg-indigo-1100">
              <Notification isAuth={isAuth} />
            </div>
          </>
        )}
        <div
          className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
          onClick={() => setOpenSearch(true)}
        >
          <BiSearch className="text-xl" />
        </div>
        <div
          className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
          onClick={() => setOpenMenu(true)}
        >
          <BiMenu className="text-xl" />
        </div>
      </div>
      {/* ---- NAV DRAWER FOR MOBILE --- */}
      <div
        className={`flex flex-col w-full h-screen fixed top-0 right-0 transition-transform  transform ${
          isOpenMenu ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-indigo-1000 laptop:hidden`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="dark:text-white">Menu</h1>
            <ThemeToggler />
          </div>
          <div
            className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:text-white dark:hover:bg-indigo-1100"
            onClick={() => setOpenMenu(false)}
          >
            <CloseOutlined className="text-xl" />
          </div>
        </div>
        {isAuth ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            <li className="px-4 py-3 pb-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <Link
                className="flex font-medium dark:text-indigo-400"
                onClick={onClickMenuItem}
                to={`/user/${auth.username}`}
              >
                <Avatar
                  url={auth.profilePicture?.url}
                  size="lg"
                  className="mr-3"
                />
                <div className="flex flex-col">
                  <span>{auth.username}</span>
                  <span className="text-gray-400 text-xs">View Profile</span>
                </div>
              </Link>
            </li>
            <li className="p-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <Link
                className="flex items-center text-black dark:text-white"
                onClick={onClickMenuItem}
                to={`/user/${auth.username}/following`}
              >
                <BiUser
                  className="text-indigo-700 text-2xl dark:text-indigo-400"
                  style={{ marginRight: "25px" }}
                />
                <h6 className="text-sm">Following</h6>
              </Link>
            </li>
            <li className="p-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <Link
                className="flex items-center text-black dark:text-white"
                onClick={onClickMenuItem}
                to={`/user/${auth.username}/followers`}
              >
                <BiUser
                  className="text-indigo-700 text-2xl dark:text-indigo-400"
                  style={{ marginRight: "25px" }}
                />
                <h6 className="text-sm">Followers</h6>
              </Link>
            </li>
            <li className="p-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <Link
                className="flex items-center text-black dark:text-white"
                onClick={onClickMenuItem}
                to={`/user/${auth.username}/bookmarks`}
              >
                <BiStar
                  className="text-indigo-700 text-2xl dark:text-indigo-400"
                  style={{ marginRight: "25px" }}
                />
                <h6 className="text-sm">Bookmarks</h6>
              </Link>
            </li>
            <li className="p-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <Link
                className="flex items-center text-black dark:text-white"
                onClick={onClickMenuItem}
                to={SUGGESTED_PEOPLE}
              >
                <BiUserPlus
                  className="text-indigo-700 text-2xl dark:text-indigo-400"
                  style={{ marginRight: "25px" }}
                />
                <h6 className="text-sm">Suggested People</h6>
              </Link>
            </li>
            <li className="p-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100">
              <div
                className="flex items-center text-black dark:text-white"
                onClick={() => {
                  openModal();
                  setOpenMenu(false);
                }}
              >
                <BiExit
                  className="text-red-500 text-2xl"
                  style={{ marginRight: "25px" }}
                />
                <h6 className="text-sm text-red-500">Logout</h6>
              </div>
            </li>
          </ul>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            <li className="px-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100 flex items-center justify-start">
              <BiChevronRight className="dark:text-white" />
              <Link
                className="p-4 font-medium dark:text-indigo-400 flex-grow"
                to={LOGIN}
              >
                Login
              </Link>
            </li>
            <li className="px-4 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-1100 flex items-center justify-start">
              <BiChevronRight className="dark:text-white" />
              <Link
                className="p-4 font-medium dark:text-indigo-400 flex-grow"
                to={REGISTER}
              >
                Register
              </Link>
            </li>
          </ul>
        )}
        {/* --- COPYRIGHT -- */}
        <span className="text-gray-400 text-xs absolute bottom-8 left-0 right-0 mx-auto text-center">
          &copy;Copyright {new Date().getFullYear()} Socialo
        </span>
      </div>
    </nav>
  );
};

export default NavBarMobile;
