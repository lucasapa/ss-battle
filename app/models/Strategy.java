package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;

import models.ships.*;
import org.codehaus.jackson.JsonNode;

public class Strategy {


    private List<Ship> ships;

    public Strategy(){
        ships = new ArrayList<Ship>();
        loadShips();
    }

    public void loadShips(){
        ships.add(new LeviathanShip());
        ships.add(new NinjaAssassinShip());
        ships.add(new KakarotShip());
        ships.add(new RedRibbonShip());
        ships.add(new JackieShip());
    }

    public boolean addShipFragment(Ship ship, ShipFragment fragment){
        for(Ship addedship:ships){
            for(int i=0;i<addedship.getFragments().size();i++){
                if((addedship.getFragments().get(i).getX() == fragment.getX()) &&
                        (addedship.getFragments().get(i).getY() == fragment.getY())){
                    return false;
                }

            }
        }
        if(fragment.getX()>=10 || fragment.getY()>=10){
            return false;
        }

        ship.addFragment(fragment);
        return true;
    }

    public List<Ship> getShips() {
        return ships;
    }

    public void setShips(List<Ship> ships) {
        this.ships = ships;
    }


    public String setSunk(Ship ship, ShipFragment fragment){

        boolean fragmentSunk = false;
        String toStr = "";
        for(ShipFragment actual:ship.getFragments()){
            if(actual.getX() == fragment.getX() && actual.getY() == fragment.getY()){
                toStr += (int)fragment.getX()+","+(int)fragment.getY();
                actual.setSunk(true);
                fragmentSunk = true;
                break;
            }

        }
        return toStr;

    }

    public String toString() {
        //Json String

        String toStr = "{";
        for(Ship ship: ships){
            toStr += "\""+ship.getName()+"\" : {";
            for(ShipFragment fragment: ship.getFragments()){
                toStr += "{\"x\" : \""+fragment.getX()+"\", \"y\" : \""+fragment.getY()+"\"}";
            }
            toStr += "}, ";
        }
        toStr += "}";
        return toStr;
    }

}
