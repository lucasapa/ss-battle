package models;

import models.ships.*;
import org.codehaus.jackson.node.ObjectNode;
import play.libs.Json;

import java.awt.*;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.awt.geom.Line2D.Float;

public class Game {
    private String gameId;
    private Player playerOne;
    private Player playerTwo;
    private Player currentPlayer;
    private boolean started;
    private List<Ship> shipList = new ArrayList<Ship>();
    private int size;

    public Game() {
        gameId = UUID.randomUUID().toString();
    }

    void startGame() {
        started = true;
        setRandomTurn();
        notifyStart();
        generateDefaultStrategies();
        notifyTurn();
    }

    public void loadShips(){
        shipList.add(new LeviathanShip());
        shipList.add(new NinjaAssassinShip());
        shipList.add(new KakarotShip());
        shipList.add(new RedRibbonShip());
        shipList.add(new JackieShip());

    }

    private void setRandomTurn() {
        Random turnRoller = new Random();
        int roll = turnRoller.nextInt(2) + 1;
        currentPlayer = roll == 1 ? playerOne : playerTwo;
    }

    private void generateDefaultStrategies() {
	    Strategy strategy = new Strategy(size);
        for(Ship ship:shipList){
            while(true){
                ship.setOrientation(Math.random() > 0.5);
                Point2D center = new Point((int)Math.random()*size, (int)Math.random()*size);
                Line2D.Float position;
                if(ship.getOrientation()){
                    //position = new Line2D.Float(center, new Point(center.getX(), center.getY()+ship.getSize()));
                }
            }
        }

        for(int i=0;i<size;i++){
            Ship ship = new LeviathanShip();

            int verticaPosition = ((int) Math.random() * size);
            int horizontalPosition = ((int) Math.random() * size);
             Line2D.Float position = new Line2D.Float(new Point(1,1), new Point(1,1));
            strategy.addShip(position,ship);
        }
    }

    public void setPlayerA(Player playerOne) {
        this.playerOne = playerOne;
        message(playerOne, "wait", "Waiting for other player to join.....");
    }

    public void setPlayerB(Player playerB) {
        this.playerTwo = playerB;
	message(playerOne, "wait", "The game is about to begin");
	message(playerTwo, "wait", "The game is about to begin");
    }

    private void notifyStart() {
        message(getCurrentPlayer(), "start", "Test your might, you are playing against " + getAlternative().getUsername());
        message(getAlternative(), "start", "Test your might, you are playing against " + getCurrentPlayer().getUsername());
    }

    private void notifyTurn() {
        message(getCurrentPlayer(), "play", "You're move!");
        message(getAlternative(), "wait", "Other player's move!");
    }

    private void ShootCalculation(Player player, String position) {
        if (position.equalsIgnoreCase("")) {
            Game.message(player, "mistake", "Not a valid shoot");
        } else {
            message(getCurrentPlayer(), "my-ask", position);
            message(getAlternative(), "op-ask", position);
        }
    }

    public void leave(Player quitter) {
        if(playerOne == quitter){
            playerOne = null;
            message(playerTwo, "leave", "Other played left the game!");
        }else{
            playerTwo = null;
            message(playerOne, "leave", "Other played left the game!");
        }
    }

    public void chat(Player player, String talk) {
        if (started) {
            chatMessage(getCurrentPlayer(), "chat", player.getUsername(), talk);
            chatMessage(getAlternative(), "chat", player.getUsername(), talk);
        } else {
            message(player, "wait", "Still Waiting for oponent....");
        }
    }

    public void shoot(Player player, String position) {
        if (started) {
            if (getCurrentPlayer() == player) {
                ShootCalculation(player, position);
                changeTurn();
                notifyTurn();
            } else {
                message(player, "wait", "Opponent turn");
            }
        } else {
            message(player, "wait", "Waiting for opponent....");
        }
    }

    private void chatMessage(Player playerTo, String type, String playerFrom, String talk) {
        final ObjectNode json = Json.newObject();
        json.put("name", playerFrom);
        json.put("type", type);
        json.put("message", talk);
        playerTo.getChannel().write(json);
    }

    public static void message(Player player, String type, String message) {
        final ObjectNode json = Json.newObject();
        json.put("type", type);
        json.put("message", message);
        player.getChannel().write(json);
    }

    private boolean isCurrent(Player player) {
        return player == getCurrentPlayer();
    }

    private void changeTurn() {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
    }

    public boolean hasPlayerOneDefined() {
        return playerOne != null;
    }

    public boolean hasPlayerTwoDefined() {
        return playerTwo != null;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }

    public Player getAlternative() {
        return currentPlayer == playerOne ? playerTwo : playerOne;
    }

    public String getGameId() {
        return gameId;
    }

    public boolean hasStarted() {
        return started;
    }

    public boolean isEmpty() {
	//FIXME: Testear esto
        return currentPlayer == null ? true : false;
    }

    @Override
    public String toString() {
        return "Game{" +
                "playerOne=" + playerOne +
                ", playerTwo=" + playerTwo +
                ", start=" + started +
                '}';
    }

}
