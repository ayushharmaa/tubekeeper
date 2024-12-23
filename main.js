const CLIENT_ID='from google api'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
  
const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content=document.getElementById('content');
const channelForm=document.getElementById('channel-form');
const channelInput=document.getElementById('channel-input');
const videoContainer=document.getElementById('video=container');

const defaultChannel = 'pewdiepie';

channelForm.addEventListener('submit', e => {
    e.preventDefault();
    const channel = channelInput.value;
    getChannel(channel);
})


function handleClientLoad(){
    gapi.load('client:auth2', initClient);
}

//Initialize API client library and set up sign in listeners
function initClient(){
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(() => {
        //Listen for sign and state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle initial sign in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick= handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    })
}

// Update UI sign in state changes
function updateSigninStatus(isSignedIn){
    if(isSignedIn){
        authorizeButton.style.display= 'none' //already signed in
        signoutButton.style.display = 'block'
        content.style.display = 'block'
        videoContainer.style.display= 'block'
        getChannel(defaultChannel)
    } else{
        authorizeButton.style.display= 'block' 
        signoutButton.style.display = 'none'
        content.style.display = 'none'
        videoContainer.style.display= 'none'
    }
}


function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn();
}


function handleAuthClick(){
    gapi.auth2.getAuthInstance().signOut();
}


function showChannelData(data){
    const channelData = document.getElementById('channel-data');
    channelData.innerHTML = data;
}


function getChannel(channel) {
    gapi.client.youtube.channels.list({
        part: 'snippet,contentDetails,statistics',
        forUsername: channel
    })
        .then(response => {
            console.log(response);
            const channel = response.result.items[0];

            const output = `
                <ul class="collection">
                <li class="collection-item">Title: ${channel.snippet.title} </li>
                    <li class="collection-item">ID: ${channel.id} </li>
                    <li class="collection-item">Subscribers: ${channel.statistics.subscriberCount} </li>
                    <li class="collection-item">Views: ${channel.staistics.viewCount}</li>
                    <li class="collection-item">Videos: ${channel.statistics.videoCount} </li>
                </ul>
                <p>${channel.snippet.description}</p>
                <hr>
                <a class="btn grey darken-2" target="_blank" href=https://youtube.com/$(channel.snippet.customUrl)">Visit channel</a>
            `;
            showChannelData(output);
        })
        .catch(err => alert('No such channel exists'))
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  function requestVideoPlaylist(playlistId) {
    const requestOptions = {
      playlistId: playlistId,
      part: 'snippet',
      maxResults: 10
    };
  
    const request = gapi.client.youtube.playlistItems.list(requestOptions);
  
    request.execute(response => {
      console.log(response);
      const playListItems = response.result.items;
      if (playListItems) {
        let output = '<br><h4 class="center-align">Latest Videos</h4>';
  
        // Loop through videos and append output
        playListItems.forEach(item => {
          const videoId = item.snippet.resourceId.videoId;
  
          output += `
            <div class="col s3">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          `;
        });
  
        // Output videos
        videoContainer.innerHTML = output;
      } else {
        videoContainer.innerHTML = 'No Uploaded Videos';
      }
    });
  }
