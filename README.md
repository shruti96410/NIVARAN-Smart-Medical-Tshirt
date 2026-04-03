NIVARAN: Enhancing Lives Through Wearable Health Tech (Non-Invasive Vital and Risk Assessment through Wearable AI for Relief and Assistance in
Nursing)

NIVARAN is a smart medical T-shirt with integrated textile-based sensors for non-invasive monitoring of vital signs such as heart rate, respiration, body temperature, SpO₂, and stress levels. The system also tracks motion and falls using accelerometer and gyroscope sensors. Sensor data is processed through Machine Learning (ML) fusion models to detect abnormal health patterns in real time. Alerts are sent via vibration motors, mobile app notifications, and GPS-enabled SOS system to caregivers. Designed to be affordable, washable, and comfortable, NIVARAN aims to support students, elderly people, and patients under rehabilitation.

Objectives
● Design and develop a wearable smart T-shirt with integrated biosensors.
● Collect data and build ML models for stress detection and fall prediction.
● Fuse models to achieve >90% accuracy in predictions.
● Integrate IoT for real-time monitoring and emergency alerts.
● Deliver a prototype that is comfortable, washable, and affordable.
Methodology
➢ Datasets Used:
○ wearable_sensor_data.csv → Stress & vitals.
○ archive.zip → Accelerometer readings for fall detection.
➢ ML Pipeline:
○ Model A: Stress & Vitals (Random Forest).
○ Model B: Fall Detection (Accelerometer).
➢ Fusion Model: Combines probabilities for final prediction.
➢ Hardware: ESP32 microcontroller, MAX30102 (HR & SpO₂), DS18B20 (temperature),
MPU6050 (motion), GPS module, SOS button, vibration motor
➢ Software/Frameworks: Python (Scikit-learn, Joblib), React/Next.js for dashboard,
FastAPI backend, Supabase for cloud storage, Blockchain for secure logs.
➢ Flowchart: Sensor Data → Preprocessing → ML Models → Fusion Layer → Alerts
(vibration/app/GPS).

Link : https://nivaran-smart-medical-tshirt-8cyejfnwc8bycdfandibec.streamlit.app/
