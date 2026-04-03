import joblib
import numpy as np
import os

# ----------------- Load Models -----------------
print("📂 Loading models from 'models' ...")
modelA = joblib.load(os.path.join("models", "modelA_stress_vitals_rf.pkl"))
modelB = joblib.load(os.path.join("models", "modelB_fall_mobility_rf.pkl"))
fusion = joblib.load(os.path.join("models", "fusion_model_probs_rf.pkl"))
print("✅ Models loaded successfully.\n")


# ----------------- Model A: Stress & Vitals -----------------
def test_modelA(hr, rr, temp, motion_level, activity_code):
    XA = np.array([[hr, rr, temp, motion_level, activity_code]])
    probaA = modelA.predict_proba(XA)
    predA = modelA.predict(XA)[0]
    print("\n🫀 Model A (Stress/Vitals):")
    print(f"  Input: HR={hr}, RR={rr}, Temp={temp}, Motion={motion_level}, Activity={activity_code}")
    print(f"  Predicted Class: {predA}, Probabilities: {probaA}")
    return probaA


# ----------------- Model B: Fall Detection -----------------
def test_modelB(fall_status):
    # Model B was trained on 7 classes (labels: 1,3,4,5,6,7,8) → 7 probs expected
    probaB = np.zeros((1, 7))
    if fall_status == 0:  # Normal
        probaB[0, 0] = 0.9   # mostly class "1" (walking/normal)
        probaB[0, 1:] = 0.1 / 6
    else:  # Fall detected
        probaB[0, -1] = 0.9  # mostly class "8" (fall)
        probaB[0, :-1] = 0.1 / 6
    print("\n📉 Model B (Fall Detection):")
    print(f"  Simulated Fall Status={fall_status}, Probs: {probaB}")
    return probaB


# ----------------- Fusion -----------------
def fuse(probaA, probaB):
    fusion_input = np.hstack([probaA, probaB])  # combine A + B outputs
    fusion_pred = fusion.predict(fusion_input)[0]
    print("\n🔗 Fusion Model Result:")
    if fusion_pred == 0:
        print("✅ Status: Normal.\n")
    else:
        print("🚨 Status: Risk Detected!\n")


# ----------------- Interactive Loop -----------------
print("=== Interactive Inference Mode ===")
print("Enter vital signs and fall status to test. Type 'exit' to quit.\n")
print("👉 Format: HR,RR,Temp,Motion,Activity,Fall")
print("   Example: 80,18,36.8,1,0,0  (Normal case)")
print("   Example: 130,35,39.0,3,1,1 (Risk case)\n")

while True:
    user_input = input("Enter values: ")
    if user_input.lower() == "exit":
        print("👋 Exiting interactive mode.")
        break

    try:
        hr, rr, temp, motion, act, fall = map(float, user_input.split(","))
        probaA = test_modelA(int(hr), int(rr), temp, int(motion), int(act))
        probaB = test_modelB(int(fall))
        fuse(probaA, probaB)
    except Exception as e:
        print("⚠️ Invalid input! Please enter 6 values like: 85,20,37.0,1,0,0")
