import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    let activities: Activity[] = [];

    agent.Activities.list().then(response => {
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id : string) {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true); 
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      })
    }

    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);
  }

  function handleDeleteActivity(id: string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setEditMode(false);
    })
   
  }

  return (loading) ?
  <LoadingComponent content='Loading app'/> :  
  (
    <>
      <NavBar openForm = {handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} 
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelActivity = {handleCancelActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEditActivity = {handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
          submitting = {isSubmitting}
        />
      </Container>
    </>
  );
}

export default App;
