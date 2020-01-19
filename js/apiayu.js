const BASE_URL = "https://api.football-data.org/v2/";
const teams = 'competitions/2001/teams'; 
const team_endpoint = 'teams/';
const TOKEN = "ec87aede93454fca8009bee8f54c2350";
const LEAGUE_ID = 2001;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;


var fetchAPI = function (url) {
  return fetch(url, {
    'headers': {
      'X-Auth-Token': TOKEN
    }
  })
    .then(status)
    .then(json)
    .then(https)
}

const status = function (response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = function (response) {
  return response.json();
}

const error = function (error) {
  console.log("Error : " + error);
}

const https = function (response) {
  var str = JSON.stringify(response).replace(/http:/g, 'https:');
  return JSON.parse(str);
}
/////////////////////////////////////////////////////////////////
function getTeams() {
  ////
  if ("caches" in window) {
    caches.match(BASE_URL + teams).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var cardTeam = "";
          data.teams.forEach(function(team) {
            cardTeam += `
                <div class="col s12 m6 l4">
                  <div class="card medium">
                    <a href="./pages/teams.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.address}</p>
                    </div>
                  </div>
                </div>
                `;
          });
              // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = cardTeam;
        });
      }
    });
  }

  ////
  fetchAPI(BASE_URL + teams)
    .then(function (data) {
      var cardTeam = ''
      data.teams.forEach(team => {
        cardTeam += `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="./pages/teams.html#${team.id}">
              <img src='${team.crestUrl || '/assets/soccer-ball.svg'}' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i>Address: </i> ${team.address}, ${team.area.name}</p>
            <p><i>Venue: </i> ${team.venue}</p>
            <p><i>Website</i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
           <a class="btn-floating btn-large waves-effect waves-light green" onclick="saveTeam(this);" data-team='${JSON.stringify(team)}'><i class="tiny material-icons">add</i></a>
            
            </div>
          </div>
        </div>
        `
      });
      document.getElementById('teams').innerHTML = cardTeam
    })
    .catch(error);
}
           
function getTeamById(id) {
  ///
  if ("caches" in window) {
    caches.match(BASE_URL + teams).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var cardTeam = "";
          data.teams.forEach(function(team) {
            cardTeam += `
                <div class="col s12 m6 l4">
                  <div class="card medium">
                    <a href="./pages/teams.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.address}</p>
                    </div>
                  </div>
                </div>
                `;
          });
              // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = cardTeam;
        });
      }
    });
  }

/////
  fetchAPI(BASE_URL + team_endpoint + id)
    .then(function (team) {
      console.log(team)
      cardTeam = `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="./pages/teams.html#${team.id}">
              <img src='${team.crestUrl || '/assets/soccer-ball.svg'}' alt='badge' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i> Address: </i> ${team.address}, ${team.area.name}</p>
            <p><i>Venue: </i> ${team.venue}</p>
            <p><i>Website: </i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
            <a class="btn-floating btn-large waves-effect waves-light green" onclick="saveTeam(this);" data-team='${JSON.stringify(team)}'><i class="tiny material-icons">favorite</i></a>
              </div>
          </div>
        </div>
        `

      squadHeader = `<ul class="collection with-header">
        <li class="collection-header"><h4>Squad</h4></li>`
      squadList = '';
      squadFooter = '</ul>'
      team.squad.forEach(function (player) {
        squadList += `
            <li class="collection-item">
            ${player.name} (${player.shirtNumber})<br/>${player.countryOfBirth}
            <span class='secondary-content'>${player.position}</span>
            </li>`
      });
      document.getElementById('body-content').innerHTML = cardTeam
      document.getElementById('squad').innerHTML = squadHeader.concat(squadList).concat(squadFooter)
    })
    .catch(error);
}

function loadFavTeams() {
  //
if ("caches" in window) {
    caches.match(BASE_URL + teams).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var cardTeam = "";
          data.teams.forEach(function(team) {
            cardTeam += `
                <div class="col s12 m6 l4">
                  <div class="card medium">
                    <a href="./pages/teams.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.address}</p>
                    </div>
                  </div>
                </div>
                `;
          });
              // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = cardTeam;
        });
      }
    });
  }
  //
  getFavTeams()
    .then(function (data) {
      var cardTeam = ''
      data.forEach(team => {
        cardTeam += `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="./pages/teams.html#${team.id}">
              <img src='${team.crestUrl || '/assets/soccer-ball.svg'}' alt='badge' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i>Address: </i> ${team.address}, ${team.area.name}</p>
            <p><i>Venue: </i> ${team.venue}</p>
            <p><i>Website: </i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
            <a class="btn-floating btn-large waves-effect waves-light red" onclick="deleteTeam(this);" data-team='${JSON.stringify(team)}'><i class="tiny material-icons">delete</i></a>
            
            </div>
          </div>
        </div>
        `
      });
      document.getElementById('favorite').innerHTML = cardTeam
    })
}

function saveTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  addFavTeam(team);
}

function deleteTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  deleteFavTeam(team);
}


///////////////////////////////////////////////////////////////////////////
//get All Standings di halaman standing.html
function getAllStandings() {
  if ("caches" in window) {
      caches.match(ENDPOINT_COMPETITION).then(function (response) {
          if (response) {
              response.json().then(function (data) {
                  console.log("Competition Data: " + data);
                  showStanding(data);
              })
          }
      })
  }

  fetchAPI(ENDPOINT_COMPETITION)
      .then(data => {
          showStanding(data);
      })
      .catch(error => {
          console.log(error)
      })
}

function showStanding(data) {
  let standings = "";
  let standingElement =  document.getElementById("homeStandings");

  data.standings[0].table.forEach(function (standing) {
      standings += `
              <tr>
                  <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="20px" alt="badge"/></td>
                  <td>${standing.team.name}</td>
                  <td>${standing.won}</td>
                  <td>${standing.draw}</td>
                  <td>${standing.lost}</td>
                  <td>${standing.points}</td>
                  <td>${standing.goalsFor}</td>
                  <td>${standing.goalsAgainst}</td>
                  <td>${standing.goalDifference}</td>
              </tr>
      `;
  });

   standingElement.innerHTML = `
              <div class="card" style="padding-left: 12px; padding-right: 12px; margin-top: 20px;">

              <table class="striped responsive-table">
                  <thead>
                      <tr>
                          <th></th>
                          <th>Team Name</th>
                          <th>Won</th>
                          <th>Draw</th>
                          <th>Lost</th>
                          <th>Points</th>
                          <th>Goals For</th>
                          <th>Goals Against</th>
                          <th>Goal Difference</th>
                      </tr>
                   </thead>
                  <tbody id="standings">
                      ${standings}
                  </tbody>
              </table>
              
              </div>
  `;
}
