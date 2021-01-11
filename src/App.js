import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Jumbotron, Container, Button, Form, FormGroup, Input, Table } from 'reactstrap';
import _ from 'lodash';

// CSS
import './styles/App.scss';

// Actions
import { getCityListAction } from './redux/actions/mapActions';
import { taxiListAction } from './redux/actions/taxiActions';


const App = () => {

  const dispatch = useDispatch();
  const cities = useSelector(state=>state.map.cities)
  const taxis = useSelector(state=>state.taxi.taxis)
  const [ searchList, setSearchList ] = useState([])
  const [ formDatas, setFormDatas ] = useState({
    city: '',
    type: ''
  })

  const locationCalc = location => {
    return Math.sqrt(Math.pow(location.lat, 2) + Math.pow(location.lang, 2));
  }

  const formChangeHandler = e => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value
    })
  }

  const taxiSearchHandler = e => {
    e.preventDefault();

    setSearchList(taxis.filter(taxi=>{
      return (
        !taxi.booked && 
        _.inRange(locationCalc(taxi.location), parseFloat(formDatas.city)-.1, parseFloat(formDatas.city)+.1) && 
        taxi.type === formDatas.type
      )
    }))
  }

  useEffect(()=>{
    taxiListAction(dispatch)
  }, [dispatch])

  useEffect(()=>{
    getCityListAction(dispatch)
  },[dispatch])

  return (
    <main>
      <Container>
        <Jumbotron>
          <Form inline autoComplete="off" onSubmit={taxiSearchHandler}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="select" name="city" onChange={formChangeHandler}>
                <option>Select City</option>
                {
                  cities.length > 0
                    ? cities.map((city, i)=>{
                      return <option value={locationCalc(city.location)} key={i}>{city.name}</option>
                    })
                    : 'No city found'
                }
              </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="select" name="type" onChange={formChangeHandler}>
                <option>Select Type</option>
                <option value="Premium">Premium</option>
                <option value="Normal">Normal</option>
              </Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Jumbotron>

        {
          searchList.length > 0 &&
          <>
            <h1>Searched Taxis</h1>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car Name</th>
                  <th>Type</th>
                  <th>Driver Name</th>
                  <th>Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  searchList.map((taxi, i)=> {
                    return (
                      <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{taxi.title}</td>
                        <td>{taxi.type}</td>
                        <td>{taxi.driver}</td>
                        <td>{taxi.number}</td>
                        <td><Button>Book Now</Button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </>
        }

        {/* <h1>Taxi List</h1>
        {
          taxis.length > 0 &&
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Car Name</th>
                <th>Type</th>
                <th>Driver Name</th>
                <th>Number</th>
                <th>Avaiable At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                taxis.map((taxi, i)=> {
                  return (
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{taxi.title}</td>
                      <td>{taxi.type}</td>
                      <td>{taxi.driver}</td>
                      <td>{taxi.number}</td>
                      <td>{locationCalc(taxi.location)}</td>
                      <td><Button>Book Now</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        }

        
        <h1>Map List</h1>
        {
          cities.length > 0 &&
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Lat</th>
                <th>Lang</th>
                <th>Area</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                cities.map((city, i)=> {
                  return (
                    <tr key={i}>
                      <th scope="row">{i+1}</th>
                      <td>{city.name}</td>
                      <td>{city.location.lat}</td>
                      <td>{city.location.lang}</td>
                      <td>{locationCalc(city.location)}</td>
                      <td><Button>Book Now</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        } */}
      </Container>
    </main>
  );
}

export default App;
