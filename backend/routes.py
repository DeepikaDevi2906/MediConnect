from flask import jsonify, request, send_file, Blueprint
from extensions import db, bcrypt
from models import Doctor, User, Appointment
import json
import io
from reportlab.pdfgen import canvas
import traceback
from werkzeug.security import generate_password_hash, check_password_hash

# --- Authentication Blueprint ---
auth_bp = Blueprint('auth', __name__)


@auth_bp.route("/signup", methods=["POST"])
def register_user():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not email or not password or not role:
            return jsonify({"error": "Missing required fields"}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password, role=role)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "role": new_user.role
            }
        }), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500
    
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            "message": "Logged in successfully",
            "id": user.id,  # ✅ renamed from user_id
            "email": user.email,
            "role": user.role
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

# --- Doctor Blueprint ---
doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route("/add", methods=["POST"])
def add_profile():
    data = request.get_json()
    user_id = data.get("user_id")
    name = data.get("name")
    specialization = data.get("specialization")

    if Doctor.query.filter_by(user_id=user_id).first():
        return jsonify({"error": "Doctor profile already exists"}), 400

    doctor = Doctor(user_id=user_id, name=name, specialization=specialization)
    db.session.add(doctor)
    db.session.commit()
    return jsonify({"message": "Doctor profile created successfully"}), 201

@doctor_bp.route("/availability", methods=["PUT"])
def update_availability():
    data = request.get_json()
    user_id = data.get("user_id")
    availability = data.get("availability")

    doctor = Doctor.query.filter_by(user_id=user_id).first()
    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    doctor.availability = json.dumps(availability)
    db.session.commit()
    return jsonify({"message": "Availability updated"}), 200
@doctor_bp.route("/api/appointments/<int:appointment_id>/status", methods=["PUT"])
def update_appointment_status(appointment_id):
    data = request.get_json()
    new_status = data.get("status")

    if new_status not in ["Pending", "Confirmed", "Cancelled"]:
        return jsonify({"error": "Invalid status"}), 400

    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    appointment.status = new_status
    db.session.commit()

    return jsonify({"message": "Status updated"}), 200
@doctor_bp.route("/api/appointments", methods=["GET"])
def get_all_appointments():
    appointments = Appointment.query.all()

    result = []
    for appt in appointments:
        result.append({
            "appointment_id": appt.id,
            "doctor_id": appt.doctor_id,
            "patient_id": appt.patient_id,
            "date": appt.date,
            "time": appt.time,
            "status": appt.status,
        })

    return jsonify(result)

@doctor_bp.route("/appointments/<int:doctor_id>", methods=["GET"])
def get_doctor_appointments(doctor_id):
    appointments = Appointment.query.filter_by(doctor_id=doctor_id).all()
    result = []
    for a in appointments:
        result.append({
            "appointment_id": a.id,
            "patient_id": a.patient_id,
            "date": a.date,
            "time": a.time,
            "status": a.status
        })
    return jsonify(result), 200


# --- Patient Blueprint ---
patient_bp = Blueprint('patient', __name__)

@patient_bp.route("/doctors", methods=["GET"])
def view_doctors():
    doctors = Doctor.query.all()
    result = []
    for d in doctors:
        result.append({
            "doctor_id": d.id,
            "name": d.name,
            "specialization": d.specialization,
            "availability": d.availability
        })
    return jsonify(result), 200

    if not all([doctor_name, patient_id, date, time]):
        return jsonify({"error": "Missing required fields"}), 400

@patient_bp.route("/appointments/<int:patient_id>", methods=["GET"])
def view_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()
    result = []
    for a in appointments:
        result.append({
            "appointment_id": a.id,
            "doctor_id": a.doctor_id,
            "date": a.date,
            "time": a.time,
            "status": a.status
        })
    return jsonify(result), 200
@patient_bp.route("/book", methods=["POST"])
def book_appointment():
    data = request.get_json()
    doctor_id = data.get("doctor_id")
    patient_id = data.get("patient_id")
    date = data.get("date")
    time = data.get("time")

    if not all([doctor_id, patient_id, date, time]):
        return jsonify({"error": "Missing required fields"}), 400

    new_appointment = Appointment(
        doctor_id=doctor_id,
        patient_id=patient_id,
        date=date,
        time=time
    )
    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment booked successfully"}), 201
@patient_bp.route("/api/patient/appointments/<int:patient_id>", methods=["GET"])
def get_patient_appointments(patient_id):
    appointments = Appointment.query.filter_by(patient_id=patient_id).all()

    result = []
    for appt in appointments:
        result.append({
            "appointment_id": appt.id,
            "date": appt.date,
            "time": appt.time,
            "status": appt.status,
            "doctor_id": appt.doctor_id
        })

    return jsonify(result)


# --- Admin Blueprint (Optional) ---
admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin/test")
def admin_test():
    return jsonify({"message": "Admin route working"})
@patient_bp.route("/available", methods=["GET"])
def available_doctors():
    from models import Doctor
    doctors = Doctor.query.all()
    result = [
        {"id": d.id, "name": d.name, "specialization": d.specialization}
        for d in doctors
    ]
    return jsonify({"doctors": result}), 200
