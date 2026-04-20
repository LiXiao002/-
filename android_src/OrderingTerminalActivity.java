package com.example.smartcanteen;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridView;
import android.widget.ListView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.example.smartcanteen.model.FoodItem;
import java.util.ArrayList;
import java.util.List;

import android.os.Handler;
import android.view.MotionEvent;

public class OrderingTerminalActivity extends AppCompatActivity {

    private List<FoodItem> foodList = new ArrayList<>();
    private List<FoodItem> cartItems = new ArrayList<>();
    
    private TextView tvTotalPrice;
    private TextView tvTotalCount;
    private GridView gvFoodItems;

    // Inactivity timer
    private Handler inactivityHandler = new Handler();
    private Runnable inactivityRunnable = () -> {
        // Return to standby after 2 minutes
        // finish(); or navigate to StandbyActivity
    };
    private static final long INACTIVITY_DELAY = 120000; // 2 minutes

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ordering_terminal);

        initViews();
        resetInactivityTimer();
    }

    @Override
    public boolean onUserInteraction() {
        resetInactivityTimer();
        return super.onUserInteraction();
    }

    private void resetInactivityTimer() {
        inactivityHandler.removeCallbacks(inactivityRunnable);
        inactivityHandler.postDelayed(inactivityRunnable, INACTIVITY_DELAY);
    }

    private void initViews() {
        tvTotalPrice = findViewById(R.id.tvTotalPrice);
        tvTotalCount = findViewById(R.id.tvTotalCount);
        gvFoodItems = findViewById(R.id.gvFoodItems);
        
        // Home button listener
        findViewById(R.id.btnBackToHome).setOnClickListener(v -> {
            // navigate to Home or Standby
        });

        // Set current meal period automatically
        updateMealPeriod();
    }

    private void updateMealPeriod() {
        // Java logic for meal period detection
        // Calendar calendar = Calendar.getInstance();
        // int hour = calendar.get(Calendar.HOUR_OF_DAY);
        // ... update UI
    }

    private void loadInitialData() {
        // Sample data from the React app
        // foodList.add(new FoodItem("1", "招牌红烧肉", "特色招牌", 18.0, "url", nutrition, "热销"));
    }

    public void addToCart(FoodItem item) {
        cartItems.add(item);
        updateCartSummary();
    }

    private void updateCartSummary() {
        double total = 0;
        for (FoodItem item : cartItems) {
            total += item.getPrice();
        }
        tvTotalPrice.setText(String.format("¥%.2f", total));
        tvTotalCount.setText(cartItems.size() + "份");
    }
}
