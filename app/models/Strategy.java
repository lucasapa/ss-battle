package models;

import java.awt.geom.Line2D;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Vector;

import models.ships.*;

public class Strategy {


    //List<Ship> ships;

    HashMap<Line2D.Float,Ship> layout;

    private int size;

    public Strategy(int size){
        this.size = size;
        layout = new HashMap<Line2D.Float,Ship>();
    }

    public boolean addShip(Line2D.Float position, Ship ship){
        if (layout.size() < size){
            layout.put(position,ship);
            return true;
        }
        return false;

    }

}
