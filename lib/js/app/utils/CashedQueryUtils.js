import AppStateActions from '../actions/AppStateActions';
import ProjectStore from '../stores/ProjectStore';

export default {
  checkLimits: function() {
    const client = ProjectStore.getProject().client;
    const url = client.url('/3.0/projects/{projectId}/organization-usage',
      { api_key: client.config.masterKey }
    );
    fetch(url)
    .then((resp) => resp.json()) 
    .then(function(data) {
      if(data){
        const { cached_queries: { limited, limit, current_usage } } = data;
        if(limited, current_usage >= limit){
          AppStateActions.update({ isLimited: true })
        } else {
          AppStateActions.update({ isLimited: false })
        }
      } else {
        throw new Error("Problem with fetching query limits");
      }
    })
  }
}