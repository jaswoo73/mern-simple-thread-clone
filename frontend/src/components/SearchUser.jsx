import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Link } from "react-router-dom";
import { RiUserSearchLine } from "react-icons/ri";

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [userSearchResult, setUserSearchResult] = useState(null);
  const { colorMode } = useColorMode();

  const handleSearchUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!searchUser) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users/profile/${searchUser}`);
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Found user", "success");
      setUserSearchResult(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{ base: "sm", md: "md" }}
      >
        <RiUserSearchLine size={24} />
      </Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Find User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} display={"flex"} flexDirection={"column"} gap={3}>
            <Flex gap={2}>
              <FormControl onSubmit={handleSearchUser}>
                <Input
                  type="text"
                  placeholder="Enter username or user Id"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={loading}
                onClick={handleSearchUser}
              >
                Search
              </Button>
            </Flex>
            {userSearchResult && (
              <Flex
                gap={2}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Flex
                  gap={2}
                  w={"100%"}
                  p={2}
                  borderRadius={"md"}
                  as={Link}
                  to={`${userSearchResult.username}`}
                  _hover={{
                    bg: colorMode === "dark" ? "gray.600" : "gray.300",
                  }}
                  onClick={onClose}
                  alignItems={"center"}
                >
                  <Avatar src={userSearchResult.profilePic} />
                  <Box>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      {userSearchResult.username}
                    </Text>
                    <Text color={"gray.light"} fontSize={"sm"}>
                      {userSearchResult.name}
                    </Text>
                  </Box>
                  <Center mx={2} height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <Text
                    my={"auto"}
                    color={"gray.light"}
                    fontSize={"sm"}
                    fontStyle={"italic"}
                    w={"fit-content"}
                  >
                    {userSearchResult.bio
                      ? userSearchResult.bio.length > 20
                        ? userSearchResult.bio.substring(0, 20) + "..."
                        : userSearchResult.bio
                      : "No bio provided"}
                  </Text>
                  <Center mx={2} height="50px">
                    <Divider orientation="vertical" />
                  </Center>
                  <Text my={"auto"} color={"gray.light"} fontSize={"sm"}>
                    {userSearchResult.followers.length} follower
                    {userSearchResult.followers.length > 1 ? "s" : ""}
                  </Text>
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreatePost;
