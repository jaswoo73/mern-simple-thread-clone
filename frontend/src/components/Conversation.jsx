import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All, BsImageFill } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  // to avoid the "React Hooks must be called in the exact same order in every component render" warning
  const { colorMode } = useColorMode();
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useEffect(() => {
    if (
      lastMessage &&
      currentUser._id !== lastMessage.sender &&
      !lastMessage.seen
    ) {
      setHasUnreadMessages(true);
    } else {
      setHasUnreadMessages(false);
    }
  }, [lastMessage, selectedConversation, currentUser._id]);

  useEffect(() => {
    setHasUnreadMessages(false);
  }, [selectedConversation]);

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      onClick={() => {
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          username: user.username,
          userProfilePic: user.profilePic,
          mock: conversation.mock,
        });
        setHasUnreadMessages(false);
      }}
      bg={
        selectedConversation._id === conversation._id
          ? colorMode === "light"
            ? "gray.600"
            : "gray.dark"
          : ""
      }
    >
      <WrapItem>
        <Avatar
          src={user.profilePic}
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
        >
          {isOnline ? (
            <AvatarBadge boxSize="1em" bg="green.500" />
          ) : (
            <AvatarBadge boxSize="1em" bg="gray.500" />
          )}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={700} display={"flex"} alignItems={"center"}>
          {user.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Box fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender ? (
            <Box color={lastMessage.seen ? "blue.500" : ""}>
              <BsCheck2All size={16} />
            </Box>
          ) : (
            ""
          )}
          {lastMessage.text.length > 16
            ? lastMessage.text.substring(0, 16) + "..."
            : lastMessage.text ||
              (conversation.mock ? (
                ""
              ) : (
                <>
                  <BsImageFill size={16} style={{ marginLeft: "2px" }} />
                  <Text>Image</Text>
                </>
              ))}
          {hasUnreadMessages && currentUser._id !== lastMessage.sender && (
            <Text
              size={"xs"}
              color="blue.500"
              display={hasUnreadMessages ? "inline" : "none"}
            >
              New
            </Text>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};
export default Conversation;
