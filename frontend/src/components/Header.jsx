import { Button, Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const { logout } = useLogout();
  const setAuthScreen = useRecoilValue(authScreenAtom);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Flex justifyContent="space-between" mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link as={RouterLink} to="/auth" onClick={() => setAuthScreen("login")}>
          Login
        </Link>
      )}
      <Image
        cursor="pointer"
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
          {pathname.includes("post") && (
            <Link as={RouterLink} onClick={() => navigate(-1)}>
              <IoArrowBackSharp size={24} />
            </Link>
          )}
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to="/auth"
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};
export default Header;
