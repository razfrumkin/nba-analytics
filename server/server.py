from flask import Flask, jsonify
from flask_cors import CORS
import nba_api.stats.static.players
import nba_api.stats.static.teams

app = Flask(__name__)
CORS(app)

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