package models;

import org.codehaus.jackson.JsonNode;
import play.mvc.WebSocket;

public class Player {
    private String username;
    private WebSocket.Out<JsonNode> channel;
    private String gameId;
    private Strategy strategy;

    public Player(String username, WebSocket.Out<JsonNode> channel, String gameId) {
        this.username = username;
        this.channel = channel;
        this.gameId = gameId;
    }

    public String getUsername() {
        return username;
    }

    public WebSocket.Out<JsonNode> getChannel() {
        return channel;
    }

    public String getGameId() {
        return gameId;
    }

    public String toString() {
        return username;
    }

    public void setStrategy(Strategy strategy){
        this.strategy = strategy;
    }

    public Strategy getStrategy(){
        return strategy;
    }
}
