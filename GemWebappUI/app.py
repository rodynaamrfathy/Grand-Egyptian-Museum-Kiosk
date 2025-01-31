from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/viewmedia")
def viewmedia():
    return render_template("viewmedia.html")

if __name__ == "__main__":
    app.run(debug=True)
