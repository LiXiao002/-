package com.example.smartcanteen.model;

public class ReceiptItem {
    private String name;
    private int count;
    private double price;
    private double amount;
    private int energy;

    public ReceiptItem(String name, int count, double price, double amount, int energy) {
        this.name = name;
        this.count = count;
        this.price = price;
        this.amount = amount;
        this.energy = energy;
    }

    public String getName() { return name; }
    public int getCount() { return count; }
    public double getPrice() { return price; }
    public double getAmount() { return amount; }
    public int getEnergy() { return energy; }
}
