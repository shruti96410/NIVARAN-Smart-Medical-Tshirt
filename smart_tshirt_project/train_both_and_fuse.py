"""
NIVARAN - Smart Medical T-shirt
File: train_both_and_fuse.py
Author: Shruti Verma
Description:
Trains Model A (Stress & Vitals) and Model B (Fall Detection),
then builds a Fusion Model to combine their predictions for
real-time health risk detection.
"""

# --------------------------------------------------
# Imports and Configuration
# --------------------------------------------------
import os
import glob
import zipfile
import joblib
import numpy as np
import pandas as pd
from collections import Counter
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# ----------------- CONFIG -----------------
WEARABLE_PATH = "C:/Users/shrut/Downloads/smart_tshirt_project/wearable_sensor_data.csv"  # Dataset A (Vitals)
ARCHIVE_ZIP = "C:/Users/shrut/Downloads/smart_tshirt_project/archive.zip"                 # Dataset B (Accelerometer)
EXTRACT_DIR = "archive_extracted"
MODEL_DIR = "models"
WINDOW_SECONDS = 2.0
ACC_SAMPLING_HZ = 25.0
RANDOM_STATE = 42
# ------------------------------------------

# Ensure directories exist
os.makedirs(MODEL_DIR, exist_ok=True)

# Extract archive if not done
if not os.path.exists(EXTRACT_DIR):
    with zipfile.ZipFile(ARCHIVE_ZIP, 'r') as z:
        z.extractall(EXTRACT_DIR)

# --------------------------------------------------
# 1) MODEL A — Stress & Vitals Classification
# --------------------------------------------------
print("\n📂 Loading wearable_sensor_data.csv ...")
df_w = pd.read_csv(WEARABLE_PATH)

feat_A = []
for c in ['Heart Rate (bpm)', 'Respiration Rate (bpm)', 'Body Temperature (°C)', 'Motion Activity (Level)']:
    if c in df_w.columns:
        feat_A.append(c)

if 'Activity Type' in df_w.columns:
    df_w['Activity Type_code'] = df_w['Activity Type'].astype('category').cat.codes
    feat_A.append('Activity Type_code')

target_A = 'Injury Risk Level'
if target_A not in df_w.columns:
    raise RuntimeError(f"Expected target column '{target_A}' in {WEARABLE_PATH}")

X_A = df_w[feat_A].fillna(method='ffill').fillna(0).values
y_A = df_w[target_A].astype(int).values

print(f"✅ Model A features: {feat_A}, samples: {len(X_A)}")

XA_train, XA_test, yA_train, yA_test = train_test_split(
    X_A, y_A, test_size=0.2, random_state=RANDOM_STATE, stratify=y_A
)

modelA = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=300, random_state=RANDOM_STATE, class_weight='balanced'))
])

print("🚀 Training Model A (RandomForest)...")
modelA.fit(XA_train, yA_train)
predA = modelA.predict(XA_test)

print("📊 Model A Report:\n", classification_report(yA_test, predA))
print("Confusion Matrix:\n", confusion_matrix(yA_test, predA))
print(f"✅ Model A Accuracy: {modelA.score(XA_test, yA_test) * 100:.2f}%")

joblib.dump(modelA, os.path.join(MODEL_DIR, "modelA_stress_vitals_rf.pkl"))
print("💾 Saved models/modelA_stress_vitals_rf.pkl")

# --------------------------------------------------
# 2) MODEL B — Fall Detection from Accelerometer
# --------------------------------------------------
print("\n📂 Loading accelerometer CSVs from", EXTRACT_DIR)
csv_files = sorted(glob.glob(os.path.join(EXTRACT_DIR, "*.csv")))

if not csv_files:
    raise RuntimeError(f"No CSV files found in {EXTRACT_DIR}. Check archive.zip extraction.")

acc_frames = []
for f in csv_files:
    try:
        df = pd.read_csv(f)
        print(f"✅ Found: {os.path.basename(f)} with columns: {list(df.columns)}")
        needed = ['back_x', 'back_y', 'back_z', 'thigh_x', 'thigh_y', 'thigh_z', 'label']
        if all(c in df.columns for c in needed):
            acc_frames.append(df[needed].dropna().reset_index(drop=True))
        else:
            print(f"⚠️ Skipping {os.path.basename(f)} — missing required columns")
    except Exception as e:
        print(f"❌ Error reading {f}: {e}")

