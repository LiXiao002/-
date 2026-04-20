package com.example.smartcanteen.model;

public class NutritionSummary {
    private int energy;
    private double protein;
    private double fat;
    private double carbs;
    private double fiber;

    public NutritionSummary(int energy, double protein, double fat, double carbs, double fiber) {
        this.energy = energy;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.fiber = fiber;
    }

    public int getEnergy() { return energy; }
    public double getProtein() { return protein; }
    public double getFat() { return fat; }
    public double getCarbs() { return carbs; }
    public double getFiber() { return fiber; }
}
