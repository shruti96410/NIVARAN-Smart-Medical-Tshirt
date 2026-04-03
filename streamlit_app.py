import streamlit as st
import numpy as np
import pandas as pd

# ---------------- LOGIN SYSTEM ----------------
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

def login():
    st.markdown("<h1 style='text-align:center; color:#2563EB;'>🔐 Nivaran Login</h1>", unsafe_allow_html=True)

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

# ---------------- LIGHT THEME CSS ----------------
st.markdown("""
<style>

/* Background */
.stApp {
    background-color: #F9FAFB;
    color: #111827;
}

/* Header */
.header {
    font-size: 32px;
    font-weight: 900;
    color: #2563EB;
}

/* Cards */
.card {
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #E5E7EB;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.05);
    transition: 0.3s;
}
.card:hover {
    transform: scale(1.02);
}

/* Titles */
.card-title {
    font-size: 16px;
    font-weight: 700;
    color: #6B7280;
}

/* Values */
.card-value {
    font-size: 30px;
    font-weight: 900;
    color: #111827;
}

/* Section */
.section {
    background-color: white;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid #E5E7EB;
    margin-top: 20px;
}

/* Alerts */
.stAlert {
    font-weight: 700;
}

</style>
""", unsafe_allow_html=True)

# ---------------- HEADER ----------------
st.markdown('<div class="header">🩺 Nivaran Smart Medical Dashboard</div>', unsafe_allow_html=True)
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
    st.markdown("## 📊 Overview")

    col1, col2, col3, col4 = st.columns(4)

    col1.markdown(f"""
    <div class="card">
        <div class="card-title">❤️ Heart Rate</div>
        <div class="card-value">{heart_rate} BPM</div>
    </div>
    """, unsafe_allow_html=True)

    col2.markdown(f"""
    <div class="card">
        <div class="card-title">🌙 Sleep</div>
        <div class="card-value">{sleep_hours} hrs</div>
    </div>
    """, unsafe_allow_html=True)

    col3.markdown(f"""
    <div class="card">
        <div class="card-title">🧠 Stress</div>
        <div class="card-value">{stress_level}</div>
    </div>
    """, unsafe_allow_html=True)

    col4.markdown(f"""
    <div class="card">
        <div class="card-title">🚶 Steps</div>
        <div class="card-value">{steps}</div>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("### 📈 Health Trends")

    data = pd.DataFrame({
        "Heart Rate": np.random.randint(60, 110, 20),
        "Sleep": np.random.uniform(5, 9, 20),
        "Stress": np.random.randint(1, 10, 20)
    })

    st.line_chart(data)

# ---------------- HEART RATE ----------------
with tab2:
    st.markdown("## ❤️ Heart Rate Monitoring")

    st.metric("Current Heart Rate", f"{heart_rate} BPM")

    hr_data = pd.DataFrame({
        "Heart Rate": np.random.randint(60, 120, 30)
    })

    st.line_chart(hr_data)

    if heart_rate > 100:
        st.error("⚠️ High Heart Rate Detected!")

# ---------------- SLEEP ----------------
with tab3:
    st.markdown("## 🌙 Sleep Analysis")

    st.metric("Sleep Duration", f"{sleep_hours} hrs")

    sleep_data = pd.DataFrame({
        "Sleep Hours": np.random.uniform(4, 9, 30)
    })

    st.line_chart(sleep_data)

    if sleep_hours < 6:
        st.warning("⚠️ Poor Sleep Detected!")

# ---------------- STRESS ----------------
with tab4:
    st.markdown("## 🧠 Stress Monitoring")

    st.metric("Stress Level", stress_level)

    stress_data = pd.DataFrame({
        "Stress": np.random.randint(1, 10, 30)
    })

    st.line_chart(stress_data)

    if stress_level > 7:
        st.error("⚠️ High Stress Level!")

# ---------------- LOGOUT ----------------
if st.sidebar.button("🚪 Logout"):
    st.session_state.logged_in = False
    st.rerun()
