package models.ships;

public class RedRibbonShip extends Ship{
    @Override
    public int getSize() {
        return 3;
    }

    @Override
    public String getName() {
        return "RedRibbon";
    }
}