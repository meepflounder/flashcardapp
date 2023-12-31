import React, { useState } from 'react';
import { Box, IconButton, Stack, Text, } from '@chakra-ui/react';
import backgroundImage from './backgroundImage.png';
import { PracticeButton } from './CurvedButton';
import Flashcard from './Flashcard';
import {ArrowRightIcon, ArrowLeftIcon} from '@chakra-ui/icons'
import { useFlashcardData } from './FlashcardDataContext';


const PracticePage = ({flashcardData}) => {

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [flippedCardIds, setFlippedCardIds] = useState([]);

  const handleCardFlip = (cardId) => {
    if (!flippedCardIds.includes(cardId)) {
      setFlippedCardIds([...flippedCardIds, cardId]);
    }
  };

  const handleNextCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % flashcardData.length);
    setFlippedCardIds([]);
  };

  const handlePrevCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex-1 + flashcardData.length) % flashcardData.length);
    setFlippedCardIds([]);
  }; 

  return (
    <>
      <PracticeButton to="/">Exit Practice</PracticeButton>
      <Box
        w="100wh"
        h="100vh"
        bgImage={`url(${backgroundImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton
          fontSize="3xl"
          mr="20px"
          bg="rgba(201, 189, 181, 0.25)"
          color="addButtonColor"
          aria-label="Go Right"
          icon={<ArrowLeftIcon />}
          onClick={handlePrevCard}
        />
        <Stack>
        <Flashcard
          frontContent={flashcardData[activeCardIndex].term}
          backContent={flashcardData[activeCardIndex].definition}
          isFlipped={flippedCardIds.includes(flashcardData[activeCardIndex].id)}
          onFlip={() => handleCardFlip(flashcardData[activeCardIndex].id)}
        />
        <Text 
        fontSize="xl" color="sideBarColor" align="center">Click Card to Flip</Text>
        </Stack>
        <IconButton
          fontSize="3xl"
          ml="20px"
          bg="rgba(201, 189, 181, 0.25)"
          color="addButtonColor"
          aria-label="Go Right"
          icon={<ArrowRightIcon />}
          onClick={handleNextCard}
        />
      </Box>
    </>
  );
};



export default PracticePage;