if not acc_frames:
    raise RuntimeError("No accelerometer CSV files matched the required columns.")

acc_df = pd.concat(acc_frames, ignore_index=True)
print("✅ Total accelerometer rows:", len(acc_df))

# Create windowed features
window_len = int(WINDOW_SECONDS * ACC_SAMPLING_HZ)
if window_len < 1:
    window_len = 1

def windows_from_df(df, window_len, overlap=0.5):
    """Convert accelerometer data into overlapping statistical windows."""
    step = max(1, int(window_len * (1.0 - overlap)))
    rows, labels = [], []
    for start in range(0, len(df) - window_len + 1, step):
        win = df.iloc[start:start + window_len]
        feats = []
        for prefix in ['back_', 'thigh_']:
            xs = win[prefix + 'x'].values
            ys = win[prefix + 'y'].values
            zs = win[prefix + 'z'].values
            mag = np.sqrt(xs**2 + ys**2 + zs**2)
            feats += [
                xs.mean(), xs.std(), xs.max(), xs.min(),
                ys.mean(), ys.std(), ys.max(), ys.min(),
                zs.mean(), zs.std(), zs.max(), zs.min(),
                mag.mean(), mag.std(), mag.max(), mag.min(),
                np.sum(xs**2 + ys**2 + zs**2)
            ]
        lab = int(win['label'].mode()[0]) if not win['label'].mode().empty else int(win['label'].iloc[0])
        rows.append(feats)
        labels.append(lab)
    return np.array(rows), np.array(labels)

print("⏳ Creating windowed features...")
X_B, y_B = windows_from_df(acc_df, window_len=window_len, overlap=0.5)
print("✅ Windowed samples:", X_B.shape, "Classes:", np.unique(y_B))

XB_train, XB_test, yB_train, yB_test = train_test_split(
    X_B, y_B, test_size=0.2, random_state=RANDOM_STATE, stratify=y_B
)

modelB = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(n_estimators=300, random_state=RANDOM_STATE, class_weight='balanced'))
])

print("🚀 Training Model B (RandomForest)...")
modelB.fit(XB_train, yB_train)
predB = modelB.predict(XB_test)

print("📊 Model B Report:\n", classification_report(yB_test, predB))
print("Confusion Matrix:\n", confusion_matrix(yB_test, predB))
print(f"✅ Model B Accuracy: {modelB.score(XB_test, yB_test) * 100:.2f}%")

joblib.dump(modelB, os.path.join(MODEL_DIR, "modelB_fall_mobility_rf.pkl"))
print("💾 Saved models/modelB_fall_mobility_rf.pkl")

# --------------------------------------------------
# 3) FUSION MODEL — Combine Model A & B Predictions
# --------------------------------------------------
print("\n🔗 Building Fusion Model ...")

probaA_test = modelA.predict_proba(XA_test)
probaB_test = modelB.predict_proba(XB_test)

rng = np.random.RandomState(RANDOM_STATE)
n_pairs = min(len(probaA_test), len(probaB_test))
pairs_idx_A = rng.choice(len(probaA_test), n_pairs, replace=False)
pairs_idx_B = rng.choice(len(probaB_test), n_pairs, replace=False)

fusion_X = np.hstack([probaA_test[pairs_idx_A], probaB_test[pairs_idx_B]])
yA_pair = yA_test[pairs_idx_A]
yB_pair = yB_test[pairs_idx_B]
fusion_y = ((yA_pair == yA_pair.max()) | (yB_pair == yB_pair.max())).astype(int)

print("Fusion dataset shape:", fusion_X.shape, "Label distribution:", Counter(fusion_y))

fusion_model = RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE, class_weight='balanced')
fusion_model.fit(fusion_X, fusion_y)
fusion_pred = fusion_model.predict(fusion_X)

print("📊 Fusion Model Report:\n", classification_report(fusion_y, fusion_pred))

joblib.dump(fusion_model, os.path.join(MODEL_DIR, "fusion_model_probs_rf.pkl"))
print("💾 Saved models/fusion_model_probs_rf.pkl")

print("\n✅ Training complete! All models saved in 'models/' folder.")
