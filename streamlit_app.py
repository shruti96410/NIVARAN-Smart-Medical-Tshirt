import streamlit as st
import numpy as np
import pandas as pd
import time

# ---------------- LOGIN SYSTEM ----------------
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

def login():
    st.title("🔐 Nivaran Login")

    username = st.text_input("Username")
    password = st.text_input("Password", type="password")

    if st.button("Login"):
        if username == "shruti96410" and password == "1234":
            st.session_state.logged_in = True
            st.success("Login Successful ✅")
            st.rerun()
        else:
            st.error("Invalid Credentials ❌")

if not st.session_state.logged_in:
    login()
    st.stop()

# ---------------- PAGE CONFIG ----------------
st.set_page_config(layout="wide")

# ---------------- CSS ----------------
st.markdown("""
<style>
.stApp {
    background-color: #0E1117;
    color: white;
}
.header {
    font-size: 30px;
    font-weight: 800;
    color: #00F5D4;
}
.card {
    background-color: #1F2937;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 15px;
    transition: 0.3s;
}
.card:hover {
    transform: scale(1.03);
}
.card-title {
    color: #9CA3AF;
    font-weight: 600;
}
.card-value {
    font-size: 28px;
    font-weight: 900;
    color: #00F5D4;
}
.section {
    background-color: #1F2937;
    padding: 20px;
    border-radius: 15px;
    margin-top: 20px;
}
</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown('<div class="header">🩺 Nivaran - Smart Medical Dashboard</div>', unsafe_allow_html=True)
st.markdown("---")

# ---------------- TABS ----------------
tab1, tab2, tab3, tab4 = st.tabs(["🏠 Overview", "❤️ Heart Rate", "🌙 Sleep", "🧠 Stress"])

# ---------------- DATA ----------------
heart_rate = np.random.randint(60, 110)
sleep_hours = round(np.random.uniform(5, 9), 2)
stress_level = np.random.randint(1, 10)
steps = np.random.randint(2000, 8000)

# ---------------- OVERVIEW ----------------
with tab1:
    st.subheader("📊 Overview Dashboard")

    col1, col2, col3, col4 = st.columns(4)

    col1.metric("❤️ Heart Rate", f"{heart_rate} BPM")
    col2.metric("🌙 Sleep", f"{sleep_hours} hrs")
    col3.metric("🧠 Stress Level", stress_level)
    col4.metric("🚶 Steps", steps)

    st.markdown("### 📈 Health Trends")

    data = pd.DataFrame({
        "Heart Rate": np.random.randint(60, 110, 20),
        "Sleep": np.random.uniform(5, 9, 20),
        "Stress": np.random.randint(1, 10, 20)
    })

    st.line_chart(data)

# ---------------- HEART RATE ----------------
with tab2:
    st.subheader("❤️ Heart Rate Monitoring")

    st.metric("Current Heart Rate", f"{heart_rate} BPM")

    hr_data = pd.DataFrame({
        "Heart Rate": np.random.randint(60, 120, 30)
    })

    st.line_chart(hr_data)

    if heart_rate > 100:
        st.error("⚠️ High Heart Rate Detected!")

# ---------------- SLEEP ----------------
with tab3:
    st.subheader("🌙 Sleep Analysis")

    st.metric("Sleep Duration", f"{sleep_hours} hrs")

    sleep_data = pd.DataFrame({
        "Sleep Hours": np.random.uniform(4, 9, 30)
    })

    st.line_chart(sleep_data)

    if sleep_hours < 6:
        st.warning("⚠️ Poor Sleep Detected!")

# ---------------- STRESS ----------------
with tab4:
    st.subheader("🧠 Stress Monitoring")

    st.metric("Stress Level", stress_level)

    stress_data = pd.DataFrame({
        "Stress": np.random.randint(1, 10, 30)
    })

    st.line_chart(stress_data)

    if stress_level > 7:
        st.error("⚠️ High Stress Level!")

# ---------------- LOGOUT ----------------
if st.sidebar.button("Logout"):
    st.session_state.logged_in = False
    st.rerun()
