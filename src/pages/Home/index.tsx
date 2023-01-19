import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import CardList from "../../components/CardsList";
import InputGroupHome from "../../components/InputGroupHome";


function Home(){

  const [ actualFilter, setActualFilter ] = useState('all')
  const [ searchParams, setSearchParams ] = useState<String>('')


  return(
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        width='100%'
        maxWidth='1800px'
        padding="2rem 1rem"
        flexDirection='column'
      >
        <InputGroupHome setActualFilter={setActualFilter} setSearchParams={setSearchParams} actualFilter={actualFilter}/>
        <CardList actualFilter={actualFilter} setActualFilter={setActualFilter} searchParams={searchParams} />
      </Flex>
    </Box>
  )
}

export default Home;
