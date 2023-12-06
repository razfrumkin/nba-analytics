from flask import Flask, jsonify, request
from flask_cors import CORS
import nba_api.stats.static.players
import nba_api.stats.static.teams
import nba_api.stats.endpoints.playercareerstats

app = Flask(__name__)
CORS(app)

@app.route('/endpoints/career-stats')
def get_career_stats():
    player_id = request.args.get('playerId', type=int)
    data = nba_api.stats.endpoints.playercareerstats.PlayerCareerStats(player_id=player_id)

    stats = {
        'regular_season': data.season_totals_regular_season.get_dict(),
        'post_season': data.season_totals_post_season.get_dict()
    }

    return jsonify(stats)

@app.route('/endpoints/teams')
def get_teams():
    teams = nba_api.stats.static.teams.get_teams()
    return jsonify(teams)

@app.route('/endpoints/players')
def get_players():
    players = nba_api.stats.static.players.get_players()
    return jsonify(players)

if __name__ == '__main__':
    app.run(debug=True, port=8000)