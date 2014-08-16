from flask import Flask
from flask import render_template
import json

from psycopg2 import connect
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
app.config.from_pyfile('config.py')

dbconf = {
    "host": "localhost",
    "dbname": "sanfran",
    "user": "mjr"
}
conn = connect(**dbconf)
cur = conn.cursor(cursor_factory=RealDictCursor)

@app.route('/', methods = ['GET'])
def map():
    return render_template('index.html')

@app.route('/trucks', methods = ['GET'])
def trucks():
    cur.execute("select latitude as lat, longitude as lng from foodtruck")
    trucks = cur.fetchall()
    return json.dumps(trucks)

if __name__ == '__main__':
    app.run()
