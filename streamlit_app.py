import streamlit as st
import pandas as pd
import numpy as np

# Page config
st.set_page_config(page_title="NIVARAN Smart Medical T-Shirt", layout="wide")

# 🔥 Advanced Dark Theme Styling
st.markdown("""
    <style>
    
    /* Main background */
    .stApp {
        background-color: #0E1117;
        color: white;
    }

    /* Title */
    h1 {
        color: #00F5D4;
        text-align: center;
        font-weight: 800;
    }

    /* Subheaders */
    h2, h3 {
        color: #FFFFFF;
        font-weight: 700;
    }

    /* Sidebar */
    section[data-testid="stSidebar"] {
        background-color: #111827;
    }

    /* Metric Cards */
    div[data-testid="stMetric"] {
        background-color: #1F2937;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #374151;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
    }

    /* Metric Label */
    div[data-testid="stMetricLabel"] {
        color: #9CA3AF;
        font-size: 16px;
        font-weight: 600;
    }

    /* Metric Value */
    div[data-testid="stMetricValue"] {
        color: #00F5D4;
        font-size: 32px;
        font-weight: 900;
    }

    /* Alerts */
    .stAlert {
        font-weight: 700;
        font-size: 16px;
    }

    /* Buttons */
    .stButton>button {
        background-color: #00F5D4;
        color: black;
        font-weight: 700;
        border-radius: 8px;
    }

    </style>
""", unsafe_allow_html=True)

# 🩺 Title
st.title("🩺 NIVARAN Smart Medical T-Shirt")
st.markdown("<h3 style='text-align:center;'>Real-Time Health Monitoring Dashboard</h3>", unsafe_allow_html=True)

# 📌 Sidebar
st.sidebar.header("👤 Patient Details")
name = st.sidebar.text_input("Enter Patient Name")
age = st.sidebar.number_input("Enter Age", 1, 100)

st.sidebar.markdown("---")
st.sidebar.success("System Active ✅")

# 🔄 Simulated Data
heart_rate = np.random.randint(60, 120)
temperature = round(np.random.uniform(36.0, 39.0), 2)
oxygen = np.random.randint(90, 100)

# 📊 Metrics Display
col1, col2, col3 = st.columns(3)

col1.metric("❤️ Heart Rate (BPM)", heart_rate)
col2.metric("🌡 Temperature (°C)", temperature)
col3.metric("🫁 Oxygen Level (%)", oxygen)

# 🚨 Alerts Section
st.markdown("## 🚨 Health Alerts")

if heart_rate > 100:
    st.error("⚠️ High Heart Rate Detected!")

if temperature > 37.5:
    st.warning("⚠️ Fever Detected!")

if oxygen < 94:
    st.error("⚠️ Low Oxygen Level!")

if heart_rate <= 100 and temperature <= 37.5 and oxygen >= 94:
    st.success("✅ All Vitals are Normal")

# 📈 Live Chart
st.markdown("## 📊 Live Health Trends")

chart_data = pd.DataFrame({
    "Heart Rate": np.random.randint(60, 120, 20),
    "Temperature": np.random.uniform(36, 39, 20),
    "Oxygen": np.random.randint(90, 100, 20)
})

st.line_chart(chart_data)

# 🧾 Footer
st.markdown("---")
st.markdown("<h4 style='text-align:center; color:#9CA3AF;'>Developed for Smart Healthcare Monitoring 💙</h4>", unsafe_allow_html=True)
