import os
from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt
from routes import auth_bp, doctor_bp, patient_bp, admin_bp

app = Flask(__name__)
CORS(app)

# Construct full path to instance/app.db
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(BASE_DIR, 'instance', 'app.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init extensions
db.init_app(app)
bcrypt.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(doctor_bp)
app.register_blueprint(patient_bp)
app.register_blueprint(admin_bp)

@app.route("/")
def home():
    return {"message": "Backend running"}

if __name__ == '__main__':
    # Ensure instance/ directory exists
    os.makedirs(os.path.join(BASE_DIR, 'instance'), exist_ok=True)

    with app.app_context():
        db.create_all()
    app.run(debug=True)
