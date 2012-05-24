package models;

import models.ships.Ship;
import models.ships.ShipFragment;
import org.codehaus.jackson.node.ObjectNode;
import play.libs.Json;

import java.util.Random;
import java.util.UUID;

public class Game {
    private String gameId;
    private Player playerOne;
    private Player playerTwo;
    private Player currentPlayer;
    private TurnState currentState;
    private boolean start;
    private int leavers;
    private int size;


    public Game() {
        gameId = UUID.randomUUID().toString();
        size=10;
    }

    void startGame() {
        start = true;
        leavers = 0;
        setRandomTurn();
        notifyStart();
        notifyTurn();
    }

    private void setRandomTurn() {
        Random turnRoller = new Random();
        int roll = turnRoller.nextInt(2) + 1;
        currentPlayer = roll == 1 ? playerOne : playerTwo;
        currentState = TurnState.SHOOTING;
    }

    private String generateDefaultStrategies(Player player) {
        Strategy strategy = new Strategy();
        player.setStrategy(strategy);

        for(Ship ship:strategy.getShips()){
            while(true){
                if(generateShipDefaultStrategy(ship,strategy)){
                    break;
                }
            }
        }

        return strategy.toString();


    }

    private boolean generateShipDefaultStrategy(Ship ship, Strategy strategy) {
        int shipSize = ship.getSize();
        final Random random = new Random(11);
        ship.setOrientation(random.nextBoolean());
        ShipFragment center = new ShipFragment(random.nextInt(size), random.nextInt(size));
        if(ship.getOrientation()){
            for(int j = 0; j<shipSize;j++){
                if(!strategy.addShipFragment(ship, new ShipFragment((int)center.getX(),(int)center.getY()+j))){
                    return false;
                };
            }
        }else{
            for(int j = 0; j<shipSize;j++){
                if(!strategy.addShipFragment(ship, new ShipFragment((int)center.getX()+j,(int)center.getY()))){
                    return false;
                };
            }
        }
        return true;

    }

    public void setPlayerA(Player playerOne) {
        this.playerOne = playerOne;
        message(playerOne, "wait", "Waiting for other player to join.....");

        //
        String strategyStr = generateDefaultStrategies(this.playerOne);
        message(playerOne, "wait", strategyStr);
    }

    private void notifyStart() {
        message(getCurrentPlayer(), "start", "Let's play Battleship, You're playing against " + getAlternative().getUsername());
        message(getAlternative(), "start", "Let's play Battleship, You're playing against " + getCurrentPlayer().getUsername());
    }

    private void notifyTurn() {
        if (currentState == TurnState.SHOOTING) {
            message(getCurrentPlayer(), "ask", "You shoot !");
            message(getAlternative(), "wait", "Other player's shoot!");
        } else {
            message(getAlternative(), "answer", "Shoot???");
            message(getCurrentPlayer(), "wait", "Wait for "+getAlternative().getUsername()+"");
        }
    }
    public void leave(Player player) {
        leavers++;
        if (playerOne != null && playerTwo != null) {
            Player notQuitter = isCurrent(player) ? getAlternative() : getCurrentPlayer();
            message(notQuitter, "leave", "Other played left the game!");
        }
    }

    public void chat(Player player, String talk) {
        if (start) {
            chatMessage(getCurrentPlayer(), "chat", player.getUsername(), talk);
            chatMessage(getAlternative(), "chat", player.getUsername(), talk);
        } else {
            message(player, "wait", "Still Waiting for oponent....");
        }
    }

    public void shoot(Player player, String []position){

               int y = Integer.parseInt(position[0]);
               int x = Integer.parseInt(position[1]);

               for (Ship ship : getAlternative().getStrategy().getShips()){
                   for (ShipFragment fragment : ship.getFragments()) {
                       if (fragment.getX()==x && fragment.getY()==y && !fragment.isSunk()){
                           getAlternative().getStrategy().setSunk(ship,fragment);
                           message(player, "info", "YOU HIT ONE!!");
                           message(getAlternative(), "notification", "HE HIT YOU IN ("+position[0]+","+position[1]+")");
                           boolean haswin = checkWinner(getAlternative());
                           if (haswin){
                               message(player, "winner", "YOU WIN!!!");
                               message(getAlternative(), "winner", "YOU LOOSE!!!");
                           }
                           return;
                       }
                   }
               }

              message(player, "info", "YOU MISSED");
              changeTurn();

    }

    private boolean checkWinner(Player player) {
        for (Ship ship : player.getStrategy().getShips()) {
             if (!ship.isSunk()){
                      return false;
             }
        }
        return true;
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
        if (currentState == TurnState.SHOOTING) {
            currentState = TurnState.WAITING;
        } else {
            currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
            currentState = TurnState.SHOOTING;
        }
    }

    public boolean isPlayerOneDefined() {
        return playerOne != null;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }

    public Player getAlternative() {
        return currentPlayer == playerOne ? playerTwo : playerOne;
    }

    public boolean isPlayerTwoDefined() {
        return playerTwo != null;
    }

    public void setPlayerB(Player playerB) {
        this.playerTwo = playerB;
        String strategyStr = generateDefaultStrategies(this.playerTwo);
        message(playerTwo, "wait", strategyStr);
    }

    public String getGameId() {
        return gameId;
    }

    public boolean isStart() {
        return start;
    }

    public boolean isEmpty() {
        boolean result = false;
        if (leavers == 2) result = true;
        if (leavers == 1 && start == false) result = true;
        return result;
    }

    @Override
    public String toString() {
        return "Game{" +
                "playerOne=" + playerOne +
                ", playerTwo=" + playerTwo +
                ", start=" + start +
                ", leavers=" + leavers +
                '}';
    }

    private enum TurnState {SHOOTING, WAITING}
}
