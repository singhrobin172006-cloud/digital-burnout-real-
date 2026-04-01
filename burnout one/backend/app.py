from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# store all history
history_data = []

@app.route("/")
def home():
    return "Backend Running ✅"

# SAVE DATA FROM ANY PAGE
@app.route("/save", methods=["POST"])
def save():
    data = request.json

    entry = {
        "page": data.get("page"),
        "data": data.get("payload"),
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    history_data.append(entry)

    return jsonify({"message": "saved"})

# GET ALL HISTORY
@app.route("/history", methods=["GET"])
def history():
    return jsonify(history_data)


if __name__ == "__main__":
    app.run(debug=True)