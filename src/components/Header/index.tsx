import { Flex, Text, useColorModeValue, Box } from "@chakra-ui/react";
import ChangeColorModeButton from "../ChangeColorModeButton";

function Header(){

  const bg = useColorModeValue('darkModeText', 'darkModeElements');

  return(
    <Box
      width='100%'
      bg={bg}
      boxShadow="0px 0px 10px 1px rgba(0, 0, 0, 0.3)"
      display='flex'
      alignItems='center'
      justifyContent='center'
      >
      <Flex
        width='100%'
        maxWidth='1800px'
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding="2rem 1rem"
      >
        <Text fontWeight={800} fontSize="1.1rem">Where in the world?</Text>
        <ChangeColorModeButton />
      </Flex>
    </Box>
  )
}

export default Header;
