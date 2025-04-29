// main.js (inside public folder)

// Instead of calling football-data.org directly,
// call your server's API route!

async function fetchLeagueTable(leagueCode, tableId) {
    try {
        const response = await fetch(`/api/${leagueCode}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const standings = data.standings[0].table;

        const table = document.getElementById(tableId);
        table.innerHTML = `
            <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Played</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Points</th>
            </tr>
        `;

        standings.forEach(team => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${team.position}</td>
                <td>${team.team.name}</td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
            `;
            table.appendChild(row);
        });
    } catch (error) {
        console.error(`Failed to fetch ${leagueCode} standings`, error);
        const table = document.getElementById(tableId);
        table.innerHTML = `<tr><td colspan="7">Error loading data</td></tr>`;
    }
}
