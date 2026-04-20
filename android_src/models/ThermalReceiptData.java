package com.example.smartcanteen.model;

import java.util.List;

public class ThermalReceiptData {
    private String orderNo;
    private String orderer;
    private String department;
    private String orderId;
    private String stallName;
    private String pickupMethod;
    private String paymentMethod;
    private String pickupTime;
    private List<ReceiptItem> items;
    private double orderAmount;
    private double discountAmount;
    private double actualAmount;
    private NutritionSummary totalNutrition;
    private String time;

    public ThermalReceiptData(String orderNo, String orderer, String department, String orderId, 
                              String stallName, String pickupMethod, String paymentMethod, 
                              String pickupTime, List<ReceiptItem> items, double orderAmount, 
                              double discountAmount, double actualAmount, 
                              NutritionSummary totalNutrition, String time) {
        this.orderNo = orderNo;
        this.orderer = orderer;
        this.department = department;
        this.orderId = orderId;
        this.stallName = stallName;
        this.pickupMethod = pickupMethod;
        this.paymentMethod = paymentMethod;
        this.pickupTime = pickupTime;
        this.items = items;
        this.orderAmount = orderAmount;
        this.discountAmount = discountAmount;
        this.actualAmount = actualAmount;
        this.totalNutrition = totalNutrition;
        this.time = time;
    }

    // Getters
    public String getOrderNo() { return orderNo; }
    public String getOrderer() { return orderer; }
    public String getDepartment() { return department; }
    public String getOrderId() { return orderId; }
    public String getStallName() { return stallName; }
    public String getPickupMethod() { return pickupMethod; }
    public String getPaymentMethod() { return paymentMethod; }
    public String getPickupTime() { return pickupTime; }
    public List<ReceiptItem> getItems() { return items; }
    public double getOrderAmount() { return orderAmount; }
    public double getDiscountAmount() { return discountAmount; }
    public double getActualAmount() { return actualAmount; }
    public NutritionSummary getTotalNutrition() { return totalNutrition; }
    public String getTime() { return time; }
}
