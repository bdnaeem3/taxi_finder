import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Jumbotron, Container, Button, Form, FormGroup, Input, Table } from 'reactstrap';

// CSS
import './styles/App.scss';

// Actions
import { getCityListAction } from './redux/actions/mapActions';
import { searchTaxiListAction } from './redux/actions/taxiActions';


const App = () => {

  const dispatch = useDispatch();
  const cities = useSelector(state=>state.map.cities)
  const taxis = useSelector(state=>state.taxi.taxis)
  const [ formDatas, setFormDatas ] = useState({
    city: '',
    type: ''
  })

  const formChangeHandler = e => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value
    })
  }

  const taxiSearchHandler = e => {
    e.preventDefault();
    searchTaxiListAction(dispatch, formDatas)
  }

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
                      return <option key={i}>{city.name}</option>
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
          taxis.length > 0 &&
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
                taxis.map((taxi, i)=> {
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
        }
      </Container>
    </main>
  );
}

export default App;
