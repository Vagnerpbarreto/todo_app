from flask import Flask
from flask_cors import CORS
from .models import db
from .routes import tasks_bp

def create_app(database_uri=None):
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri or "sqlite:///tasks.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)
    app.register_blueprint(tasks_bp)

    with app.app_context():
        db.create_all()

    return app
