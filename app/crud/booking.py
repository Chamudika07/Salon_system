from sqlalchemy.orm import Session
from app.models.booking import Booking
from app.schemas.booking import BookingCreate
from app.crud.customer import get_customer
from app.crud.employee import get_employee

#create booking func
def create_booking(db: Session, booking: BookingCreate):
    db_booking = Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

#get id with booking func
def get_booking(db: Session, booking_id: int):
    return db.query(Booking).filter(Booking.id == booking_id).first()

#get bookings func
def get_bookings(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Booking).offset(skip).limit(limit).all()

#update id with booking func
def update_booking(db: Session, booking_id: int, booking: BookingCreate):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if db_booking:
        for key, value in booking.dict().items():
            setattr(db_booking, key, value)
        db.commit()
        db.refresh(db_booking)
    return db_booking

#delet id with booking func
def delete_booking(db: Session, booking_id: int):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if db_booking:
        db.delete(db_booking)
        db.commit()
    return db_booking

def serialize_booking(db, booking):
    customer = get_customer(db, booking.customer_id)
    employee = get_employee(db, booking.employee_id)
    return {
        "id": booking.id,
        "employee_id": booking.employee_id,
        "customer_id": booking.customer_id,
        "date": booking.date,
        "status": booking.status,
        "customer_name": customer.name if customer else None,
        "employee_name": employee.name if employee else None
    }