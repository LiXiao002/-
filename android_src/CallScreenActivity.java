package com.example.smartcanteen;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.Locale;

public class CallScreenActivity extends AppCompatActivity {

    private TextView tvLatestNumber;
    private TextView tvAnnouncement;
    private TextToSpeech tts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_call_screen);

        tvLatestNumber = findViewById(R.id.tvLatestNumber);
        tvAnnouncement = findViewById(R.id.tvAnnouncement);

        initTTS();
    }

    private void initTTS() {
        tts = new TextToSpeech(this, status -> {
            if (status != TextToSpeech.ERROR) {
                tts.setLanguage(Locale.CHINA);
            }
        });
    }

    public void callNumber(String number, String stallName) {
        String message = "请 " + number + " 号顾客到 " + stallName + " 档口取餐";
        
        // Update UI
        tvLatestNumber.setText(number);
        tvAnnouncement.setText(message);
        tvAnnouncement.setSelected(true); // For marquee effect

        // Voice broadcast
        if (tts != null) {
            tts.speak(message, TextToSpeech.QUEUE_FLUSH, null, "call_id");
        }
    }

    @Override
    protected void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }
}
