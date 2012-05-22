package models.ships;

import java.awt.*;

public class ShipFragment extends Point{

    boolean sunk;

    public ShipFragment(int x, int y){
        super(x,y);
    }

    public boolean isSunk() {
        return sunk;
    }

    public void setSunk(boolean sunk) {
        this.sunk = sunk;
    }
}
