import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../store/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../layout/LoadingComponent';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {v4 as uuid} from 'uuid';



export default observer(function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState({ 
                id: '',
                title:  '',
                date:   '',
                description: '',
                category:   '',
                city:   '',
                venue:  ''
            });

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])


    function handleSubmit() {
        if(activity.id){
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            //activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }

    function handleOnChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if(loadingInitial) return <LoadingComponent content='Loading Activity....'/>

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title'value={activity.title} name='title' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Description'value={activity.description} name='description' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleOnChangeEvent}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleOnChangeEvent}/>
                <Button loading={loading} onClick={handleSubmit} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to={`/activities/${activity.id}`} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})

function useParam(): { id: any; } {
    throw new Error('Function not implemented.');
}
