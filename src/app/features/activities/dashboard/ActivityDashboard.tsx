import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../store/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivities()
      }, [loadActivities,activityRegistry.size]);

    if(activityStore.loadingInitial) return <LoadingComponent content="Loading App..."/>
    
    return( 
        <Grid>
            <Grid.Column width='10'>
                <ActivityList /> 
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
})