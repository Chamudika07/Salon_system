from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.employee_availability import EmployeeAvailabilityCreate, EmployeeAvailabilityOut
from app.crud.employee_availability import (
    create_availability, get_availability, get_availabilities, 
    get_employee_availabilities, update_availability, delete_availability
)
from app.db.dependency import get_db

router = APIRouter()

#create availabilites API
@router.post("/", response_model=EmployeeAvailabilityOut)
def create(availability: EmployeeAvailabilityCreate, db: Session = Depends(get_db)):
    return create_availability(db, availability)

#get availabilites API
@router.get("/", response_model=list[EmployeeAvailabilityOut])
def list_availabilities(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_availabilities(db, skip=skip, limit=limit)

#get availabilites employee id API
@router.get("/employee/{employee_id}", response_model=list[EmployeeAvailabilityOut])
def get_employee_schedule(employee_id: int, db: Session = Depends(get_db)):
    return get_employee_availabilities(db, employee_id)

#get availabilites id API
@router.get("/{availability_id}", response_model=EmployeeAvailabilityOut)
def read_availability(availability_id: int, db: Session = Depends(get_db)):
    availability = get_availability(db, availability_id)
    if not availability:
        raise HTTPException(status_code=404, detail="Availability not found")
    return availability

#update availabilites with id API
@router.put("/{availability_id}", response_model=EmployeeAvailabilityOut)
def update(availability_id: int, availability: EmployeeAvailabilityCreate, db: Session = Depends(get_db)):
    updated = update_availability(db, availability_id, availability)
    if not updated:
        raise HTTPException(status_code=404, detail="Availability not found")
    return updated

#delet availabilites with id API
@router.delete("/{availability_id}")
def delete(availability_id: int, db: Session = Depends(get_db)):
    deleted = delete_availability(db, availability_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Availability not found")
    return {"ok": True}