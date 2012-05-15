package models;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;
import play.libs.F;
import play.libs.Json;
import play.mvc.WebSocket;

import java.util.ArrayList;

public class BattleRoom {
	private static ArrayList<Game> games = new ArrayList<Game>();
	private static int gamesPlayed = 0;
	private static int activeGames = 0;

	public static void join(String username, WebSocket.In<JsonNode> in, WebSocket.Out<JsonNode> out) {
		Game lastGame = getLastGame();
		if (!lastGame.hasPlayerOneDefined()) {
		    final Player player = new Player(username, out, lastGame.getGameId());
		    lastGame.setPlayerA(player);
		    msgInWebSocket(in, player);
		} else if (!lastGame.hasPlayerTwoDefined()) {
		    final Player player = new Player(username, out, lastGame.getGameId());
		    lastGame.setPlayerB(player);
		    msgInWebSocket(in, player);
		    lastGame.startGame();
		    gamesPlayed++;
		    activeGames++;
		} else {
		    createNewGame();
		    join(username, in, out);
		    //out.write(fullServerMsg());
		}
	}

	private static Game getLastGame() {
		Game last;
		if (games.isEmpty()) {
		    createNewGame();
		    last = games.get(0);
		} else {
		    last = games.get(games.size() - 1);
		}
		return last;
	}

	private static void createNewGame() {
		games.add(new Game());
	}

	private static JsonNode fullServerMsg() {
		final ObjectNode json = Json.newObject();
		json.put("error", "The server is full, try again later.");
		return json;
	}

	private static void msgInWebSocket(WebSocket.In<JsonNode> in, final Player player) {
		in.onMessage(new F.Callback<JsonNode>() {
		    public void invoke(JsonNode jsonNode) throws Throwable {
			Game game = getGameById(player.getGameId());
			String messageType = jsonNode.get("type").asText();
			if (game.hasStarted()) {
			    if (messageType.equals("chat")) {
				final String talk = jsonNode.get("text").asText();
				game.chat(player, talk);
			    } else if (messageType.equals("position")) {
				final String position = jsonNode.get("text").asText();
				game.shoot(player, position);
			    } else {
		            	//Other "messageTypes" behavior
			    }
			} else {
				//Wait for another player
			    game.chat(player, "");
			}
			if (messageType.equals("serverInfo")) {
			    Game.message(player, "info", activeGames + " Active Games" + " - " +
				    gamesPlayed + " Total Games Played" + " - " +
				    (games.size() - activeGames) + " Waiting Opponent");
			}
		    }
		});

		in.onClose(new F.Callback0() {
		    public void invoke() throws Throwable {
			Game game = getGameById(player.getGameId());
			game.leave(player);
			if (game.isEmpty()) {
			    games.remove(games.indexOf(game));
			    activeGames--;
			}
		    }
		});
	}

	private static Game getGameById(String gameId) {
		for (Game game : games) {
		    if (game.getGameId().equals(gameId)) {
			return game;
		    }
		}
		return null;
	}


}
