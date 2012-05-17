package models.ships;

public abstract class Ship {

    private int size;
    private String name;
    private boolean vertical;
    private boolean sunk = false;

    public abstract int getSize();
    public abstract String getName();


    public void setOrientation(boolean vertical) {
        this.vertical = vertical;
    }

    public boolean getOrientation() {
        return vertical;
    }
}
