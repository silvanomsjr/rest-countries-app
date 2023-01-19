import React, { useState } from 'react';

import { Search2Icon } from '@chakra-ui/icons'
import { Box, Input, InputGroup, InputLeftElement, InputRightElement, Button, Select } from '@chakra-ui/react';

type IPropsInputGroup = {
  actualFilter: string
  setActualFilter: (value: string) => void
  setSearchParams: (value: String) => void
}


function InputGroupHome ({ setActualFilter, setSearchParams, actualFilter }: IPropsInputGroup){

  const [ searchValue, setSearchValue ] = useState('')


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
    if(value === ''){
      setSearchParams('')
    }
    console.log(e)
  }

  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActualFilter(e.target.value)
    setSearchValue('')
    setSearchParams('')
  }

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === ''){
      setSearchParams('')
    }
    setSearchParams(e.target.value)
  }

  const handleOnClickSearch = () => {
    if(searchValue === ''){
      setSearchParams('')
    }
    setSearchParams(searchValue)
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      setSearchParams(searchValue)
    }
  }

  console.log(actualFilter)

  return(
    <Box
      w='100%'
      display='flex'
      justifyContent={{base: 'center', md: 'space-between'}}
      alignItems='flex-start'
      flexDirection={{base: 'column', md: 'row'}}
    >
      <InputGroup flex='1' maxW={{base: 'none', md:'300px'}}>
        <InputLeftElement
          pointerEvents='none'
          children={<Search2Icon/>}
          h='100%'
        />
        <Input
          placeholder='Search for a country...'
          w="100%"
          h='50px'
          pr='4.8rem'
          value={searchValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement h='100%' right='1.3rem' >
          <Button size='sm' paddingX='1.8rem' onClick={handleOnClickSearch}>
            Search
          </Button>
        </InputRightElement>

      </InputGroup>

      <Select
        marginTop={{base: '3rem', md: '0'}} w='60%' flex='1' maxW={{base: 'none', md: '210px'}}
        onChange={handleOnChangeSelect} value={actualFilter}
      >
        <option value='all'>Filter by all regions</option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>America</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </Select>
    </Box>
  )
}

export default InputGroupHome;
