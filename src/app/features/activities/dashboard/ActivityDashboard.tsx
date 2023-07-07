import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelActivity: () => void;
    editMode : boolean;
    submitting: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEditActivity: (activity : Activity) => void;
    deleteActivity: (id: string) => void;

}

export default function ActivityDashboard({activities, 
    selectedActivity, 
    selectActivity, cancelActivity, editMode, openForm, closeForm, createOrEditActivity, deleteActivity, submitting} : Props) {
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity = {selectActivity}
                    deleteActivity = {deleteActivity}
                    submitting = {submitting}
                /> 
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails 
                        activity={selectedActivity} 
                        cancelActivity = {cancelActivity}
                        openForm = {openForm}
                    />
                }
                {editMode && 
                    <ActivityForm 
                        closeForm={closeForm} 
                        createOrEditActivity={createOrEditActivity}
                        activity={selectedActivity}
                        submitting = {submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
}