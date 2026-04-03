import streamlit as st
import pandas as pd
import numpy as np
import time

# Page config
st.set_page_config(page_title="NIVARAN Smart Medical T-Shirt", layout="wide")

# Dark Theme Styling
st.markdown("""
    <style>
    body {
        background-color: #0E1117;
        color: white;
    }
    .stMetric {
        background-color: #1c1f26;
        padding: 10px;
        border-radius: 10px;
    }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("🩺 NIVARAN Smart Medical T-Shirt")
st.subheader("Real-Time Health Monitoring Dashboard")

# Sidebar
st.sidebar.header("Patient Details")
name = st.sidebar.text_input("Enter Patient Name")
age = st.sidebar.number_input("Age", 1, 100)

# Generate Dummy Data
heart_rate = np.random.randint(60, 120)
temperature = round(np.random.uniform(36.0, 39.0), 2)
oxygen = np.random.randint(90, 100)

# Display Metrics
col1, col2, col3 = st.columns(3)

col1.metric("❤️ Heart Rate (BPM)", heart_rate)
col2.metric("🌡 Temperature (°C)", temperature)
col3.metric("🫁 Oxygen Level (%)", oxygen)

# Alerts Logic (Simple AI)
st.markdown("### 🚨 Health Alerts")

if heart_rate > 100:
    st.error("High Heart Rate Detected!")

if temperature > 37.5:
    st.warning("Fever Detected!")

if oxygen < 94:
    st.error("Low Oxygen Level!")

# Live Chart
st.markdown("### 📊 Live Health Data")

chart_data = pd.DataFrame({
    "Heart Rate": np.random.randint(60, 120, 20),
    "Temperature": np.random.uniform(36, 39, 20)
})

st.line_chart(chart_data)

# Footer
st.markdown("---")
st.success("System Running Smoothly ✅")
