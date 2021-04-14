import React from "react";
import Head from "next/head";
import {
  ChakraProvider,
  Container,
  Text,
  Input,
  Grid,
  Button,
  useToast,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, memo, createContext, useContext } from "react";
import ReactTags from "react-tag-autocomplete";
import { useRouter } from "next/router";
import InputRange from "react-input-range";

import genreData from "./jsonFiles/uniqueGenres.json";
import actorData from "./jsonFiles/uniqueActors.json";
import directorData from "./jsonFiles/uniqueDirectors.json";
import ethinicityData from "./jsonFiles/uniqueEthnicity.json";

export const ExtraContext = createContext();

function ExtraProvider({ children }) {
  // states
  const [genreTags, setGenreTags] = useState([]);
  const [actorTags, setActorTags] = useState([]);
  const [directorTags, setDirectorTags] = useState([]);
  const [ethnicityTags, setEthnicityTags] = useState([]);
  const [plotCount, setPlotCount] = useState(1);
  const [wordCount, setWordCount] = useState(200);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [doneSend, setDoneSend] = useState(false);

  return (
    <ExtraContext.Provider
      value={{
        genreTags,
        setGenreTags,
        setActorTags,
        actorTags,
        directorTags,
        setDirectorTags,
        ethnicityTags,
        setEthnicityTags,
        plotCount,
        setPlotCount,
        wordCount,
        setWordCount,
        email,
        setEmail,
        validEmail,
        setValidEmail,
        doneSend,
        setDoneSend,
      }}
    >
      {children}
    </ExtraContext.Provider>
  );
}

const WordRange = () => {
  const { wordCount, setWordCount } = useContext(ExtraContext);

  const onChangeWordCount = (value) => {
    // console.log("Value: ", value);
    setWordCount(value);
  };

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Text color="whiteAlpha.900" fontWeight="bold" mr="4px">
          {wordCount}
        </Text>
      </Box>
      <Slider
        flex="1"
        aria-label="slider-ex-4"
        defaultValue={wordCount}
        min={100}
        max={900}
        onChange={(value) => onChangeWordCount(value)}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6}>{/* <Box color="tomato" /> */}</SliderThumb>
      </Slider>
    </Container>
  );
};

const PlotRange = () => {
  const { plotCount, setPlotCount } = useContext(ExtraContext);

  const onChangePlotCount = (value) => {
    setPlotCount(value);
  };

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <Box>
        <Text color="whiteAlpha.900" fontWeight="bold" mr="4px">
          {plotCount}
        </Text>
      </Box>
      <Slider
        flex="1"
        aria-label="slider-ex-4"
        defaultValue={plotCount}
        min={1}
        max={5}
        onChange={(value) => onChangePlotCount(value)}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6}>{/* <Box color="tomato" /> */}</SliderThumb>
      </Slider>
    </Container>
  );
};

const GenreTags = () => {
  const allGenres = genreData;
  const { genreTags, setGenreTags } = useContext(ExtraContext);

  const onAddition = (tag) => {
    setGenreTags([...genreTags, tag]);
  };

  const onDelete = (index) => {
    let newTags = genreTags;
    newTags.splice(index, 1);
    setGenreTags(newTags);
  };

  return (
    <ReactTags
      tags={genreTags}
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
  );
};

const ActorTags = () => {
  const allActors = actorData;

  const { actorTags, setActorTags } = useContext(ExtraContext);

  const onAddition = (tag) => {
    setActorTags([...actorTags, tag]);
  };

  const onDelete = (index) => {
    let newTags = actorTags;
    newTags.splice(index, 1);
    setActorTags(newTags);
  };

  return (
    <ReactTags
      tags={actorTags}
      suggestions={allActors}
      onDelete={onDelete}
      onAddition={onAddition}
      allowNew
      placeholderText="Actors/Actresses"
      style={{
        width: "100%",
        marginRight: "5px",
      }}
    />
  );
};

