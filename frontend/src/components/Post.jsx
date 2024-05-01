import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNowStrict } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("api/users/profile/" + postedBy, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy, showToast]);

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (
        !window.confirm(
          `Are you sure you want to delete this post?\nTitle: ${
            post.text.length > 20
              ? post.text.substring(0, 30) + "..."
              : post.text
          }`
        )
      )
        return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
      }
      showToast("Success", "Post deleted successfully", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (!user) return null;

  const uniqueRepliesUsers = [];

  post.replies.forEach((reply) => {
    // Check if there is already a user with the same username and userProfilePic
    const existingUserIndex = uniqueRepliesUsers.findIndex(
      (user) =>
        user.username === reply.username ||
        user.profilePic === reply.userProfilePic
    );

    if (existingUserIndex === -1) {
      // If the user is not found, add it to the uniqueRepliesUsers array
      uniqueRepliesUsers.push({
        userId: reply.userId,
        username: reply.userProfilePic === "" ? "" : reply.username,
        profilePic: reply.userProfilePic,
      });
    }
  });

  console.log(uniqueRepliesUsers);

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5} px={3} _hover={{ bg: "gray.900" }}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user.name}
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box
            w={"1px"}
            h={"full"}
            bg={"gray.light"}
            marginTop={2}
            marginBottom={2}
          ></Box>
          <Box position={"relative"} w={"full"} mt={5}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
            {uniqueRepliesUsers[0] && (
              <Avatar
                size="xs"
                name={uniqueRepliesUsers[0].username}
                src={uniqueRepliesUsers[0].profilePic}
                position={"absolute"}
                top={uniqueRepliesUsers.length <= 1 ? "10px" : "0px"}
                left="15px"
                padding="2px"
              />
            )}
            {uniqueRepliesUsers[1] && (
              <Avatar
                size="xs"
                name={uniqueRepliesUsers[1].username}
                src={uniqueRepliesUsers[1].profilePic}
                position={"absolute"}
                bottom={"0px"}
                right="-5px"
                padding={"2px"}
              />
            )}
            {uniqueRepliesUsers[2] && (
              <Avatar
                size="xs"
                name={uniqueRepliesUsers[2].username}
                src={uniqueRepliesUsers[2].profilePic}
                position={"absolute"}
                bottom={"0px"}
                left="4px"
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={"1"} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text
                fontSize={"xs"}
                width={36}
                textAlign={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNowStrict(new Date(post.createdAt))} ago
              </Text>

              {/* Only the owner of the account can access the delete button */}
              {currentUser?._id === user._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image
                src={post.img}
                alt={`post image for ${post.text}`}
                w={"full"}
                objectFit={"cover"}
              />
            </Box>
          )}
          {/* user actions icons */}
          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
export default Post;
