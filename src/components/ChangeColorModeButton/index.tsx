import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon } from '@chakra-ui/icons'

function ChangeColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('lightModeText', 'darkModeText');

  return(
    <Button leftIcon={<MoonIcon />} variant='ghost' textColor={color} onClick={toggleColorMode}>
      Dark Mode
    </Button>
  )
}
export default ChangeColorModeButton
