package models.ships;

public abstract class Ship {

    private int size;
    private String name;
    private String[] position;

    public abstract int getSize();
    public abstract String getName();

    public void setPosition(String[] position) {
        this.position = position;
    }

    public String[] getPosition() {
        return position;
    }


}
