from sqlalchemy.orm import Session
from app.models.employee_availability import EmployeeAvailability
from app.schemas.employee_availability import EmployeeAvailabilityCreate

#create availability func
def create_availability(db: Session, availability: EmployeeAvailabilityCreate):
    db_availability = EmployeeAvailability(**availability.dict())
    db.add(db_availability)
    db.commit()
    db.refresh(db_availability)
    return db_availability

#get with  availability with id func
def get_availability(db: Session, availability_id: int):
    return db.query(EmployeeAvailability).filter(EmployeeAvailability.id == availability_id).first()

#create availabilites func
def get_availabilities(db: Session, skip: int = 0, limit: int = 10):
    return db.query(EmployeeAvailability).offset(skip).limit(limit).all()

#get employee availability func
def get_employee_availabilities(db: Session, employee_id: int):
    return db.query(EmployeeAvailability).filter(EmployeeAvailability.employee_id == employee_id).all()

#update availability employee with id func
def update_availability(db: Session, availability_id: int, availability: EmployeeAvailabilityCreate):
    db_availability = db.query(EmployeeAvailability).filter(EmployeeAvailability.id == availability_id).first()
    if db_availability:
        for key, value in availability.dict().items():
            setattr(db_availability, key, value)
        db.commit()
        db.refresh(db_availability)
    return db_availability

#delet availability with id func
def delete_availability(db: Session, availability_id: int):
    db_availability = db.query(EmployeeAvailability).filter(EmployeeAvailability.id == availability_id).first()
    if db_availability:
        db.delete(db_availability)
        db.commit()
    return db_availability