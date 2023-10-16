import { Alert, Container, Progress } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkshops, getRequest, loadWorkshopsRequest } from '../../../redux/workshopsRedux';
import { useEffect } from 'react';
import WorkshopsList from '../../features/WorkshopsList';


const Prices = () => {
  const dispatch = useDispatch();
  const workshops = useSelector(getWorkshops)
  const request = useSelector(getRequest);
  useEffect(() => {
    dispatch(loadWorkshopsRequest())
  }, [dispatch]);

  if(request.pending) return <Progress animated color="primary" value={50} />; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !workshops.length) return <Alert color="info">No workshops</Alert>;
  else if(request.success) return (
  <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>
    {workshops.map(worksh => <WorkshopsList key={worksh._id} {...worksh} />)}
    
  </Container>
);
};

export default Prices;
