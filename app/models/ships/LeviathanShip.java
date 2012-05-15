package models.ships;

public class LeviathanShip extends Ship{
    @Override
    public int getSize() {
        return 10;
    }

    @Override
    public String getName() {
        return "Leviathan";
    }
}