const DirectorTags = () => {
  const allDirectors = directorData;
  const { directorTags, setDirectorTags } = useContext(ExtraContext);

  const onAddition = (tag) => {
    setDirectorTags([...directorTags, tag]);
  };

  const onDelete = (index) => {
    let newTags = directorTags;
    newTags.splice(index, 1);
    setDirectorTags(newTags);
  };

  return (
    <ReactTags
      tags={directorTags}
      suggestions={allDirectors}
      onDelete={onDelete}
      onAddition={onAddition}
      allowNew
      placeholderText="Director"
      style={{
        width: "100%",
        marginRight: "5px",
      }}
    />
  );
};

const EthnicityTags = () => {
  const allEthnicity = ethinicityData;
  const { ethnicityTags, setEthnicityTags } = useContext(ExtraContext);

  const onAddition = (tag) => {
    setEthnicityTags([...ethnicityTags, tag]);
  };

  const onDelete = (index) => {
    let newTags = ethnicityTags;
    newTags.splice(index, 1);
    setEthnicityTags(newTags);
  };

  return (
    <ReactTags
      tags={ethnicityTags}
      suggestions={allEthnicity}
      onDelete={onDelete}
      onAddition={onAddition}
      allowNew
      placeholderText="Ethnicity"
      style={{
        width: "100%",
        marginRight: "5px",
      }}
    />
  );
};

const emailValidate = (email) => {
  let pattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  return pattern.test(email.trim());
};

