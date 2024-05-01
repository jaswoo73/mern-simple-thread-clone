import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Comment = ({ reply, lastReply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"} mb={lastReply ? 12 : 2}>
        <Avatar src={reply.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              <Link to={`/${reply.username}`}>{reply.username}</Link>
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>
      {!lastReply && <Divider />}
    </>
  );
};
export default Comment;
