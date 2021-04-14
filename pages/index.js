import React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Container,
  Text,
  useToast,
  Button,
  Box,
  
} from "@chakra-ui/react";
import { useState } from "react";
import genreData from "./jsonFiles/uniqueGenres.json";
import ReactTags from "react-tag-autocomplete";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  const toast = useToast();

  const allGenres = genreData;
  // let reactTags = React.createRef();

  const [selectedTags, setSelectedTags] = useState([]);
  const [sendingGenerateReq, setSendingGenerateReq] = useState(false);
  const [plot, setPlot] = useState(null);

  const onAddition = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const onDelete = (index) => {
    let newTags = selectedTags;
    newTags.splice(index, 1);
    setSelectedTags(newTags);
  };

  const onTryVariationsClick = () => {
    router.push("/extra");
  };

  const sendGenerateRequest = () => {
    setSendingGenerateReq(true);

    let genres = selectedTags;

    if (genres.length > 0) {
      let listNames = [];

      genres.forEach((value, index) => {
        listNames.push(value["name"]);
      });

      listNames = listNames.join(", ");

      let reqBody = JSON.stringify({
        genre: listNames,
      });

      // console.log("Req Body: ", reqBody);

      fetch("http://34.66.241.128:5000/api/generatePlot", {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: reqBody,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log("Generated Plot: ", data);
          let genPlots = data["plots"][0];

          setPlot(genPlots);
          setSendingGenerateReq(false);
          
        });
    } else {
      toast({
        position: "bottom",
        render: () => (
          <Box color="white" p={3} backgroundColor="red">
            Select atleast genre type
          </Box>
        ),
      });
      setSendingGenerateReq(false);
    }
  };

  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>Movie Plot Generator</title>
      </Head>

      <Container
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        backgroundColor="facebook.500"
        minHeight="100vh"
        minWidth="100%"
      >
        <Container
          mt="40px"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="100%"
        >
          <Text></Text>
          <Container mb={10}>
            <Text
              fontWeight="bold"
              textAlign="center"
              fontSize="3xl"
              letterSpacing="widest"
              color="whiteAlpha.900"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt="40px"
            >
              Movie Plot Generator ⌨️
            </Text>
          </Container>
          <Container
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Container mt="5px" mb="18px">
              <Text color="whiteAlpha.700">
                Provide the Genre/s for which you would like to generate a small
                plot.{" "}
              </Text>
            </Container>
            <Container
              display="block"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Text
                mt="5px"
                mb="8px"
                color="whiteAlpha.700"
                letterSpacing="wider"
                fontSize="lg"
              >
                Genre
              </Text>
              <Container
                mt="8px"
                mb="14px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {/* <Input mr="5px"> */}
                <ReactTags
                  // ref={reactTags}
                  tags={selectedTags}
                  suggestions={allGenres}
                  onDelete={onDelete}
                  onAddition={onAddition}
                  allowNew
                  placeholderText="Genres"
                  style={{
                    width: "100%",
                    marginRight: "5px",
                  }}
                />
                {sendingGenerateReq ? (
                  <Button
                    isLoading
                    variant="outline"
                    // size="md"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="md"
                    // letterSpacing="wider"
                    backgroundColor="red.700"
                    color="white"
                    pr="-5px"
                    pl="-5px"
                    mt="8px"
                    mb="9px"
                    ml="10px"
                    onClick={sendGenerateRequest}
                  >
                    Generate
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    // size="md"
                    fontWeight="bold"
                    textAlign="center"
                    fontSize="md"
                    // letterSpacing="wider"
                    backgroundColor="red.700"
                    color="white"
                    pr="-5px"
                    pl="-5px"
                    mt="8px"
                    mb="9px"
                    ml="5px"
                    onClick={sendGenerateRequest}
                  >
                    Generate
                  </Button>
                )}
              </Container>
              {plot ? (
                <div>
                  <Text fontSize="lg" mt="5px" mb="8px" color="whiteAlpha.900">
                    Plot
                  </Text>
                  <Container
                    pt="10px"
                    pb="10px"
                    pr="10px"
                    pl="10px"
                    borderRadius="5px"
                    border="2px solid white"
                    backgroundColor="gray.700"
                  >
                    <Text color="white" textAlign="justify">
                      {plot}
                    </Text>
                  </Container>
                </div>
              ) : null}
            </Container>
          </Container>
          <Container mt="50px" mb={30}>
            <Container mt="8px" mb="14px">
              <Text
                color="orange.500"
                fontWeight="bold"
                textAlign="left"
                fontSize="2xl"
              >
                Try different variations 💻
              </Text>
              <Text color = "whiteAlpha.900" mt="8px" mb="9px">
                Try out plot generation with different permutations of Genre/s,
                Actors, Directors and Ethnicity.{" "}
              </Text>
              <Text color = "whiteAlpha.900" mt="8px" mb="9px">
                You will be asked for your Email address, once we are ready with
                the plot for your selections we will email it.{" "}
              </Text>
            </Container>
            <Container mt="8px" mb="14px">
              <Button
                variant="outline"
                size="md"
                fontWeight="bold"
                textAlign="center"
                fontSize="lg"
                color="white"
                letterSpacing="wide"
                backgroundColor="red.700"
                mt="8px"
                mb="9px"
                onClick={onTryVariationsClick}
              >
                Try Variations 🚀
              </Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </ChakraProvider>
  );
};

export default Home;
