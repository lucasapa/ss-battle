package models.ships;

import java.util.ArrayList;
import java.util.List;

public abstract class Ship {

    private int size;
    private String name;
    private boolean vertical;
    private boolean sunk = false;
    private List<ShipFragment> fragments = new ArrayList<ShipFragment>();

    public abstract int getSize();
    public abstract String getName();


    public void setOrientation(boolean vertical) {
        this.vertical = vertical;
    }

    public boolean getOrientation() {
        return vertical;
    }

    public boolean isSunk() {
        return sunk;
    }

    public void setSunk(boolean sunk) {
        this.sunk = sunk;
    }

    public void addFragment(ShipFragment shipFragment) {
        //To change body of created methods use File | Settings | File Templates.
    }

    public List<ShipFragment> getFragments() {
        return fragments;
    }

    public void setFragments(List<ShipFragment> fragments) {
        this.fragments = fragments;
    }

}