const SuccessModal = () => {
  const { doneSend, setDoneSend } = useContext(ExtraContext);
  return (
    <>
      {doneSend ? (
        <Modal
          isOpen={doneSend}
          onClose={() => {
            setDoneSend(false);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success 🚀</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You will receive an email with the plot for your inputs
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};

const ExtraUIContent = memo(() => {
  //   const { validEmail, setValidEmail, email, setEmail } =

  const {
    genreTags,
    actorTags,
    directorTags,
    ethnicityTags,
    validEmail,
    email,
    wordCount,
    plotCount,
    setGenreTags,
    setActorTags,
    setDirectorTags,
    setEthnicityTags,
    setEmail,
    setWordCount,
    setPlotCount,
    setValidEmail,
    doneSend,
    setDoneSend,
  } = useContext(ExtraContext);

  const toast = useToast();

  const toastNotification = (type, err) => {
    // const toast = useToast();

    let bgColors = {
      success: "green",
      error: "red",
      info: "yellow",
    };
    // console.log(type, err, bgColors[type]);
    toast({
      position: "bottom",
      render: () => (
        <Box color="white" p={3} backgroundColor={bgColors[type]}>
          {err}
        </Box>
      ),
    });
  };

  const sendDataToProducer = () => {
    let genre = [];
    let actors = [];
    let director = [];
    let ethnicity = [];

    if (genreTags.length > 0) {
      genreTags.forEach((value) => {
        genre.push(value["name"]);
      });
      genre = genre.join(", ");
    } else {
      genre = null;
      toastNotification("error", "Select atleast one genre");
      return null;
    }

    if (actorTags.length > 0) {
      actorTags.forEach((value) => {
        actors.push(value["name"]);
      });
      actors = actors.join(", ");
    } else {
      actors = null;
    }

    if (directorTags.length > 0) {
      directorTags.forEach((value) => {
        director.push(value["name"]);
      });
      director = director.join(", ");
    } else {
      director = null;
    }

    if (ethnicityTags.length > 0) {
      ethnicityTags.forEach((value) => {
        ethnicity.push(value["name"]);
      });
      ethnicity = ethnicity.join(", ");
    } else {
      ethnicity = null;
    }

    if (!validEmail) {
      toastNotification("error", "Email cannot be empty");
      return null;
    }

    let reqBody = JSON.stringify({
      genre: genre,
      director: director,
      cast: actors,
      ethnicity: ethnicity,
      num_plots: plotCount,
      seq_len: wordCount,
      email: email,
    });

    // console.log("Generate Email Req Body: ", reqBody);

    fetch("http://34.66.241.128:5000/kafka/returnPlotQueue", {
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
        if (data["status"] === "Pass") {
          setGenreTags([]);
          setActorTags([]);
          setDirectorTags([]);
          setEthnicityTags([]);
          setEmail("");
          setWordCount(200);
          setPlotCount(1);
          setDoneSend(true);
          toastNotification("success", data["message"]);
        } else {
          toastNotification("error", "Got an error");
        }
      });
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
    setValidEmail(emailValidate(email));
  };

  return (
    <ChakraProvider resetCSS>
      <Container
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        minHeight="100vh"
        minWidth="100%"
        backgroundColor="facebook.500"
      >
        <Head>
          <title>Extra</title>
        </Head>

        <Container
          mt="20px"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
        >
          <Container>
            <Text
              fontWeight="bold"
              textAlign="center"
              fontSize="3xl"
              color="whiteAlpha.900"
              letterSpacing="wider"
              mt="40px"
            >
              Try Extra Variations 🚀
            </Text>
          </Container>
          <Container mt="25px">
            <Container mt="5px" mb="18px">
              <Text color="whiteAlpha.900">
                Select a Genre. Based on the genre you can select the director,
                actors, and ethnicity.{" "}
              </Text>
              <Text color="whiteAlpha.900" mt="7px">
                You can also provide a word range i.e. how long must be the
                generated plot.{" "}
              </Text>
            </Container>
            <Container
              mt="20px"
              mb="15px"
              display="flex"
              flexDirection="column"
              alignItems="space-between"
              justifyContent="space-around"
            >
              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt="20px">
                <Container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <GenreTags />
                  {/* <Input placeholder="Genre" /> */}
                </Container>
                <Container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <DirectorTags />
                  {/* <Input placeholder="Director" /> */}
                </Container>
                <Container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <ActorTags />
                  {/* <Input placeholder="Actor" /> */}
                </Container>
                <Container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <EthnicityTags />
                  {/* <Input placeholder="Ethnicity" /> */}
                </Container>
              </Grid>
              <Container mt="25px">
                <Container>
                  <Text
                    fontWeight="bold"
                    textAlign="left"
                    color="whiteAlpha.900"
                    mb="5px"
                  >
                    Number of Plots
                  </Text>
                  <PlotRange />
                  {/* <Input placeholder="Number of Plots" /> */}
                </Container>
                <Container mt="10px">
                  <Text fontWeight="bold" color="whiteAlpha.900" mb="5px">
                    Words in a plot
                  </Text>
                  <WordRange />
                  {/* <Input placeholder="Words in a plot" /> */}
                </Container>
              </Container>
              <Container mt="25px">
                <Container
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Text color="whiteAlpha.900" fontSize="sm" mt="20px">
                    It might take some time to generate a response so, please,
                    provide your email address so that the plots you want to
                    generate can be mailed to you.{" "}
                  </Text>
                  {validEmail ? (
                    <Input
                      onChange={(e) => onEmailChange(e)}
                      placeholder="Email"
                      value={email}
                      mt="5px"
                      color="whiteAlpha.900"
                    />
                  ) : (
                    <Input
                      isInvalid
                      value={email}
                      errorBorderColor="crimson"
                      placeholder="Email"
                      mt="5px"
                      color="whiteAlpha.900"
                      onChange={(e) => onEmailChange(e)}
                    />
                  )}
                </Container>
              </Container>
              <Button
                variant="solid"
                size="md"
                mt="29px"
                fontWeight="bold"
                color="whiteAlpha.900"
                backgroundColor="red.700"
                bgGradient="linear(to right, green.200,blue.500)"
                onClick={sendDataToProducer}
              >
                Generate
              </Button>
            </Container>
          </Container>
        </Container>
        <SuccessModal />
      </Container>
    </ChakraProvider>
  );
});

const Extra = () => {
  return (
    <ExtraProvider>
      {/* <SuccessModal /> */}
      <ExtraUIContent />
    </ExtraProvider>
  );
};

export default Extra;
