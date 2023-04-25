import streamlit.components.v1 as components
import numpy as np 
import pandas as pd  # pip install pandas openpyxl
import plotly.express as px  # pip install plotly-express
import streamlit as st  # pip install streamlit
import webbrowser
import matplotlib.pyplot as plt
import altair as alt


# emojis: https://www.webfx.com/tools/emoji-cheat-sheet/
st.set_page_config(page_title="Music Mood Analysis", page_icon=":musical_note:", layout="wide")


# ---- SIDEBAR ----

link1 = "http://127.0.0.1:5500/word_cloud/word_cloud_year.html"
link2 = "http://127.0.0.1:5500/word_cloud/word_cloud_artist.html"
link3 = "http://127.0.0.1:5500/word_cloud/Beatles_wc_year.html"
link4 = "http://127.0.0.1:5500/word_cloud/Beatles_wc_composer.html"
link5 = "http://127.0.0.1:5500/zoomable-circle-packing/circle_year.html"
link6 = "http://127.0.0.1:5500/zoomable-circle-packing/circle_artist.html"
link7 = "http://127.0.0.1:5500/zoomable-circle-packing/circle_Beatles_year.html"
link8 = "http://127.0.0.1:5500/zoomable-circle-packing/circle_Beatles_composer.html"
link9 = "http://127.0.0.1:5500/racing_bar_chart/racing_bar_ct.html"

st.sidebar.header("Data visualizations")
if st.sidebar.button('Year Wise Word Cloud', use_container_width=True):
    webbrowser.open_new_tab(link1)

if st.sidebar.button('Artist Wise Word Cloud', use_container_width=True):
    webbrowser.open_new_tab(link2)

if st.sidebar.button('Year Wise Beatles Word Cloud', use_container_width=True):
    webbrowser.open_new_tab(link3)

if st.sidebar.button('Beatles Member Wise Word Cloud', use_container_width=True):
    webbrowser.open_new_tab(link4)    

if st.sidebar.button('Year Wise Lyrics Sentiment', use_container_width=True):
    webbrowser.open_new_tab(link5)

if st.sidebar.button('Artist Wise Lyrics Sentiment', use_container_width=True):
    webbrowser.open_new_tab(link6) 

if st.sidebar.button('Year Wise Beatles Lyrics Sentiment', use_container_width=True):
    webbrowser.open_new_tab(link7)

if st.sidebar.button('Beatles Member Wise Lyrics Sentiment', use_container_width=True):
    webbrowser.open_new_tab(link8)     

if st.sidebar.button('Artist Racing Bar Chart', use_container_width=True):
    webbrowser.open_new_tab(link9)       


# ---- MAINPAGE ----

# Add an image at the top of the page
image = "data/mma.png"
st.image(image, use_column_width=True)


st.markdown(
    """
    <style>
    body {
        background-color: #ff0000;
        color: white;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# st.title(":musical_note: Music Mood Analysis #400")
st.markdown("##")


left_column, middle_column, right_column = st.columns(3)
with left_column:
    st.subheader("Total Artist:")
    # st.subheader(f"US $ {total_sales:,}")
    st.subheader("22")
with middle_column:
    st.subheader("Total Songs:")
    st.subheader("4000+")
# with right_column:
#     st.subheader("Average Sales Per Transaction:")
#     st.subheader(f"US $ {average_sale_by_transaction}")

st.markdown("""---""")



# Read CSV file
df1 = pd.read_csv("data/emo_year.csv")
df2 = pd.read_csv("data/Beatles_year_emo.csv")
df3 = pd.read_csv("data/emo_artist.csv")

# Select columns to plot
columns = st.multiselect("Select columns to plot:", options=list(df1.columns[1:]), default=list(df1.columns[1:]))

st.markdown("#")

colors = {}
col1, col2, col3 = st.columns(3)

for i, col in enumerate(columns):
    if i % 3 == 0:
        with col1:
            colors[col] = st.color_picker(f"Choose a color for {col}", "#00e600")
    elif i % 3 == 1:
        with col2:
            colors[col] = st.color_picker(f"Choose a color for {col}", "#0099e6")
    else:
        with col3:
            colors[col] = st.color_picker(f"Choose a color for {col}", "#ff1a1a")

st.markdown("##")

# create two columns
col1, col2 = st.columns(2)

with col1:

        # Create melted dataframe for multiline chart
        melted_df = pd.melt(df1, id_vars=['year'], value_vars=['Positive', 'Neutral', 'Negative'], var_name='Sentiment', value_name='Count')

        # # Choose colors for each sentiment
        # colors = {'Positive': 'green', 'Neutral': 'gray', 'Negative': 'red'}

        # Create multiline chart
        chart = alt.Chart(melted_df).mark_line().encode(
            x=alt.X('year:O', axis=alt.Axis(title='Year')),
            y=alt.Y('Count:Q', axis=alt.Axis(title='Count')),
            color=alt.Color('Sentiment:N', scale=alt.Scale(domain=columns, range=[colors[col] for col in columns])),
            tooltip=['year:O', 'Count:Q', 'Sentiment:N']
        ).properties(
            width=900,
            height=400
        )

        # Display chart
        st.altair_chart(chart, use_container_width=True)

        st.markdown("This line chart depicts how the sentiments of the lyrics have evolved over the years, based on the words used by the artists.")


with col2:

        # Create melted dataframe for multiline chart
        melted_df = pd.melt(df2, id_vars=['year'], value_vars=['Positive', 'Neutral', 'Negative'], var_name='Sentiment', value_name='Count')

        # Create multiline chart
        chart = alt.Chart(melted_df).mark_line().encode(
            x=alt.X('year:O', axis=alt.Axis(title='Year')),
            y=alt.Y('Count:Q', axis=alt.Axis(title='Count')),
            color=alt.Color('Sentiment:N', scale=alt.Scale(domain=columns, range=[colors[col] for col in columns])),
            tooltip=['year:O', 'Count:Q', 'Sentiment:N']
        ).properties(
            width=800,
            height=400
        )

        # Display chart
        st.altair_chart(chart, use_container_width=True)
        st.markdown("This line chart displays the evolving sentiments of words used in The Beatles' lyrics over the years.")

# Create melted dataframe for stacked bar chart
melted_df = pd.melt(df3, id_vars=['artist'], value_vars=columns, var_name='Sentiment', value_name='Count')

# Create stacked bar chart
chart = alt.Chart(melted_df).mark_bar().encode(
    x=alt.X('artist:O', axis=alt.Axis(title='Artist')),
    y=alt.Y('Count:Q', axis=alt.Axis(title='Count')),
    color=alt.Color('Sentiment:N', scale=alt.Scale(domain=columns, range=[colors[col] for col in columns])),
    tooltip=['artist:O', 'Count:Q', 'Sentiment:N']
).properties(
    width=800,
    height=400
)

# Display chart
st.altair_chart(chart, use_container_width=True)


# # ---- HIDE STREAMLIT STYLE ----
# hide_st_style = """
#             <style>
#             #MainMenu {visibility: hidden;}
#             footer {visibility: hidden;}
#             #header {visibility: hidden;}
#             body {
#                 background-color: #ff0000;
#                 color: white;
#                 }
#             </style>
#             """
# st.markdown(hide_st_style, unsafe_allow_html=True)