import {
  Avatar,
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import dayjs from "dayjs";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const Message = ({ message, ownMessage }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);
  const messageTime = dayjs(new Date(message.createdAt).getTime()).format(
    "DD/MM/YY HH:mm"
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      {/* {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"300px"} bg={"blue.400"} p={2} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={currentUser.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text
            maxW={"350px"}
            bg={"gray.600"}
            p={2}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
        </Flex>
      )} */}
      <Flex
        gap={2}
        alignSelf={ownMessage ? "flex-end" : "flex-start"}
        flexDir={ownMessage ? "row" : "row-reverse"}
      >
        {message.text && (
          <VStack
            bg={ownMessage ? "green.600" : "gray.500"}
            minW={"120px"}
            p={2}
            borderRadius={"md"}
            gap={1}
          >
            <Flex alignSelf={ownMessage ? "flex-end" : "flex-start"}>
              <Text maxW={"350px"} color={"white"} fontSize={"sm"}>
                {message.text}
              </Text>
              {ownMessage && (
                <Box
                  alignSelf={"flex-end"}
                  ml={1}
                  color={message.seen ? "blue.ticks" : ""}
                  fontWeight={"bold"}
                >
                  <BsCheck2All size={16} />
                </Box>
              )}
            </Flex>
            <Text
              display={"flex"}
              alignSelf={ownMessage ? "flex-end" : "flex-start"}
              fontSize="10px"
              color="rgba(255, 255, 255, 0.689)"
              fontStyle={"italic"}
            >
              {messageTime}
            </Text>
          </VStack>
        )}
        {message.img && (
          <Flex
            mt={3}
            w={"200px"}
            alignSelf={ownMessage ? "flex-end" : "flex-start"}
            pos={"relative"}
          >
            <Image
              src={message.img}
              objectFit={"contain"}
              hidden={!imgLoaded}
              onLoad={() => setImgLoaded(true)}
              w={"100%"}
              maxH={"250px"}
              alt="Message image"
              borderRadius={4}
            />
            <Skeleton w={"200px"} h={"250px"} hidden={imgLoaded} />
            <Box
              display={"flex"}
              alignSelf={"end"}
              pos={"absolute"}
              bottom={1}
              right={1}
              hidden={!imgLoaded}
            >
              <Text
                fontSize="10px"
                color="rgba(255, 255, 255, 0.75)"
                fontStyle={"italic"}
              >
                {messageTime.split(" ")[1]}
              </Text>
              {ownMessage && (
                <Box
                  alignSelf={"flex-end"}
                  ml={1}
                  color={message.seen ? "blue.400" : ""}
                  fontWeight={"bold"}
                >
                  <BsCheck2All size={16} />
                </Box>
              )}
            </Box>
          </Flex>
        )}
        {/* {message.img && imgLoaded && (
          <Flex
            mt={5}
            w={"200px"}
            alignSelf={ownMessage ? "flex-end" : "flex-start"}
            pos={"relative"}
          >
            <Image
              src={message.img}
              objectFit={"contain"}
              w={"100%"}
              maxH={"250px"}
              alt="Message image"
              borderRadius={4}
            />
            <Text
              display={"flex"}
              alignSelf={"end"}
              fontSize="10px"
              color="rgba(255, 255, 255, 0.689)"
              fontStyle={"italic"}
              pos={"absolute"}
              bottom={1}
              right={2}
            >
              {messageTime.split(" ")[1]}
            </Text>
          </Flex>
        )} */}

        <Avatar
          src={
            ownMessage
              ? currentUser.profilePic
              : selectedConversation.userProfilePic
          }
          w={5}
          h={5}
        />
      </Flex>
    </>
  );
};
export default Message;
