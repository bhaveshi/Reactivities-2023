import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEditActivity: (activity : Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({closeForm, activity: selectedActivity, createOrEditActivity, submitting }: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title:  '',
        date:   '',
        description: '',
        category:   '',
        city:   '',
        venue:  '',
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEditActivity(activity);
    }

    function handleOnChangeEvent(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title'value={activity.title} name='title' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Description'value={activity.description} name='description' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleOnChangeEvent}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleOnChangeEvent}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleOnChangeEvent}/>
                <Button loading={submitting} onClick={handleSubmit} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}