package com.example.smartcanteen;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.smartcanteen.model.ReceiptItem;
import com.example.smartcanteen.model.ThermalReceiptData;
import java.util.Locale;

public class ReceiptViewBinder {

    public static void bindData(View root, ThermalReceiptData data) {
        TextView tvStallName = root.findViewById(R.id.tvStallName);
        TextView tvOrderNo = root.findViewById(R.id.tvOrderNo);
        TextView tvPickupMethod = root.findViewById(R.id.tvPickupMethod);
        TextView tvPickupTime = root.findViewById(R.id.tvPickupTime);
        
        tvStallName.setText(data.getStallName());
        tvOrderNo.setText(data.getOrderNo());
        tvPickupMethod.setText(data.getPickupMethod());
        tvPickupTime.setText(data.getPickupTime());

        // Meta Info
        bindMetaRow(root.findViewById(R.id.rowPayment), "支付方式：", data.getPaymentMethod());
        bindMetaRow(root.findViewById(R.id.rowOrderTime), "订餐时间：", data.getTime());
        bindMetaRow(root.findViewById(R.id.rowOrderId), "订单编号：", data.getOrderId());
        bindMetaRow(root.findViewById(R.id.rowOrderer), "订餐人：", data.getOrderer());
        bindMetaRow(root.findViewById(R.id.rowDept), "部门：", data.getDepartment());

        // Items
        LinearLayout containerItems = root.findViewById(R.id.containerItems);
        containerItems.removeAllViews();
        LayoutInflater inflater = LayoutInflater.from(root.getContext());
        
        for (ReceiptItem item : data.getItems()) {
            View itemView = inflater.inflate(R.layout.item_receipt_row, containerItems, false);
            TextView tvName = itemView.findViewById(R.id.tvItemName);
            TextView tvCount = itemView.findViewById(R.id.tvItemCount);
            TextView tvAmount = itemView.findViewById(R.id.tvItemAmount);
            TextView tvEnergy = itemView.findViewById(R.id.tvItemEnergy);

            tvName.setText(item.getName());
            tvCount.setText("x" + item.getCount());
            tvAmount.setText(String.format(Locale.CHINA, "%.2f", item.getAmount()));
            tvEnergy.setText("能量: " + item.getEnergy() + " kcal");
            
            containerItems.addView(itemView);
        }

        // Totals
        bindTotalRow(root.findViewById(R.id.totalAmount), "订单金额", "¥" + String.format(Locale.CHINA, "%.2f", data.getOrderAmount()), false);
        bindTotalRow(root.findViewById(R.id.discountAmount), "优惠金额", "-¥" + String.format(Locale.CHINA, "%.2f", data.getDiscountAmount()), false);
        bindTotalRow(root.findViewById(R.id.actualAmount), "实付金额", "¥" + String.format(Locale.CHINA, "%.2f", data.getActualAmount()), true);

        // Nutrition Summary
        TextView tvNutritionSummary = root.findViewById(R.id.tvNutritionSummary);
        String summary = String.format(Locale.CHINA, 
            "能量 %d kcal | 蛋白质 %.1f g\n脂肪 %.1f g | 碳水 %.1f g | 纤维 %.1f g",
            data.getTotalNutrition().getEnergy(),
            data.getTotalNutrition().getProtein(),
            data.getTotalNutrition().getFat(),
            data.getTotalNutrition().getCarbs(),
            data.getTotalNutrition().getFiber()
        );
        tvNutritionSummary.setText(summary);
        
        TextView tvOrderIdFooter = root.findViewById(R.id.tvOrderIdFooter);
        tvOrderIdFooter.setText(data.getOrderId());
    }

    private static void bindMetaRow(View view, String label, String value) {
        ((TextView)view.findViewById(R.id.tvLabel)).setText(label);
        ((TextView)view.findViewById(R.id.tvValue)).setText(value);
    }

    private static void bindTotalRow(View view, String label, String value, boolean isBold) {
        TextView tvLabel = view.findViewById(R.id.tvLabel);
        TextView tvValue = view.findViewById(R.id.tvValue);
        tvLabel.setText(label);
        tvValue.setText(value);
        if (isBold) {
            tvValue.setTextSize(20);
            tvValue.getPaint().setFakeBoldText(true);
        }
    }
}
