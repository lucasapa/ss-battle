package models;

import java.awt.geom.Line2D;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;

import models.ships.*;

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
            for(ShipFragment addedFragment:ship.getFragments()){
                   if((addedFragment.getX() == fragment.getX()) && (addedFragment.getY() == fragment.getY())){
                       return false;
                   }
            }
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

}
