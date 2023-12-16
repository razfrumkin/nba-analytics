from flask import Flask, jsonify, request
from flask_cors import CORS
import nba_api.stats.static.players
import nba_api.stats.static.teams
import nba_api.stats.endpoints.playercareerstats

app = Flask(__name__)
CORS(app)

@app.route('/endpoints/search', methods=['GET'])
def search():
    prompt = request.args.get('prompt', type=str)

    teams_filter_mode = request.args.get('teamsFilterMode', 'none')
    if teams_filter_mode not in {'none', 'all'}: teams_filter_mode = 'none'

    players_filter_mode = request.args.get('playersFilterMode')
    if players_filter_mode not in {'none', 'all', 'activeOnly'}: players_filter_mode = 'none'

    ids = search_data(prompt, teams_filter_mode, players_filter_mode)
    return(ids)

def search_data(prompt: str, teams_filter_mode: str, players_filter_mode: str) -> dict:
    teams = nba_api.stats.static.teams.find_teams_by_full_name(prompt) if teams_filter_mode != 'all' else []
    players = nba_api.stats.static.players.find_players_by_full_name(prompt) if players_filter_mode != 'all' else []
    if players_filter_mode == 'activeOnly':
        players = [player for player in players if player['is_active']]

    teams_ids = [team['id'] for team in teams]
    players_ids = [player['id'] for player in players]

    return {
        'teams_ids': teams_ids,
        'players_ids': players_ids
    }

@app.route('/endpoints/career-stats', methods=['GET'])
def get_career_stats():
    player_id = request.args.get('playerId', type=int)
    data = nba_api.stats.endpoints.playercareerstats.PlayerCareerStats(player_id=player_id)

    stats = {
        'regular_season': data.season_totals_regular_season.get_dict(),
        'post_season': data.season_totals_post_season.get_dict()
    }

    return jsonify(stats)

@app.route('/endpoints/teams', methods=['GET'])
def get_teams():
    teams = nba_api.stats.static.teams.get_teams()
    return jsonify(teams)

@app.route('/endpoints/players', methods=['GET'])
def get_players():
    players = nba_api.stats.static.players.get_players()
    return jsonify(players)

if __name__ == '__main__':
    app.run(debug=True, port=8000)