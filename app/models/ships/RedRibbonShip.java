package models.ships;

public class RedRibbonShip extends Ship{
    @Override
    public int getSize() {
        return 2;
    }

    @Override
    public String getName() {
        return "Leviathan";
    }
}