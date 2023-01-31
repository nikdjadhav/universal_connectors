import React, { useState, useEffect } from "react";
import Image from "next/image";
//import images
import avatar1 from "/public/images/users/avatar-1.jpg";
import Link from "next/link";

// import { TkDropdown, TkDropdownItem, TkDropdownMenu, TkDropdownToggle } from "../../TkDropdown";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import useGlobalStore from "../../../utils/globalStore";
import { TkDropdown, TkDropdownItem, TkDropdownMenu, TkDropdownToggle } from "@/globalComponents/TkDropdown";
import useGlobalStore from "@/utils/globalStore";

const themeModeTypes = {
  LIGHTMODE: "light",
  DARKMODE: "dark",
};

const ProfileDropdown = () => {
  const [setUserAuthenticated, setUserSessionData] = useGlobalStore((state) => [
    state.setUserAuthenticated,
    state.setUserSessionData,
  ]);
  const router = useRouter();
  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  //change theme mode
  const [mode, setMode] = React.useState(themeModeTypes["LIGHTMODE"]);

  function changeHTMLAttribute(attribute, value) {
    if (document && document.documentElement) document.documentElement.setAttribute(attribute, value);
  }
  const changeThemeMode = () => {
    // if darkmode is selected then set mode variable to lightmode as on click we need to set theme mode to light
    // suppose user is in dark mode and when he click the icon he need to go in light mode
    // when it is dark mode we set mode variable to light mode so when user clicks the onclick event below in buton will set the mode to light
    if (mode === themeModeTypes["DARKMODE"]) {
      changeHTMLAttribute("data-layout-mode", themeModeTypes["LIGHTMODE"]);
      setMode(themeModeTypes["LIGHTMODE"]);
    } else {
      changeHTMLAttribute("data-layout-mode", themeModeTypes["DARKMODE"]);
      setMode(themeModeTypes["DARKMODE"]);
    }
  };

  const signOutHandler = async () => {
    // setUserAuthenticated(false);
    // setUserSessionData(null);
    // // dont keep redirect to false, as it creates a problem currently
    // // if we keep redirect redirect to false, it dont refresh the tab and setuserauthenticated cals with false, this rerender the Auth Component in _app.js,
    // // and useSession hooks returns the cached version of session, though user gets logged out.
    // // so we need to refresh the page and take user to login screen
    // //TODO: its a workarounnd but later may find some other solution
    // await signOut({ callbackUrl: "/login" });
    localStorage.removeItem("loginCredentials");
    router.push("/login");
  };
  return (
    <>
      <TkDropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
        <TkDropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            {/* <img
              className="rounded-circle "
              src={avatar1}
              alt="Header Avatar"
            /> */}
            <Image
              src={avatar1}
              alt="user avatar"
              // height={22}
              className="rounded-circle header-profile-user"
              placeholder="blur"
              // layout="responsive"
            />
            {/* <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {userName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                Founder
              </span>
            </span> */}
          </span>
        </TkDropdownToggle>
        <TkDropdownMenu className="dropdown-menu-end">
          {/* <h6 className="dropdown-header">Welcome Nancy !</h6> */}
          <Link href="/profile">
            {/* <a> */}
            <TkDropdownItem>
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Profile</span>
            </TkDropdownItem>
            {/* </a> */}
          </Link>
          {/* <TkDropdownItem onClick={changeThemeMode}>
            <div>
              {mode === themeModeTypes["DARKMODE"] ? (
                <>
                  <i className="bx bx-sun text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Light Mode</span>
                </>
              ) : (
                <>
                  <i className="bx bx-moon text-muted fs-16 align-middle me-1"></i>
                  <span className="align-middle">Dark Mode</span>
                </>
              )}
            </div>
          </TkDropdownItem> */}
          {/* <DropdownItem href="/apps-chat">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Messages</span>
          </DropdownItem> */}
          {/* <DropdownItem href="#">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Taskboard</span>
          </DropdownItem> */}
          {/* <DropdownItem href="/pages-faqs">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Help</span>
          </DropdownItem> */}
          <div className="dropdown-divider"></div>
          {/* <DropdownItem href="/pages-profile">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </DropdownItem> */}
          {/* <DropdownItem href="/pages-profile-settings">
            <span className="badge bg-soft-success text-success mt-1 float-end">New</span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Settings</span>
          </DropdownItem> */}
          {/* <DropdownItem href="/auth-lockscreen-basic">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle">Lock screen</span>
          </DropdownItem> */}
          {/* <Link href="/login">
            <a> */}
          <TkDropdownItem onClick={signOutHandler}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </TkDropdownItem>
          {/* </a>
          </Link> */}
        </TkDropdownMenu>
      </TkDropdown>
    </>
  );
};

export default ProfileDropdown;
