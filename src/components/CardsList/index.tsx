import { Card, CardBody, Heading, Text, Image, Container, Spinner, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

interface CardInfo  {
  alpha2Code: string
  alpha3Code: string
  altSpellings: string[]
  area: number
  callingCodes: string[]
  capital: string
  currencies: Array<Object>
  demonym: string
  flag: string
  flags: {
    svg: string
    png: string
  },
  independent: boolean
  languages: Array<Object>
  latlng: Array<number>
  name: string
  nativeName: string
  numericCode: string
  population: number
  region: string
  subregion: string
  timezones: string[]
  topLevelDomain: string[]
  translations: Object
}


interface DataCardInfo {
  data: CardInfo
}


function EachCard({data}: DataCardInfo){
  const { flag, name, population, region, capital } = data


  return(
    <Link to={`/country/${name}`}>
      <Card
        minWidth= {{ base: 'none', cardBreak: '360px' }}
        maxWidth='360px'
        minHeight= {{ base: 'none', cardBreak: '448px' }}
        maxHeight='448px'
      >
        <Image
          objectFit="cover"
          src={flag}
          alt="Country flag"
          borderTopRadius='.375rem'
          width='100%'
          height='100%'
          minHeight={{base: 'none', cardBreak: '260px'}}
          maxHeight='260px'
        />
        <CardBody paddingTop='2rem' paddingBottom='2.3rem' paddingX='1.7rem'>
          <Heading as="h2" size="md" marginBottom=".7rem">
            {name}
          </Heading>
          <Text marginBottom='.3rem'>
            <b>Population:</b> {population.toLocaleString('en-US', {minimumFractionDigits: 0})}
          </Text>
          <Text marginBottom='.3rem'>
            <b>Region:</b> {region}
          </Text>
          <Text marginBottom='.3rem'>
            <b>Capital:</b> {capital}
          </Text>
        </CardBody>
      </Card>
    </Link>
  )
}

type ICardListProps = {
  actualFilter: string
  searchParams: String
  setActualFilter: (value: string) => void
}

function CardList( { actualFilter, searchParams, setActualFilter }: ICardListProps) {
  const [ realData, setRealData ] = useState([])
  const [ showingData, setShowingData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if(searchParams === ''){
      setShowingData(realData)
    }else{
      setShowingData(realData.filter(({name}:CardInfo) => { return name.toLowerCase().includes(searchParams.toLowerCase())}))
      setActualFilter('all')
    }
  }, [searchParams])

  console.log(showingData)

  async function getData() {
    const info = await fetch('https://restcountries.com/v2/all').then(e => e.json())
    setRealData(info)
    if(actualFilter === 'all'){
      setShowingData(info)
    }else{
      setShowingData(
        info.filter(({region}:CardInfo) => actualFilter === region)
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    if(searchParams === ''){
      setLoading(true)
      getData();
    }
  }, [actualFilter])


  return(
    <Container
      padding='2rem 2rem 0 2rem'
      margin='0'
      width='100%'
      maxWidth='none'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        flexWrap='wrap'
        flexDirection={{ base:'column', cardBreak: 'row' }}
        justifyContent={{ base:'center', cardStop: 'flex-start'}}
        alignItems='center'
        gap='2rem'
        maxWidth='1540px'
      >
      {
      loading
      ?
      (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          marginTop='3rem'
        />
      )
      :
      (
        showingData.map((element:CardInfo) => {
          return(<EachCard key={element.nativeName} data={element} />)
        })
      )
      }
      </Flex>
    </Container>
  )
}

export default CardList;
