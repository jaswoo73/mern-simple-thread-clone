import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import animationData from "../assets/lottieFiles/NotFound.json";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ text }) => {
  const navigate = useNavigate();
  return (
    <Flex minH={"70vh"} justifyContent={"center"} alignItems={"center"} p={4}>
      <Box
        w={{ md: "400px", sm: "300px" }}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}
        gap={6}
      >
        <Lottie animationData={animationData} loop={true} />
        <Text fontSize={{ md: "2xl", sm: "xl" }} fontWeight={"bold"}>
          404 Not Found
        </Text>
        <Text fontSize={"md"}>
          Sorry, the {text} you&apos;re looking for does not exist.
        </Text>
        <Button alignSelf={"center"} w={"40%"} onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
    </Flex>
  );
};
export default ErrorPage;
