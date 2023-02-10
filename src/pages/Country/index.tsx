import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Image, Container, Spinner, Flex, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


interface IOtherData {
  name: String
  numericCode: number
}

interface INativeName {
  [key:string]: {
    common: String
    official: String
  }
}
interface ICountryData {
  altSpellings: String[]
  area: number
  borders: String[]
  capital: String[]
  capitalInfo: Object
  car: Object
  cca2: String
  cca3: String
  ccn3: String
  cioc: String
  coatOfArms: {
    png: String
    svg: String
  }
  continents: String[]
  currencies: {
    [key:string]: {
      name: String
      symbol: String
    }
  }
  demonyms: Object
  fifa: String
  flag: String
  flags: {
    png: String
    svg: string
  }
  idd: Object
  landlocked: Boolean
  languages: Object
  latlng: Number[]
  maps: Object
  name:{
    common: String
    nativeName: INativeName
    official: String
  }
  population: Number
  region: String
  startOfWeek: String
  status: String
  subregion: String
  timezones: String
  tld: String[]
  translations: Object
  unMember: Boolean
}

const Country = () => {
  const getParams = useParams()
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState<ICountryData>()
  const [ check, setCheck ] = useState("")
  const [ otherData, setOtherData ] = useState([])

  const cardColor = useColorModeValue('darkModeText', 'darkModeElements');


  useEffect(() => {
    setLoading(true)
    fetch(`https://restcountries.com/v3.1/name/${getParams.id}?fullText=true`)
    .then(async (response) => {
      const json = await response.json()
      setData(json[0])
    })
    .catch(error => {
      console.log('Error: ', error)
    })
    .finally(() =>
      setLoading(false)
    )
  }, [])

  useEffect(()=>{
    setLoading(true)
    if(data){
      const borders = data?.borders
      if(borders){
        fetch(`https://restcountries.com/v2/alpha?codes=${borders.join(',')}`)
        .then(async response => {
          const json = await response.json()
          setOtherData(json)
        })
      }
    }
    setLoading(false)
  }, [data])

  const pathToName = data?.name?.nativeName
  const tld = data?.tld
  const capital = data?.capital


  useEffect(() => {
    if(pathToName){
      const keys = Object.keys(data?.name?.nativeName)
      setCheck(keys[keys.length-1])
    }
  }, [pathToName])

  return(
      <Container display='flex' justifyContent='center' alignItems='center' margin='2.5rem auto' fontWeight='bold' w='100%' maxW='1800px'>
        {loading
        ?
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            marginTop='3rem'
          />
        : (
          <Box w='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start'>
            <Link to='/'>
              <Button
                leftIcon={<ArrowBackIcon />}
                boxShadow='0px 0px 10px rgba(0,0,0,0.2)'
              >
                Back
              </Button>
            </Link>
            {data && tld && capital && !loading
            ?
            (
              <Box
                width='100%'
                marginTop='3rem'
                display='flex'
                alignItems='center'
                justifyContent={{base: 'center', cardBreak: 'space-between' }}
                flexDirection={{base: 'column', cardBreak: 'row'}}
                gap={{base: '0', cardBreak: '2rem'}}
              >
                <Image
                  src={data.flags.svg}
                  maxW={{base: '440px', cardBreak: '650px '}}
                  maxH={{base: 'none', cardBreak: '500px'}}
                  width={{base: '100%', cardBreak: '70%'}}
                />
                <Flex
                  flexDirection='column'
                  alignItems='flex-start'
                  maxW={{cardBreak: '860px'}}
                  width={{base:'100%', cardBreak:'66%'}}
                >
                  <Flex flexDirection='column' gap='1.6rem' alignItems='flex-start' width='100%'>

                    <Heading as='h2' fontSize='2xl' marginTop={{base: '1rem', cardBreak: '0'}}>
                      {data.name.common}
                    </Heading>
                    <Flex
                      gap='1.6rem'
                      flexDirection={{base: 'column', cardBreak: 'row'}}
                      width='100%'
                      maxWidth='700px'
                      justifyContent={{base: 'normal', cardBreak: 'space-between'}}
                    >
                      <Flex flexDirection='column' gap='.5rem' fontWeight='normal'>
                        <Text fontSize='md'><b>Native Name:</b> {' '}
                          {pathToName &&
                          pathToName[check]?.common
                          }
                        </Text>
                        <Text><b>Population:</b>
                          {' '}
                          {data.population.toLocaleString('en-US', {minimumFractionDigits: 0})}
                        </Text>
                        <Text><b>Region:</b>
                          {' '}
                          {data.region}
                        </Text>
                        <Text><b>Sub Region:</b>
                          {' '}
                          {data.subregion}
                        </Text>
                        <Text><b>Capital:</b>
                          {' '}
                          {data?.capital.join(', ')}
                        </Text>
                      </Flex>
                      <Flex flexDirection='column' gap='.5rem' fontWeight='normal' marginTop={{base:'.4rem', cardBreak:'0'}}>
                        <Text>
                          <b>Top Level Domain:</b>
                          {' '}
                          {data.tld.join(', ')}
                        </Text>
                        <Text>
                          <b>Currencies:</b>
                          {' '}
                          {data.currencies[Object.keys(data.currencies)[0]].name}
                        </Text>
                        <Text>
                          <b>Languages:</b>
                          {' '}
                          {Object.values(data.languages).join(', ')}
                        </Text>
                      </Flex>
                    </Flex>

                    <Box marginTop='1.6rem'>
                      <Flex
                        justifyContent='flex-start'
                        alignItems='center'
                        fontWeight='normal'
                        gap='.6rem'
                        flexWrap='wrap'
                      >
                      <Text width={{base: '100%', cardBreak: 'auto'}}>Border Countries: </Text>
                      {otherData.length >= 1 && loading === false
                      ?(
                        <>
                          {otherData.map((element:IOtherData)=> {
                            return(
                              <Box
                                key={element?.numericCode}
                                padding='.2rem 1.5rem'
                                backgroundColor={cardColor}
                                borderRadius='2px'
                                boxShadow='0px 0px 10px rgba(0,0,0,0.2)'
                              >
                                {element?.name}
                              </Box>
                            )
                          })}
                        </>
                      )
                      : (
                        <>
                          <Box>
                            <b>No borders</b>
                          </Box>
                        </>
                      )
                      }
                      </Flex>
                  </Box>
                  </Flex>
                </Flex>

              </Box>
            )
            : data === undefined
              ? (
              <Box w='100%' display='flex' justifyContent='center' alignItems='center'>
                <Text>Sorry, we don't found that country.</Text>
              </Box>
              )
              : undefined
            }

          </Box>
        )
        }
      </Container>
  )
}


export default Country;
